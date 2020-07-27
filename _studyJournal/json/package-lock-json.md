较高NPM版本(v5.x.x以上)会生成package.json和package-lock.json两个配置文件, 后者内容更详细的.

** semver语义化版本号变更, npm依赖管理背后的精髓

#### 包管理
每当添加一个依赖时, package.json里面会加一条项目, 包含其名称, 并且使用semver来处理版本号. 而其中npm支持版本号中包含通配符. 一般来说, 版本号前加通配符, 表示至少要安装此版本以上才可以支持, 只要主版本号一致就行, 因为不顶号和此版本号的变动并不会改变已有的API.

#### 使用场景
package.json的优点在于, 只要有权限访问package.json, 其就可以安装里面所记录的依赖, 即可直接运行此项目, 其问题在于[版本新旧交替的问题]:
... 待补充

#### package-lock.json
1. better version control
2. reduce npm install time


`package-lock.json`给每个依赖表明了正确的版本号, 获取地址, 一个验证完整性和正确性的哈希值和此依赖所需要的依赖, 使得每次安装都会出现相同的结果, 无论在什么设备上面或者什么时候安装, **package-lock.json会因为npm下的node_modules tree/package.json被修改而自动生成, 它会描述具体到确切的依赖管理树, 里面包含了唯一的版本号(没有通配符)和相关包的信息**, 以致于npm i会根据package-lock.json的内容进行安装, 并且其记载了依赖包源地址, 保证不同环境和不同时间下的依赖是一样的.
