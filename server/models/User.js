const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    size: { type: String, required: true },
    color: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [cartItemSchema],
    wishlist: [{ type: Number }], // Array of product IDs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
