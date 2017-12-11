const fs = require('fs')
const Router = require('koa-router');
const router = new Router();
module.exports = function(app) {
    let dir = fs.readdirSync('./router').filter(f => ! /index\.js/.test(f))
    for (f of dir) {
        require(`${__dirname}/${f}`)(router);
    }
    app
      .use(router.routes())
      .use(router.allowedMethods());

    return app
}
