const mongoose = require('mongoose')
const config = require('config')
const db = mongoose.connect(`mongodb://${config.db}`);
module.exports = db
