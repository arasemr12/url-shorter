const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UrlSchema = new schema({
    id: String,
    url: String,
    authorip: String,
    Created: {
        type: Date,
        default: Date.now
    }
});

const UrlModel = mongoose.model('url',UrlSchema);

module.exports = UrlModel;