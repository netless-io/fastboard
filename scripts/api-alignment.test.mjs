import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { build } from "esbuild";

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

function runtime({ failStore, failMount, failPlugin, failAppPlugin, failCleanup } = {}) {
  const events = [];
  let mountParams, adaptor, image;
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
      async joinRoom() {
        events.push("join");
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
          mountParams = params;
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
            adaptor = input;
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
    vm.runInNewContext(code, {
      module,
      exports: module.exports,
      console: { warn() {} },
      window: { innerWidth: 100, innerHeight: 100 },
      Image: class {
        constructor() {
          image = this;
        }
      },
      require: name => {
        if (!modules[name]) throw new Error(`Unexpected import ${name}`);
        return modules[name];
      },
    });
    return module.exports;
  };
  return {
    ...load(bundles[0]),
    ...load(bundles[1]),
    events,
    manager,
    displayer,
    params: () => mountParams,
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
  test(`${name}: managerConfig is immutable and support flag cannot disable an enabled plugin`, async () => {
    const r = runtime();
    const opts = options();
    opts.managerConfig = Object.freeze({
      supportAppliancePlugin: false,
      forceMaximized: true,
      lazySetupInMaximizedMode: true,
    });
    const app = await create(r, opts);
    assert.equal(r.params().supportAppliancePlugin, true);
    assert.equal(opts.managerConfig.supportAppliancePlugin, false);
    assert.equal(r.params().lazySetupInMaximizedMode, true);
    await app.destroy();
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
