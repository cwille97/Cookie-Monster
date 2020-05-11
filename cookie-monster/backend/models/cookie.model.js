const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cookieSchema = new Schema({
    name: {type: String, required: true },
    description: {type: String, required: true},
    cost: {type: Number, required: true},
    isFavorite: {type: Boolean, required: true},
}, {
    timestamps: true,
});

const Cookie = mongoose.model('Cookie', cookieSchema);

module.exports = Cookie;