const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('./user')

var TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: Number,  // 0 快递；1 外卖or食物; 2 超市 or 便利店日常用品
        required: true
    },
    expire: {
        type: Number  // 接受的时间范围 单位 分钟
    },
    coin: {
        type: Number  // 奖励
    },
    origin: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Pois'
    },
    destination: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Pois'
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    publisher: {
        type: Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    helper: {
        type: Schema.ObjectId,
        ref: 'Users'
    },
    location: {
        type: Array,
        required: true
    },
    status: {
        type: Number,  // 0.待接单 1.已接单 2.帮助人终止 3.发布人终止 4.任务过期 5.完成 9.异常
        required: true,
        default: 0
    }
});

TaskSchema.statics.findByGPS = async function (query) {
    let latitude = parseFloat(query.lat), longitude = parseFloat(query.lng), limit = query.limit || 20
    let point = {type: "Point", coordinates: [longitude, latitude]}

    return await this.aggregate().near({
        near: point,
        spherical: true,
        distanceField: 'distance',
        maxDistance: query.maxDistance || 3000*1000,
        spherical : true
    })
    // .then(docs => {
    //     return this.populate(docs, {path: "publisher origin destination"})
    // })
}

TaskSchema.index({"location": "2dsphere"})

module.exports = mongoose.model('Tasks', TaskSchema);
