const KoaBody = require('koa-body')
const db = require('../service/db')

module.exports = (router) => {
    router.post('/task', KoaBody(), async (ctx) => {
        let data = ctx.request.body
        console.log('data', data);
        ctx.body = await db.createTask(data)
    })

    router.get('/task', async (ctx) => {
        let res = await db.getTask(ctx.query)
        ctx.body = res
    })

}
