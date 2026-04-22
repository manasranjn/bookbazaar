const Book = require("../models/book");

//! CREATE BOOK
exports.createBook = async (req, res) => {
    try {

        const { title, author, description, price, category, stock, image } = req.body;

        const book = await Book.create({
            title,
            author,
            description,
            price,
            category,
            stock,
            image
        });

        res.status(201).json({
            success: true,
            message: "Book created",
            data: book
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: error.message
        });
    }
};


//! GET ALL BOOKS
exports.getBooks = async (req, res) => {
    try {

        const books = await Book.find().populate("category");

        res.status(200).json({
            success: true,
            data: books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch books",
            error: error.message
        });
    }
};


//! GET BOOK BY ID
exports.getBookById = async (req, res) => {
    try {
        const id = req.params.id
        const book = await Book.findById(id).populate("category");

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch book",
            error: error.message
        });
    }
};


//! UPDATE BOOK
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Book updated",
            data: updatedBook
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Update failed",
            error: error.message
        });
    }
};


//! DELETE BOOK
exports.deleteBook = async (req, res) => {
    try {

        await Book.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Book deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete failed",
            error: error.message
        });
    }
};