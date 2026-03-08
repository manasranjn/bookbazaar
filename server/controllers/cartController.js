const Cart = require("../models/cart");

//! GET USER CART
exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({ userId: req.user.id })
            .populate("items.bookId");

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
            error: error.message
        });
    }
};


/**
 ADD TO CART
*/
exports.addToCart = async (req, res) => {
    try {

        const { bookId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                userId: req.user.id,
                items: [{ bookId, quantity }]
            });
        } else {

            const itemIndex = cart.items.findIndex(
                item => item.bookId.toString() === bookId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ bookId, quantity });
            }

            await cart.save();
        }

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add to cart",
            error: error.message
        });
    }
};