const User = require('../model/user')
const Task = require('../model/task')
/**
 *   users
 */
exports.sign = async (userInfo) => {
    let user = new User(userInfo)
    let res = await user.save()
    return res
}
exports.getUsersInfo = async (params) => {
    return await User.find(params)
}

/**
 *    task
 */
 exports.createTask = async (data) => {
     let openid = data.openid
     delete data.openid

     let user = await User.findOne({
         openid: openid
     })
     data.publisher = user

     let task = new Task(data)
     return await task.save()
 }
 exports.getTask = async (params) => {
     return await Task.find(params)
 }
