
const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    pastOwners: {
        type: mongoose.Schema.Types.Mixed,
    },
    owner: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    propertyid: {
        type: String,
        unique: true
    },
    survey: {
        type: String,
        unique: true
    },
    area: {
        type: String,
    },
    files: {
        type: mongoose.Schema.Types.Mixed,
    },
    price: {
        type: String,
    },
    isSell: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Land", landSchema);