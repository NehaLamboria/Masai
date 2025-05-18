const mongoose = require('mongoose');
const validator = require('validator');

const profileSchema = new mongoose.Schema({
  profileName: {
    type: String,
    enum: ['fb', 'twitter', 'github', 'instagram'],
    required: [true, 'Profile name is required and must be one of fb, twitter, github, instagram']
  },
  url: {
    type: String,
    required: [true, 'Profile URL is required'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: props => `${props.value} is not a valid URL`
    }
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Password must be minimum 6 characters']
  },
  profiles: [profileSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
