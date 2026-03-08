const Order = require("../models/order");
const Cart = require("../models/cart");

/**
 PLACE ORDER
*/
exports.placeOrder = async (req, res) => {
    try {

        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const order = await Order.create({
            userId: req.user.id,
            items: cart.items,
            totalPrice: cart.totalPrice
        });

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order failed",
            error: error.message
        });
    }
};


/**
 USER ORDER HISTORY
*/
exports.getUserOrders = async (req, res) => {
    try {

        const orders = await Order.find({ userId: req.user.id })
            .populate("items.bookId");

        res.status(200).json({
            success: true,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};


/**
 ADMIN UPDATE ORDER STATUS
*/
exports.updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update order",
            error: error.message
        });
    }
};