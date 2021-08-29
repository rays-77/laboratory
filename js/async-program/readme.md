# async-program
异步编程

# 同时安装多个软件包 这里安装的都是相对新的版本
npm i webpack webpack-cli webpack-dev-server -D 

# 安装下面插件, 自动生成一个index.html文件
npm i html-webpack-plugin -D

# 运行
# 在浏览器中打开html页面, 其中引入了编译之后.js文件
npx webpack serve --entry ./xxx.js --open


# 另外一种运行，使用yarn
## Usage

```sh
# install deps
$ yarn # or npm i

# run every examles
$ yarn webpack-dev-server <example.js>
# e.g.
$ yarn webpack-dev-server 01-sync-mode.js