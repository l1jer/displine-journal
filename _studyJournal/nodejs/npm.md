---
由于网站对于代码库的依赖越来越多, 登录不同的代码库官网下载其代码库是件非常繁琐的事情, Isaac Z. Schlueter 利用js写出了运行在 Node.js 上的 NPM 来对这些库进行管理.

Isaac Z. Schlueter: [Principal Engineer at GitHub npm inventor, founder npm, Inc. Former Node BDFL. Git: https://github.com/isaacs; blog: https://blog.izs.me/] 

NPM CLI: Node Package Management Command Line Interface
---

# NPM

- [NPM](#npm)
  - [淘宝 NPM 镜像](#淘宝-npm-镜像)
  - [Runoob NPM 介绍](#runoob-npm-介绍)
  - [初始化](#初始化)
  - [npm set 设置环境变量](#npm-set-设置环境变量)
  - [搜索模块](#搜索模块)
  - [查看模块](#查看模块)
  - [安装模块](#安装模块)
  - [卸载模块](#卸载模块)
  - [更新模块](#更新模块)
  - [引用模块](#引用模块)
  - [发布模块](#发布模块)

## 淘宝 NPM 镜像

[https://developer.aliyun.com/mirror/NPM?from=tnpm]

## Runoob NPM 介绍

[https://www.runoob.com/nodejs/nodejs-npm.html]

'公司 NPM'[http://repo.hirain.net/nexus/repository/npm/]`

nvm 是管理 nodeJS 版本的工具.

npm 是管理 nodeJS 包/依赖 的工具.

<name>|<pkg> 模块名

<version> 版本号, <version range> 版本范围

<@scope> 作用域, 某些包名称也有作用域

## 初始化

- npm -v 查看 npm 版本

- npm -l 查看各个命令的简单用法

- npm config list -l 查看 npm 配置-

* npm init 初始化

  - 其中 -f (代表 force), -y (代表 yes), 可以跳过提问阶段

## npm set 设置环境变量

- npm set init-author-name 'jerry'
- set init-author-email 'jerry@qq.com'
- set init-author-url 'https://jer.io'
- npm set init0-licens 'MIT'
- npm init (最后必须执行这一行才能生效)

## 搜索模块

- npm search <搜索词> [-g]

  - 后面可以跟字符串/正则表达式

## 查看模块

- npm list 当前所有安装过的模块
- npm list -g --depth 0 列出全局安装模块, depth 不深入到包的支点, 更简洁

## 安装模块

- npm i react
- npm i gulp@3.9.1 安装指定版本
- npm i vue@">=1.0.28<2.0.0" 安装指定范围内的模块
- npm i sax@0.1.1 安装指定模块的指定标签
- npm i git://github.com/package/path.git 通过代码库地址安装

- -g 全局安装, 安装并添加到 package.json 的 dependencies
- -p 或--save-prod 生产阶段依赖, 安装并添加到 package.json 的 dependencies
- -s 或--save 开发阶段依赖, 安装并添加到 package.json 的 Dependencies
- -d 或--save-dev 可选阶段依赖, 安装并添加到 package.json 的 devlDependencies
- -o 或--save-optional 安装并添加到 optionalDependencies
- -e 或--save-exact 安装模块的某一版本, 而不是使用 npm 默认 semver range 运算符
- -b 或--save-bundle 安装并添加到 bundleDependencies
- -f 或--force 强制重新安装
- --no-save 防止保存到 dependencies
- --dry-run 报告安装状况而不是真正安装

## 卸载模块

npm uninstall <name> [-g] 卸载当前或全局模块
npm ls 查看安装模块

## 更新模块

npm update <name> [g] 更新当前或全局指定模块

## 引用模块

npm link [<@scope>/]<pkg>[@<version>]
引用依赖, 有些包是全局安装, 在项目里面只需要引用即可

npm link 引用模块

## 发布模块

会要求注册一个用户, 在官网 npmjs 里面注册是一样的.

npm adduser 未注册

npm login 已注册

npm publish 发布
