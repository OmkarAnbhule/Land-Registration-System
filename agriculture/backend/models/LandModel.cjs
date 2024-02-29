
const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    owner:{
        type:String,
    },
    state:{
        type:String,
    },
    district:{
        type:String,
    },
    propertyid:{
        type:String,
    },
    survey:{
        type:String,
    },
    area:{
        type:String,
    },
    files:{
        type: mongoose.Schema.Types.Mixed,
    },
    isSell:{
        type:Boolean,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("Land", landSchema);