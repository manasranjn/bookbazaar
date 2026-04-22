const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getUserOrders,
    updateOrderStatus,
    getAllOrders
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getUserOrders);

router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.put("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;