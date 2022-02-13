const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGODB_URL)