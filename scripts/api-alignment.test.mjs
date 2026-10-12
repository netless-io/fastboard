import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { build } from "esbuild";

// These integration cases use sibling candidate sources in the managed workspace.
// Standalone Fastboard CI still runs all factory/lifecycle tests without sibling repositories.
const hasCandidateConsumers = [
  "../white-sdk/web-sdk/src/dynamicConfig/Parameters.ts",
  "../window-manager/src/Utils/dynamicConfig.ts",
  "../appliance-plugin/src/plugin/dynamicConfig.ts",
  "../Whiteboard-bridge/src/bridge/DynamicConfigParameters.ts",
].every(existsSync);
const parameterBundle = hasCandidateConsumers
  ? await build({
      stdin: {
        contents: `
    export { mergeDynamicJoinRoomParameters } from "../white-sdk/web-sdk/src/dynamicConfig/Parameters";
    export { applyDynamicMountParams } from "../window-manager/src/Utils/dynamicConfig";
    export { mergeApplianceDynamicExtras } from "../appliance-plugin/src/plugin/dynamicConfig";
    export { mergeDefaultAppliancePluginExtras } from "../Whiteboard-bridge/src/bridge/AppliancePluginDefaults";
    export { withDynamicConfigDefaults } from "../Whiteboard-bridge/src/bridge/DynamicConfigParameters";
  `,
        resolveDir: process.cwd(),
        loader: "ts",
      },
      bundle: true,
      write: false,
      platform: "node",
      format: "cjs",
    })
  : undefined;
const parameterModule = {
  exports: {
    mergeDynamicJoinRoomParameters: (_remote, local) => local,
    applyDynamicMountParams: local => local,
    mergeApplianceDynamicExtras: (_room, local) => local,
  },
};
if (parameterBundle)
  new Function("module", "exports", parameterBundle.outputFiles[0].text)(
    parameterModule,
    parameterModule.exports
  );
const {
  mergeDynamicJoinRoomParameters,
  applyDynamicMountParams,
  mergeApplianceDynamicExtras,
  mergeDefaultAppliancePluginExtras,
  withDynamicConfigDefaults,
} = parameterModule.exports;

const sources = ["FastboardApp", "FastboardPlayer"];
const bundles = await Promise.all(
  sources.map(async name => {
    const result = await build({
      entryPoints: [`packages/fastboard-core/src/impl/${name}.ts`],
      bundle: true,
      write: false,
      format: "cjs",
      platform: "node",
      packages: "external",
      define: { __VERSION__: '"test"', __NAME__: '"fastboard"' },
    });
    return result.outputFiles[0].text;
  })
);

function runtime({ failStore, failMount, failPlugin, failAppPlugin, failCleanup, dynamicConfig } = {}) {
  const events = [];
  let mountParams, adaptor, image, joinParams;
  const callbacks = {
    on() {},
    off() {
      events.push("callbacks.off");
    },
  };
  const displayer = {
    callbacks,
    state: { memberState: {} },
    phase: "connected",
    isWritable: false,
    playbackSpeed: 1,
    progressTime: 0,
    timeDuration: 100,
    isPlayable: true,
    disconnect: async () => {
      events.push("disconnect");
    },
    play() {
      events.push("play");
    },
    pause() {
      events.push("pause");
    },
    stop() {
      events.push("stop");
    },
    seekToProgressTime: async () => {},
    setWritable: async () => {},
  };
  const mainView = { callbacks, divElement: {}, setMemberState() {}, setCameraBound() {} };
  const manager = {
    mainView,
    emitter: { on() {}, off() {} },
    camera: { centerX: 0, centerY: 0 },
    destroy() {
      events.push("manager.destroy");
    },
    switchMainViewToWriter: async () => {},
    addApp: async params => {
      manager.lastApp = params;
      return "committed-id";
    },
    focusApp: async () => false,
    getPageState: async () => ({ target: "DocsViewer", page: 2, pageCount: 2 }),
    dispatchDocsEvent: async () => ({ accepted: false, reason: "outOfRange", message: "last page" }),
  };
  const plugin = {
    destroy: async () => {
      events.push("plugin.start");
      await Promise.resolve();
      events.push("plugin.end");
      if (failCleanup) throw new Error("cleanup");
    },
    setMemberState: state => {
      manager.lastMember = state;
    },
  };
  const appPlugin = {
    destroy: async () => {
      events.push("appPlugin.destroy");
    },
  };
  const sdk = {
    WhiteWebSdk: class {
      async joinRoom(params) {
        events.push("join");
        joinParams = mergeDynamicJoinRoomParameters(dynamicConfig?.joinRoom, params);
        displayer.useMultiViews = joinParams.useMultiViews;
        displayer.dynamicConfig = dynamicConfig;
        return displayer;
      }
      async replayRoom() {
        events.push("replay");
        return displayer;
      }
    },
    DefaultHotKeys: {},
    contentModeScale() {},
    autorun() {},
    toJS: v => v,
  };
  const modules = {
    "white-web-sdk": sdk,
    "@netless/window-manager": {
      WindowManager: {
        register() {},
        mount: async params => {
          mountParams = applyDynamicMountParams(params, !events.includes("replay"));
          modules["@netless/window-manager"].WindowManager.supportAppliancePlugin =
            mountParams.supportAppliancePlugin;
          if (failMount) throw new Error("mount");
          return manager;
        },
      },
      BuiltinApps: { MediaPlayer: "MediaPlayer" },
      ExtendPlugin: {},
    },
    "@netless/synced-store": {
      SyncedStorePlugin: {
        init: async () => {
          if (failStore) throw new Error("store");
          return {};
        },
      },
    },
    "@fastboard-internal/appliance-plugin-loader": {
      loadApplianceMultiPluginModule: async () => ({
        ApplianceMultiPlugin: {
          getInstance: async (_manager, input) => {
            adaptor = dynamicConfig?.appliancePlugin?.extras
              ? {
                  ...input,
                  options: {
                    ...input.options,
                    extras: mergeApplianceDynamicExtras(displayer, input.options.extras),
                  },
                }
              : input;
            if (failPlugin) throw new Error("plugin");
            return plugin;
          },
        },
      }),
    },
    "@fastboard-internal/app-in-mainview-plugin-loader": {
      loadAppInMainViewPluginModule: async () => ({
        AppInMainViewPlugin: {
          getInstance: async () => {
            if (failAppPlugin) throw new Error("appPlugin");
            return appPlugin;
          },
        },
      }),
    },
  };
  const load = code => {
    const module = { exports: {} };
    // Factory parameters and actual consumers share one realm, as in the browser.
    new Function("module", "exports", "console", "window", "Image", "require", code)(
      module,
      module.exports,
      { warn() {} },
      { innerWidth: 100, innerHeight: 100 },
      class {
        constructor() {
          image = this;
        }
      },
      name => {
        if (!modules[name]) throw new Error(`Unexpected import ${name}`);
        return modules[name];
      }
    );
    return module.exports;
  };
  return {
    ...load(bundles[0]),
    ...load(bundles[1]),
    events,
    manager,
    displayer,
    params: () => mountParams,
    joinParams: () => joinParams,
    adaptor: () => adaptor,
    image: () => image,
  };
}

const options = () => ({
  sdkConfig: { appIdentifier: "test", region: "cn-hz" },
  joinRoom: { uuid: "test", roomToken: "test", uid: "test" },
  replayRoom: { room: "test", roomToken: "test" },
  enableAppliancePlugin: {
    cdn: { fullWorkerUrl: "/1.1.44/fullWorker.js", subWorkerUrl: "/1.1.44/subWorker.js" },
  },
});

for (const replay of [false, true]) {
  const name = replay ? "replay" : "room";
  const create = (r, opts) => (replay ? r.replayFastboard(opts) : r.createFastboard(opts));
  test(`${name}: plugin works without managerConfig and forwards runtime callbacks`, async () => {
    const r = runtime();
    const opts = options();
    const callbacks = { onInitLoadingChange() {}, onBackgroundImageLoadEvent() {} };
    opts.appliancePluginAdaptor = { callbacks };
    const app = await create(r, opts);
    assert.equal(r.params().supportAppliancePlugin, true);
    assert.equal(r.adaptor().callbacks, callbacks);
    assert.equal(r.adaptor().options, opts.enableAppliancePlugin);
    await app.destroy();
  });
  test(`${name}: managerConfig remains immutable and incompatible support is handled`, async () => {
    const r = runtime();
    const opts = options();
    opts.managerConfig = Object.freeze({
      supportAppliancePlugin: false,
      forceMaximized: true,
      lazySetupInMaximizedMode: true,
    });
    if (replay) {
      const app = await create(r, opts);
      assert.equal(r.params().supportAppliancePlugin, true);
      await app.destroy();
    } else {
      await assert.rejects(create(r, opts), /requires supportAppliancePlugin=true/);
      assert.equal(r.params().supportAppliancePlugin, false);
      assert.ok(r.events.includes("manager.destroy"));
      assert.ok(r.events.includes("disconnect"));
    }
    assert.equal(opts.managerConfig.supportAppliancePlugin, false);
    assert.equal(r.params().lazySetupInMaximizedMode, true);
  });
  test(`${name}: incomplete worker configuration fails before joining`, async () => {
    const r = runtime();
    const opts = options();
    opts.enableAppliancePlugin = { cdn: {} };
    await assert.rejects(create(r, opts), /requires fullWorkerUrl/);
    assert.equal(r.events.length, 0);
  });
  for (const failure of ["failStore", "failMount", "failPlugin", "failAppPlugin"]) {
    test(`${name}: ${failure} releases acquired resources`, async () => {
      const r = runtime({ [failure]: true });
      const opts = options();
      opts.enableAppInMainViewPlugin = true;
      await assert.rejects(create(r, opts));
      assert.ok(r.events.includes(replay ? "stop" : "disconnect"));
      if (failure === "failPlugin" || failure === "failAppPlugin")
        assert.ok(r.events.includes("manager.destroy"));
      if (replay && failure === "failAppPlugin") assert.ok(r.events.includes("plugin.end"));
    });
  }
  test(`${name}: destroy waits for plugin drain, is idempotent, and continues after cleanup failure`, async () => {
    const r = runtime({ failCleanup: true });
    const app = await create(r, options());
    await Promise.all([app.destroy(), app.destroy()]);
    assert.equal(r.events.filter(v => v === "manager.destroy").length, 1);
    assert.ok(r.events.indexOf("plugin.end") < r.events.indexOf("manager.destroy"));
    assert.ok(r.events.includes(replay ? "stop" : "disconnect"));
    assert.throws(() => app.bindContainer({}), /destroyed/);
  });
}

test("document helpers preserve legacy kind and structured upstream results", async () => {
  const r = runtime();
  const app = await r.createFastboard(options());
  const params = { fileType: "pdf", scenePath: "/docs", scenes: [{ name: "1" }] };
  assert.equal(await app.insertDocs(params), "committed-id");
  assert.equal(r.manager.lastApp.kind, "DocsViewer");
  await app.insertDocs(params, { staticRenderer: "presentation" });
  assert.equal(r.manager.lastApp.kind, "Presentation");
  assert.equal((await app.getPageState({ target: "docs" })).pageCount, 2);
  assert.equal((await app.dispatchDocsEvent("nextPage")).reason, "outOfRange");
  assert.equal(await app.focusApp("app"), false);
  app.setMemberState({ shapeType: "polygon", vertices: 6 });
  assert.equal(r.manager.lastMember.vertices, 6);
  await app.destroy();
});

test("pending image decode cannot write after destroy", async () => {
  const r = runtime();
  const app = await r.createFastboard(options());
  const pending = app.insertImage("data:image/png;base64,test");
  await new Promise(resolve => setImmediate(resolve));
  const rejected = assert.rejects(pending, /destroyed/);
  await app.destroy();
  r.image().onerror();
  await rejected;
});

test("replay rate can be set before the first subscription", async () => {
  const r = runtime();
  const app = await r.replayFastboard(options());
  app.setPlaybackRate(2);
  assert.equal(r.displayer.playbackSpeed, 2);
  assert.equal(app.playbackRate.value, 2);
  await app.destroy();
  assert.throws(() => app.playbackRate.set(1), /destroyed/);
});

test(
  "remote configuration replaces factory defaults and updates UI hotkeys",
  { skip: !hasCandidateConsumers },
  async () => {
    const r = runtime({
      dynamicConfig: {
        joinRoom: { floatBar: false, hotKeys: {}, disableNewPencil: true },
        windowManager: { cursor: false },
        appliancePlugin: { extras: { useWorker: "mainThread" } },
      },
    });
    const app = await r.createFastboard(options());
    assert.equal(r.joinParams().floatBar, false);
    assert.equal(r.joinParams().disableNewPencil, true);
    assert.deepEqual(r.joinParams().hotKeys, {});
    assert.deepEqual(app.hotKeys, {});
    assert.equal(r.params().cursor, false);
    assert.equal(r.adaptor().options.extras.useWorker, "mainThread");
    assert.ok(!JSON.stringify(r.joinParams()).includes("__netlessDynamicConfigLayers"));
    await app.destroy();
  }
);

test(
  "host explicit false, zero, atomic empty and default-equal values remain highest",
  { skip: !hasCandidateConsumers },
  async () => {
    const r = runtime({
      dynamicConfig: {
        joinRoom: { floatBar: false, undoCacheScenesCount: 32, hotKeys: { changeToPencil: "x" } },
        windowManager: { cursor: false },
        appliancePlugin: { extras: { useWorker: "mainThread" } },
      },
    });
    const opts = options();
    opts.joinRoom = { ...opts.joinRoom, floatBar: true, undoCacheScenesCount: 0, hotKeys: {} };
    opts.managerConfig = { cursor: true };
    opts.enableAppliancePlugin.extras = { useWorker: "auto" };
    const app = await r.createFastboard(opts);
    assert.equal(r.joinParams().floatBar, true);
    assert.equal(r.joinParams().undoCacheScenesCount, 0);
    assert.deepEqual(r.joinParams().hotKeys, {});
    assert.equal(r.params().cursor, true);
    assert.equal(r.adaptor().options.extras.useWorker, "auto");
    await app.destroy();
  }
);

test(
  "incompatible multi-view mode rejects and releases the room instead of overriding it",
  { skip: !hasCandidateConsumers },
  async () => {
    const r = runtime({ dynamicConfig: { joinRoom: { useMultiViews: false } } });
    await assert.rejects(r.createFastboard(options()), /requires useMultiViews=true/);
    assert.equal(r.joinParams().useMultiViews, false);
    assert.deepEqual(r.events, ["join", "disconnect"]);
  }
);

test(
  "Bridge defaults, remote rules and explicit nested host values stay distinct",
  { skip: !hasCandidateConsumers },
  () => {
    const room = {
      dynamicConfig: {
        appliancePlugin: {
          extras: {
            allowImageBitmapFallback: true,
            backgroundImageLoadOptions: { maxRetries: 3, timeoutMs: 15000 },
          },
        },
        windowManager: {
          chessboard: false,
          containerSizeRatio: 1,
          pageScaleRange: { minScale: 1, maxScale: 4 },
        },
      },
    };
    assert.equal(
      mergeApplianceDynamicExtras(room, mergeDefaultAppliancePluginExtras()).allowImageBitmapFallback,
      true
    );
    const host = mergeApplianceDynamicExtras(
      room,
      mergeDefaultAppliancePluginExtras(
        { allowImageBitmapFallback: false, backgroundImageLoadOptions: { maxRetries: 0 } },
        { backgroundImageLoadOptions: { timeoutMs: 20000 } }
      )
    );
    assert.equal(host.allowImageBitmapFallback, false);
    assert.deepEqual(host.backgroundImageLoadOptions, { maxRetries: 0, timeoutMs: 20000 });
    const overrides = [];
    const result = applyDynamicMountParams(
      withDynamicConfigDefaults(
        {
          chessboard: true,
          containerSizeRatio: 9 / 16,
          pageScaleRange: { minScale: 0.5, maxScale: 2 },
          builtinAppOptions: { Presentation: { onReady() {} } },
        },
        { room, pageScaleRange: { maxScale: 3 } }
      ),
      true,
      path => overrides.push(path)
    );
    assert.equal(result.chessboard, false);
    assert.equal(result.containerSizeRatio, 1);
    assert.deepEqual(result.pageScaleRange, { minScale: 1, maxScale: 3 });
    assert.equal(typeof result.builtinAppOptions.Presentation.onReady, "function");
    assert.deepEqual(overrides, ["windowManager.pageScaleRange.maxScale"]);
    assert.equal(
      mergeApplianceDynamicExtras({}, mergeDefaultAppliancePluginExtras()).allowImageBitmapFallback,
      false
    );
    // Blacklist version keys are literal keys, including dots. Only host overrides
    // of actual remote keys belong in diagnostics, never inherited defaults.
    const remote = { blacklist: { "122.0": 1 } };
    const local = () =>
      withDynamicConfigDefaults(
        { blacklist: { "122.0": 1, "121.0": 1 } },
        { blacklist: { "122.0": 0, "121.0": 0 } }
      );
    const consumers = [
      ["joinRoom", observe => mergeDynamicJoinRoomParameters(remote, local(), observe)],
      [
        "windowManager",
        observe =>
          applyDynamicMountParams(
            withDynamicConfigDefaults(
              { blacklist: { "122.0": 1, "121.0": 1 } },
              { blacklist: { "122.0": 0, "121.0": 0 }, room: { dynamicConfig: { windowManager: remote } } }
            ),
            true,
            observe
          ),
      ],
      [
        "appliancePlugin.extras",
        observe =>
          mergeApplianceDynamicExtras(
            { dynamicConfig: { appliancePlugin: { extras: remote } } },
            local(),
            observe
          ),
      ],
    ];
    for (const [prefix, consume] of consumers) {
      const observed = [];
      assert.deepEqual(consume(path => observed.push(path)).blacklist, { "122.0": 0, "121.0": 0 });
      assert.deepEqual(observed, [`${prefix}.blacklist.122.0`]);
    }
  }
);
