This is a private package that only used in this repo.

It converts this code in your project:

```js
import "./style.scss";
```

To this (something like):

```js
document.head.appendChild(document.createElement("style")).textContent = "body{color:red}";
```
