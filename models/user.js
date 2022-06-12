const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return (/^http(s)?:\/{2}(w{3}.)?[\w-]+.\w+/ig.test(value))
      }
    }
  },
});

module.exports = mongoose.model('user', userSchema);