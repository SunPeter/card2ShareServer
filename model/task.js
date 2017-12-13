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
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);
