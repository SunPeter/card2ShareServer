const KoaBody = require('koa-body')
const mongoose = require('mongoose')
const db = require('../service/db')

module.exports = (router) => {
    router.post('/task', KoaBody(), async (ctx) => {
        let data = ctx.request.body
        ctx.body = await db.createTask(data)
    })

    router.get('/task', async (ctx) => {
        let res = await db.getTask(ctx.query)
        ctx.body = res
    })

    router.get('/task/nearby', async (ctx) => {
        let res = await db.getNearByTask(ctx.query)
        ctx.body = res
    })

    router.get('/task/:id', async (ctx) => {
        let id = ctx.params.id
        ctx.body = await db.getTaskById(id)
    })

    router.put('/task/:id', KoaBody(), async (ctx) => {
        let id = ctx.params.id, data = ctx.request.body
        let user = await db.getUser({
            openid: data.helper
        })
        ctx.body = await db.updateTask({_id: id}, {helper: user})
    })
}
