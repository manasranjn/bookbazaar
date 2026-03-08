const express = require('express')
const router = express.Router()

const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const categoryRoutes = require("./categoryRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

module.exports = router;