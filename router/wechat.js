const config = require('config')
const fetch = require('node-fetch')
module.exports = (router) => {
    router.get('/wechat/code2Session', async (ctx, next) => {
        let query = ctx.query
        let url = `${config.SESSION_API}?appid=${config.AppID}&secret=${config.AppSecret}&js_code=${query.code}&grant_type=authorization_code`
        let res = await fetch(url).then(data => {
            return data.json()
        })
        ctx.body = res
    });
}
