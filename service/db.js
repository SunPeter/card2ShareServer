const User = require('../model/user')
const Task = require('../model/task')
const Poi = require('../model/poi')
/**
 *   users
 */
exports.sign = async (userInfo) => {
    console.log('sign userInfo', userInfo)
    let user = new User(userInfo)
    let res
    try {
        res = await user.save()
    } catch (e) {
        console.log('error',e.stack)
    } finally {
        return res
    }
}
exports.getUserInfo = async (params) => {
    return await User.findOne(params).lean()
}
exports.getUser = async (params) => {
    return await User.findOne(params)
}

/**
 *    task
 */
 exports.createTask = async (data) => {
     let _openid = data.openid, _origin = data.origin, _des = data.des
     delete data.openid
     delete data.origin
     delete data.des

     let user = await User.findOne({
         openid: _openid
     })
     data.publisher = user
     let coin = user.coin
     if (coin < data.coin) {
         return {
             error: 1,
             msg: "金币不足"
         }
     }

     let origin = await Poi.findOneOrCreate({
         latitude: _origin.latitude,
         longitude: _origin.longitude,
         name: _origin.name
     }, _origin)

     let des = await Poi.findOneOrCreate({
         latitude: _des.latitude,
         longitude: _des.longitude,
         name: _des.name
     }, _des)

     data.origin = origin
     data.destination = des
     data.location = [_des.longitude, _des.latitude]

     let task = new Task(data)

     let res
     try {
         res = await task.save()
     } catch (e) {
         console.error(e)
         return {
             error: 1,
             msg: "发布失败"
         }
     } finally {
         if (res && res.id && data.coin > 0) {
             // 扣除用户金币
             let resForCoin = await User.update({
                 openid: _openid
             }, {
                 coin: coin - data.coin
             })
             return {
                 error: 0,
                 msg: "发布成功，金币已扣除"
             }
         }
         return {
             error: 0,
             msg: "发布成功"
         }
     }
 }

 exports.getTask = async (params) => {
     let order = params.order || 'desc', field = params.field || '_id', limit = +params.limit || 20
     delete params.order
     delete params.field
     delete params.limit

     return await Task.find(params).limit(limit).sort({[field]: order}).populate("publisher origin destination")
 }

 exports.getNearByTask = async (params) => {
    return await Task.findByGPS(params)
 }

 exports.getTaskById = async (id) => {
    return await Task.findById(id).populate('publisher origin destination')
 }

 exports.updateTask = async (condition, doc) => {
    return await Task.update(condition, doc)
 }
