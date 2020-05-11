const mongoose = require('mongoose');
// this is a model for a shopping cart

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cart: {type: Array, required: true },
}, {
    timestamps: false,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;