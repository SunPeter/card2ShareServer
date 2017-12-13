const config = require('config')
const fetch = require('node-fetch')
exports.getOpenId = async (params) => {
    let url = `${config.SESSION_API}?appid=${config.AppID}&secret=${config.AppSecret}&js_code=${params.code}&grant_type=authorization_code`
    let res = await fetch(url).then(data => {
        return data.json()
    })
    return res
}
