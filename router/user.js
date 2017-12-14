const KoaBody = require('koa-body')
const db = require('../service/db'), wx = require('../service/wechat')

module.exports = (router) => {
    router.post('/user/sign', KoaBody(), async (ctx) => {
        let form = ctx.request.body
        console.log('sign user', form)

        ctx.body = await db.sign(form)
    })

    router.get('/user/login', async (ctx) => {
        let query = ctx.query
            
        let userInfo = await wx.getOpenId(query)

        if (!userInfo) {
            ctx.body = {
                hasLogin: false
            }
            return
        }

        let openid = userInfo.openid, res = await db.getUserInfo({openid})
        console.log('checkUser in db', res)
        if (res) {
            ctx.body = Object.assign({hasLogin: true}, res)
        } else {
            ctx.body = Object.assign({hasLogin: false}, userInfo)
        }
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
