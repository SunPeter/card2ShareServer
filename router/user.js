const KoaBody = require('koa-body')
const db = require('../service/db'), wx = require('../service/wechat')

module.exports = (router) => {
    router.post('/user/sign', KoaBody(), async (ctx) => {
        let data = ctx.request.body
        ctx.body = await db.sign(data)
    })

    router.get('/user/login', async (ctx) => {
        let query = ctx.query
            
        let userInfo = await wx.getOpenId(query)
        console.log('userInfo', userInfo)
        if (!userInfo) return
        let openid = userInfo.openid
        console.log(openid)

        let res = await db.getUserInfo({openid})
        ctx.body = res
    })

    router.get('/user', async (ctx) => {
        let res = await db.getUserInfo(ctx.query)
        ctx.body = res
    })

    router.get('/user/openid', async (ctx, next) => {
        let query = ctx.query
        ctx.body = await wx.getOpenId(query)
    });

}
