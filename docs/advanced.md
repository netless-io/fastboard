# 进阶配置

## 目录

- [配置 UI](#配置UI)
- [可选 APP](#optional-app)
- [多语言](#i18n)

### 配置

```

```

<h2 id="optional-app">可选 APP</h2>

可选 APP 以 `peerDependencies` 的方式配置到 `fastboard` 中

1. `code-editor` 代码编辑器 `@netless/app-monaco`
2. `geogebra` 数学软件 `@netless/app-geogebra`
3. `countdown` 倒计时 `@netless/app-countdown`

如果有需要这些应用的，可以通过 `yarn` `npm` 或者 `pnpm` 安装到项目中

<h2 id="i18n">多语言</h2>

目前有中文和英文的多语言支持，使用浏览器的 `navigator.language` 作为默认语言

可以切换的语言为

- `zh-CN`
- `en`

```javascript
app.changeLanguage("en");
```
