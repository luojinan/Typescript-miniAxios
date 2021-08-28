const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler,{
  log: false,
  heartbeat: 2000,
}))

app.use(express.static(__dirname))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

const router = express.Router()

registerSimpleRouter()

function registerSimpleRouter() {
  router.get('/simple/get',function(req,res) {
    res.json({
      msg:'hello world'
    })
  })
  // 处理get请求的接口
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })
  // 处理post请求的接口
  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })
  // 模拟异常请求的接口
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500) // 响应码异常
      res.end()
    }
  })
  // 响应时间要3秒
  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })


  // 处理get请求的接口
  router.get('/extend/get', function(req, res) {
    res.json(req.query)
  })
  // 处理post请求的接口
  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })
  // 处理post请求的接口
  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })
  // 处理post请求的接口
  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })
  // 处理post请求的接口
  router.delete('/extend/delete', function(req, res) {
    res.json(req.body)
  })
  // 处理post请求的接口
  router.options('/extend/options', function(req, res) {
    res.json(req.body)
  })
  // 处理post请求的接口
  router.head('/extend/head', function(req, res) {
    res.json(req.body)
  })
}

app.use(router)

