# webpack-dev-server

> webpack 是一个构建工具, 但是在开发测试过程中, 经常修改代码后频繁刷新页面查看效果, 其提供了另外一个工具-webpack-dev-server, 帮我们从中解脱 - 监听入口文件和其他被它引用(导入)的文件, 并在文件更新时通知浏览器刷新页面.
> npm i --save-dev webpack-dev-server
> 设置服务器根目录, 默认为项目根目录

```js
devServer: {
   contentBase: "./dist",
   }
```

> 再使用指令 `webpack-dev-server --open` 执行, 也可放在 package.json 文件的 script 字段里.

## 基本原理

通过 Express 开启一个服务器, 设置两个路由出口

1. static resource 出口: 可以通过 `devServer` 字段`contentBase` 设置静态资源目录
2. webpack output 出口: 默认是`/`, 可以通过 devServer 的字段 `publicPath` 设置

可以看出 webpack output 就是 Express 的一个 router 对象, webpack 根据入口文件观察相关文件, 并在其发生变化时重新编译打包, 并输出到 router 对象上, 这样访问该 router 就可以拿到最新资源, 此资源在内存中.

网页和 webpack-dev-server 是通过 websocket 协议互联, 当监听文件变化时, 会通过 websocket 通知网页调用 reload 刷新页面.

有意思的是, 即便设置了也无法监听 html 的改动.

## 监听静态 HTML 文件

### html-webpack-plugin n raw-loader

1. 安装 html-webpack-plugin `npm i -d html-webpack-plugin`
2. 安装 raw-loader `npm i -d raw-loader`
3. 配置两者

```js
module.exports = {
   mode:'development',
   entry:'./index.js',
   plugins:[
      new HtmlWebpackPlugin({template:"./dist/index.html"})
   ]

   module:{
      rules:[
         {
            test: /\.html$/,
            use:'raw-loader'
         }
      ]
   }
}
```

4. 在 index.js 中引用此 html 模板 `require('./dist/index.html')`
5. 开启服务 `webpack-dev-server`, 即可解锁监听 html

> 那么问题来了, 想要监听 html 的话就需要在配置文件里为每一个 html 文件配置一个 HTMLWebpackPlugin.

### gulp

1. 安装 `npm i -d gulp browser-sync run-sequence`
2. 在 gulpfile.js 中指定监听文件

...

## 模块热替换

通过 webpack 提供的 API 监听一个文件, 并替换已存在模块, 其中的替换逻辑需要自己写.

1. 开启热替换功能 `devServer:true`
2. 注册插件: `new webpack.NamedModulesPlugin()` 和 `new webpack.HtoModuleReplacementPlugin()`
3. 在需要监听的文件里, 用逻辑设置需要热替换的条件, 并提供热替换逻辑
