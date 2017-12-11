module.exports = (router) => {
    router.get('/favicon.ico', ctx => {
      ctx.set({
          'statusCode': 200,
          'Content-Type': 'image/x-icon'
      })
      return
    });
}
