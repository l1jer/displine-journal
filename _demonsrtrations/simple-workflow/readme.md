## Simple Workflow

### What's in there:

- Vanilla JS
- Parcel Bundler
- SASS
- Axios / [Random User API](https://randomuser.me/api)

### To start with:

`npm i && npm run dev`

### Issues found

#### 'rm' is not recognized as an internal or external command,operable program or batch file.

In package.JSON:

`"dev": "rm -rf ./development && rm -rf ./.cache && parcel public/index.html --out-dir development -p 3000",`

causes:

`'rm' is not recognized as an internal or external command,operable program or batch file`

That script was written for the UNIX shell, which does not work on windows. The correct way to do this in a cross-platform way is to use `rimraf` & `mkdirp`.

Also, the `./node_modules/.bin/babel` portion could be shortened to simply babel (`./node_modules/.bin/babel` doesn't work on windows IIRC).

Properly written, the script should be:

`"dev": "rimraf ./development && rimraf ./.cache && parcel public/index.html --out-dir development -p 3000"`
