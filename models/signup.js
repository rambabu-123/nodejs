const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  }
});

signupSchema.pre('save', function (next) {
  if (!this.user_id) {
    this.user_id = this._id.toString(); // exact same value as _id
  }
  next();
});

module.exports = mongoose.model('Signup', signupSchema);
