## 为什么使用 peerDependency ？

在 package.json 里有三种常见的 dependency（依赖）：`dependencies`、`devDependencies` 和 `peerDependencies`。他们分别是什么意思，包管理器（例如 `npm`）和打包器（例如 `esbuild`）会如何处理他们，在本文可以得到粗浅的解答。

### TL;DR

如果希望最终用户只看到一份关于某个库的依赖，那么就应该把这个库放到 `peerDependencies`。

### 包管理器（npm）如何工作

当你执行 `npm install @netless/fastboard-react` 时，npm 首先看到这个库的 [package.json](../packages/fastboard-react/package.json)，接着他会把 `dependencies` 里的每个依赖都装到这个库能够<q>找到</q>的位置，并且检查一遍 `peerDependencies` 里的依赖，如果某个项目没有安装，它会输出一个警告。

总结一下：

- `dependencies`：会被安装
- `peerDependencies`：不会被安装，但是如果没装会有警告提示
- `devDependencies`：根本不看

如果两个库的 `dependencies` 指向了不同版本的相同的依赖怎么办？例如假设我们用到了库 `A` 和 `B`，且 `A -> C@1` 表示 A 依赖 C 库的版本 1，`B -> C@2` 表示 B 依赖 C 库的版本 2。

其实很容易 -- 把 `C@1` 和 `C@2` 都装上就行了，此时 node_modules 结构可能是这样的：

```
./A
  ./node_modules
    ./C@1
./B
  ./node_modules
    ./C@2
```

换句话说，即使 A, B 都依赖了 `C@1`，包管理器也**可以**生成这样的结构：

```
./A
  ./node_modules
    ./C@1
./B
  ./node_modules
    ./C@1 // 现在有两份 C@1 了！
```

或者也**可以**是这样的结构：

```
./A
./B
./C // 现在只有一份 C@1
```

这取决于它要不要选择节约一点你的硬盘空间，而 A、B 的作者无法保证包管理器一定用哪种结构。所以 `dependencies` 不能解决<q>只有一份相同的依赖</q>这个需求。

解决办法就是 `peerDependencies`，由用户自己安装这个相同的依赖，这样就可以保证结构是后者。

### 打包器（esbuild）如何工作

打包器通常会实现类似 node 的 resolve 算法。这是什么意思呢，就是当他在某个文件 `./a.js` 里看见一句 `import 'C'` 时，他首先要找到这个 `'C'` 是什么文件。具体找法就是去当前文件夹的 node_modules 里找同名文件夹，如果当前文件夹没有，再往上一级文件夹找。

现在让我们回到上面两个 `C@1` 的例子：

```
./A               // import 'C' -> ./A/node_modules/C@1
  ./node_modules
    ./C@1
./B               // import 'C' -> ./B/node_modules/C@1
  ./node_modules
    ./C@1
```

现在问题有点大了，C 这个库不仅在程序员的硬盘里有两份，而且在打包结果里也有两份！包体积的增加暂且不谈，同一段代码执行两遍就很有可能引入大量问题了。

因此，不管从程序员的硬盘还是打包角度考虑，都应该解决这个依赖一致性问题，解决办法就是让用户安装这些**应该**一致的依赖，开发者则使用 `peerDependencies` 提醒用户做这件事。
