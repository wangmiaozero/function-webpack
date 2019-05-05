'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 向外暴露一个打包的配置对象；   因为 webpack 是基于Node构建的；所以 webpack 支持所有Node API 和语法
// webpack 默认只能打包处理 .js 后缀名类型的文件； 像 .png .vue 无法主动处理，所以要配置第三方的loader；
module.exports = {
  context: path.resolve(__dirname, '../'),
   //入口文件配置
  entry: {
    app: './src/main.js'
  },
   //配置出口文件
  output: {
    //出口文件的路径
    path: config.build.assetsRoot,
    //出口文件的名称
    //开发环境dev时候用chunkhash报错，只能用hash
    filename: '[name].js',
      //publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
      // publicPath:'/',
      //此选项决定了非入口(non-entry) chunk 文件的名称
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 表示，这几个文件的后缀名，可以省略不写
    extensions: ['.js', '.vue', '.json'],
    alias: {//表示别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),// 这样，@ 就表示 项目根目录中 src 的这一层路径
    }
  },
  // 所有第三方 模块的配置规则
  module: {
    //第三方匹配规则
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   { loader: 'style-loader' },
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true
        //     }
        //   }
        // ]
        // css-loader 用于解析css文件
        // style-loader 用于将css代码 使用js动态的插入到html中, 减少二次请求
        // use使用loader时  顺序是固定的从右到左的加载
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js|.jsx|.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //include 表示哪些目录中的 .js 文件需要进行 babel-loader
        //exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
 
}
