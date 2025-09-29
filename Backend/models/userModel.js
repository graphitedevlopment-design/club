const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Role: String,
    userId: String,
    approved: { type: Boolean, default: false }
}, { timestamps: true })
const userData = mongoose.model('user',userSchema);
module.exports = userData;