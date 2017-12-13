const User = require('../model/user')
const Task = require('../model/task')
const Poi = require('../model/poi')
/**
 *   users
 */
exports.sign = async (userInfo) => {
    let user = new User(userInfo)
    let res = await user.save()
    return res
}
exports.getUserInfo = async (params) => {
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


     let origin = await Poi.findOneOrCreate({
         latitude: _origin.latitude,
         longitude: _origin.longitude
     }, _origin)

     let des = await Poi.findOneOrCreate({
         latitude: _des.latitude,
         longitude: _des.longitude
     }, _des)

     data.origin = origin
     data.destination = des

     let task = new Task(data)
     return await task.save()
 }
 exports.getTask = async (params) => {
     return await Task.find(params)
 }
