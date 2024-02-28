const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
	name: {
		type: String,
	},
	password: {
		type: String,
	},
	image: {
		type: String,
	},
	dateOfBirth:{
        type:Date,
    },
    aadharNo:{
        type:String,
    },
    panNo:{
        type:String,
    },
	gender:{
		type:String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", UserSchema);