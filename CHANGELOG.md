# Changelog

## Unreleased

- Re-export [`@netless/app-slide`](https://github.com/netless-io/netless-app/tree/master/packages/app-slide).
- Rename `@netless/app-media-player` to `@netless/app-plyr`.
- Update toolbar handler styles.
- Added `config` field to the `Fastboard` component to hide controls.
- Added `setTextColor` api.

## 0.3.1

- Hide controls if room is not writable, instead of making them not clickable.
- Adjust clickable area of controls.
- Fix a bug where internal reactive values might not be updated.

## 0.3.0

Rewrite the whole thing. Change UI framework to use svelte.
