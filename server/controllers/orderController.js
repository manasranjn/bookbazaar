const Order = require("../models/order");
const Cart = require("../models/cart");

/**
 PLACE ORDER
*/
exports.placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id })
            .populate("items.bookId"); // 🔥 important

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const orderItems = cart.items.map(item => ({
            bookId: item.bookId._id,
            quantity: item.quantity,
            price: item.bookId.price
        }));

        const totalPrice = orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            userId: req.user.id,
            items: orderItems,
            totalPrice
        });

        // Clear cart
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
            .populate("items.bookId", "title price image")
            .sort({ createdAt: -1 }); //latest first

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch your orders",
            error: error.message
        });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId", "name email")
            .populate("items.bookId", "title price image");

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