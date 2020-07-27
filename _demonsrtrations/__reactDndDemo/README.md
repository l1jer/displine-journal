There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

"babel-jest": "^24.9.0"

Don't try to install it manually: your package manager does it automatically.
However, a different version of babel-jest was detected higher up in the tree:

D:\jiarui.li\gitlab-hirain-trial\public-resource\react-dnd-demo\node_modules\babel-jest (version: 26.1.0)

Manually installing incompatible versions is known to cause hard-to-debug issues.

If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an
.env file in your project.
That will permanently disable this message but you might encounter other issues.

To fix the dependency tree, try following the steps below in the exact order:

1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
2. Delete node_modules in your project folder.
3. Remove "babel-jest" from dependencies and/or devDependencies in the package.json file in your project folder.
4. Run npm install or yarn, depending on the package manager you use.

In most cases, this should be enough to fix the problem.
If this has not helped, there are a few other things you can try:

5. If you used npm, install yarn (http://yarnpkg.com/) and repeat the above
   steps with it instead.
   This may help because npm has known issues with package hoisting which may get resolved in future versions.

6. Check if D:\jiarui.li\gitlab-hirain-trial\public-resource\react-dnd-demo\node_modules\babel-jest is outside your project directory.
   For example, you might have accidentally installed something in your home folder.

7. Try running npm ls babel-jest in your project folder.
   This will tell you which other package (apart from the expected react-scripts) installed babel-jest.

If nothing else helps, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That would permanently disable this preflight check in case you want to proceed anyway.

P.S. We know this message is long but please read the steps above :-) We hope
you find them helpful!

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! react-dnd-demo@0.1.0 start: `react-scripts start`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the react-dnd-demo@0.1.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
