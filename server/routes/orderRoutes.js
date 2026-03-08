const express = require("express");
const router = express.Router();

const {
    placeOrder,
    getUserOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


router.post("/", authMiddleware, placeOrder);
router.get("/user", authMiddleware, getUserOrders);


router.put("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;