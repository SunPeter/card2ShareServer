const KoaBody = require('koa-body')
const db = require('../service/db')

module.exports = (router) => {
    router.post('/user/sign', KoaBody(), async (ctx) => {
        let data = ctx.request.body
        ctx.body = await db.sign(data)
    })

    router.get('/user', async (ctx) => {
        let res = await db.getUserInfo(ctx.query)
        ctx.body = res
    })

}
