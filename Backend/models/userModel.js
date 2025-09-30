const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    mid: String,
    phone:Number,
    role: String,
    userId: String,
    addedby:{ type: String, default: 'Admin' },
    approved: { type: Boolean, default: false }
}, { timestamps: true })
const userData = mongoose.model('user',userSchema);
module.exports = userData;