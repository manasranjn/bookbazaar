const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const allRoutes = require('./routes/allRoutes')

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

//! MIDDLEWARE
app.use(cors());
app.use(express.json());

//! ROUTES
app.use("/api", allRoutes);

//? HEALTH CHECK
app.get("/", (req, res) => {
    res.send("BookBazaar API running...");
});

//! ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Server Error"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});