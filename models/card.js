const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return (/^http(s)?:\/{2}(w{3}.)?[\w-]+.\w+/ig.test(value))
            }
        }
    },
});