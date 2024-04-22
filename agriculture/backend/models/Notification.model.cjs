const mongoose = require('mongoose');

const notifySchema = mongoose.Schema({
    id: {
        type: 'String',
        required: true
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
exports.default = mongoose.model('Notification', notifySchema);
