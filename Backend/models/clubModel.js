const mongoose = require('mongoose');
const globalRoles = ['user', 'admin', 'superadmin'];

const userSchema = mongoose.Schema(
  {
    user_id: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    globalRole: {
      type: String,
      enum: globalRoles,
      default: 'user',
    },
    personalInfo: {
      fname: { type: String, required: true },
      lname: { type: String, required: true },
      phone: Number,
      address: String,
      birthdate: Date,
    },
    addedby: { type: String, default: 'self' },
    approved: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// set user_id = _id not on update
userSchema.pre('save', function (next) {
  if (!this.user_id) {
    this.user_id = this._id.toString(); 
  }
  next();
});

const userData = mongoose.model('User', userSchema); 
module.exports = userData;
