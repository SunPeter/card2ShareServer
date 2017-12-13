const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PoiSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
});

PoiSchema.statics.findOneOrCreate = async function(query, collect) {
    let res = await this.findOne(query)
    if (res && res.id) return res
    return await this.create(collect)
}

module.exports = mongoose.model('Pois', PoiSchema);
