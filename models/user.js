const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String, // sets the datatype - see options below
    required: true, // every instance has to have this field
    minlength: 2,  // we can specify min/max length of fields
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