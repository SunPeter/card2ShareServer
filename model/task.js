const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Number,  // 1 快递； 2 外卖or食物; 3 超市 or 便利店日常用品
        required: true
    },
    estimated_time: {
        type: Number,  // 接受的时间范围 单位 分钟
        default: 20
    },
    reward: {
        type: Number  // 奖励
    },
    coreInfo: {
        type: String
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
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
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);
