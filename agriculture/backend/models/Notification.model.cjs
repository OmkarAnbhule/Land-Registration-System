const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
    id: {
        type: 'String',
        required: true,
        uinque:true
    },
    notifications: [
        {
            messageType: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            isRead: {
                type: Boolean,
                default: false
            }
        }
    ]
})
module.exports = mongoose.model('notify', notifySchema);
