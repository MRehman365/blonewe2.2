const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    mainbanner: {
        type: Array,
    },
    secondbanner: {
        type: Array,
    },
    thirdbanner: {
        type: String,
    },
    fourthbanner: {
        type: Array,
    },
    fifthbanner: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('banner', bannerSchema);