## Why use peerDependency?

There are three common dependencies in package.json: `dependencies`,` devDependencies`, and `peerDependencies`. What they mean and how they are handled by the package manager (e.g. `npm`) and the packer (e.g. `esbuild`) can be briefly explained in this article.

### TL;DR

If you want the end user to see only one dependency on a library, you should put that library in `peerDependencies`.

### How does the Package Manager (npm) work

When you execute `npm install@netless /fastboard-react`, npm first sees the [package.json](../packages/fastboard-react/package.json), then he loads each of the dependencies in `dependencies` into the library where <q> can find </q>, and checks the dependencies in ` peerDependencies`, If a project is not installed, it outputs a warning.

To summarize:

- `dependencies` : will be installed
- `peerDependencies` : does not install, but warns if it does not install
- This behavior has changed in the latest version of npm/pnpm, which installs peerDependencies by default. But if the [peerDependenciesMeta](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependenciesmeta) is not installed
- `devDependencies` : does not watch

What if two libraries `dependencies` refer to different versions of the same dependency? For example, suppose we use libraries `A` and `B` , and `A -> C@1` means that A depends on version 1 of the C library, and `B -> C@2` means that B depends on version 2 of the C library.

It's easy -- just install both `C@1` and `C@2`. node_modules might look like this:

```
./A
./node_modules
./C@1
./B
./node_modules
./C@2
```

In other words, even if A and B both depend on `C@1`, the package manager **can** generate a structure like this:

```
./A
./node_modules
./C@1
./B
./node_modules
./C@1 // Now there are two C@1!
```

Or **can** be this structure:

```
./A
./B
/C // Now there is only one copy C@1
```

It depends on whether it chooses to save A little space on your hard drive, and the authors of A and B can't guarantee which structure the package manager will use. So `dependencies` does not address the requirement that <q> has only one identical dependency </q>.

The workaround is `peerDependencies`, where the user installs the same dependencies themselves, so that the structure is guaranteed to be the latter.

### How does the esbuild work

The packer typically implements the Node-like resolve algorithm. What this means is that when he sees the word `import 'C'` in a file `./a.js`, he must first find out what the file `'C'` is. The specific method is to go to the node_modules folder of the current folder to find the same name folder, if the current folder is not, then the next level of folder to find.

Now let's go back to the two `C@1` examples above:

```
./A               // import 'C' -> ./A/node_modules/C@1
./node_modules
./C@1
./B               // import 'C' -> ./B/node_modules/C@1
./node_modules
./C@1
```

Now the problem is a little big, C this library not only in the programmer's hard disk there are two copies, but also in the packaging results there are two copies! The increase in package size aside, executing the same piece of code twice is likely to introduce a lot of problems.

Therefore, both from the programmer's hard disk and packaging perspective, the problem of dependency consistency should be solved. The solution is to let the user install these dependencies that **should be consistent**, and the developer reminds the user to do this using `peerDependencies`.