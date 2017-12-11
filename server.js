const Koa = require('koa')
let db = require('./mongodb')

let app = new Koa()
app = require('./router')(app)

app.listen(8888,()=>{
    console.log('server has started in port 8888')
})
