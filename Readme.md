# 📚 BookBazaar -- Book Selling & Buying Platform

# 1. Project Overview

BookBazaar is a full-stack MERN e-commerce web application where users
can browse, search, and purchase books online. The platform provides
separate interfaces for **users (clients)** and **administrators**.

Users can: - Browse books - Filter by category - View book details - Add
books to cart - Place orders - Track order history

Admins can: - Manage books - Manage categories - Manage users - Handle
order management

# 2. Objectives

Main goals of the system:

- Provide a platform to **buy books online**
- Allow **easy browsing and searching**
- Provide **order management**
- Allow **admin to manage books and categories**
- Implement a **scalable MERN architecture**

# 3. Technology Stack

**Frontend:** React.js + Tailwind CSS
**Backend:** Node.js + Express.js
**Database:** MongoDB + Mongoose
**Authentication:** JWT + bcrypt
**State Management:** Context API
**API Communication:** Axios
**Image Storage:** Cloudinary

# 4. System Architecture

### Architecture Type

**MERN Stack Three Layer Architecture**

    Client (React)
          ↓
    REST API (Express Server)
          ↓
    Database (MongoDB)

### Flow

1.  User interacts with **React UI**
2.  React sends **API request via Axios**
3.  Express server processes request
4.  Server interacts with **MongoDB**
5.  Response sent back to client

# 5. Users Roles

## 5.1 User (Customer)

User can: - Register - Login - Browse books - Filter books - Add to
cart - Place order - View order history

## 5.2 Admin

Admin can: - Add books - Update books - Delete books - Manage
categories - View all orders - Update order status

# 6. Functional Requirements

## 6.1 Authentication

System should allow: - User registration - User login - Secure
authentication using JWT

## 6.2 Book Management

Admin should be able to: - Add new book - Edit book - Delete book -
Upload book images

## 6.3 Category Management

Admin should: - Create categories - Update categories - Delete
categories

Examples: - Fiction - Programming - Science - History - Biography

## 6.4 Book Browsing

Users should be able to: - View all books - Filter by category - Search
by book name - View book details

## 6.5 Cart System

Users should be able to: - Add book to cart - Remove book from cart -
Update quantity - View total price

## 6.6 Order System

Users should be able to: - Place order - View order history - Track
order status

Admin should: - View all orders - Update order status

Order Status Examples: - Pending - Processing - Shipped - Delivered

# 7. Frontend Pages (Client)

### Public Pages

1.  Home
2.  About
3.  Categories
4.  Books
5.  Book Details

### User Pages

6.  Cart
7.  Order
8.  Order History
9.  Login
10. Register

# 8. Admin Panel Pages

Admin dashboard pages:

1.  Admin Dashboard
2.  Manage Books
3.  Add/Edit Book
4.  Manage Categories
5.  Manage Orders
6.  Manage Users

# 9. Folder Structure

## Frontend (React)

    client
    |
    |-- src
        |
        |-- assets
        |   |-- assets.js
        |
        |-- components
        |   |-- Navbar.jsx
        |   |-- Footer.jsx
        |   |-- BookCard.jsx
        |
        |-- utils
        |   |-- cloudinary.js
        |
        |-- pages
        |   |--User
        |   |   |-- Home.jsx
        |   |   |-- About.jsx
        |   |   |-- Categories.jsx
        |   |   |-- Books.jsx
        |   |   |-- BookDetails.jsx
        |   |   |-- Cart.jsx
        |   |   |-- Order.jsx
        |   |   |-- OrderHistory.jsx
        |   |
        |   |-- Admin
        |   |   |-- Dashboard.jsx
        |   |   |-- ManageBooks.jsx
        |   |   |-- ManageOrders.jsx
        |   |   |-- ManageCategories.jsx
        |   |   |-- ManageUsers.jsx
        |   |
        |   |-- Common
        |   |   |-- NotFound.jsx
        |   |   |-- Login.jsx
        |
        |-- layouts
        |   |-- AdminLayout.jsx
        |   |-- UserLayout.jsx
        |
        |-- Routes
        |   |-- AppRoutes.jsx
        |   |-- ProtectedRoutes.jsx
        |
        |-- App.jsx

## Backend (Express)

    server
    |
    |-- config
    |   |-- db.js
    |
    |-- models
    |   |-- User.js
    |   |-- Book.js
    |   |-- Category.js
    |   |-- Order.js
    |   |-- Cart.js
    |
    |-- routes
    |   |-- authRoutes.js
    |   |-- bookRoutes.js
    |   |-- categoryRoutes.js
    │   |-- orderRoutes.js
    │   |-- cartRoutes.js
    |
    |-- controllers
    |   |-- authController.js
    |   |-- bookController.js
    |   |-- categoryController.js
    |   |-- orderController.js
    |   |-- cartController.js
    |
    |-- middleware
    |   |-- authMiddleware.js
    |   |-- adminMiddleware.js
    |
    |-- server.js

# 10. Database Design (MongoDB)

## User Model

    User
    -----
    _id
    name
    email
    password
    role (user/admin)
    createdAt

## Book Model

    Book
    -----
    _id
    title
    author
    description
    price
    category
    stock
    image
    createdAt

## Category Model

    Category
    --------
    _id
    name

## Cart Model

    Cart
    -----
    _id
    userId
    items[
        bookId
        quantity
    ]
    totalPrice

## Order Model

    Order
    ------
    _id
    userId
    items[
       bookId
       quantity
    ]
    totalPrice
    status
    orderDate

# 11. API Endpoints

## Auth

    POST /api/auth/register
    POST /api/auth/login

## Books

    GET /api/books
    GET /api/books/:id
    POST /api/books
    PUT /api/books/:id
    DELETE /api/books/:id

## Categories

    GET /api/categories
    POST /api/categories
    PUT /api/categories/:id
    DELETE /api/categories/:id

## Cart

    GET /api/cart
    POST /api/cart/add
    DELETE /api/cart/remove

## Orders

    POST /api/orders
    GET /api/orders
    GET /api/orders/user
    PUT /api/orders/:id/status

# 12. Security

Security implementation:

- JWT authentication
- Password hashing using bcrypt
- Protected routes
- Admin authorization

# 13. Future Enhancements

Possible upgrades:

- Payment gateway (Razorpay/Stripe)
- Wishlist feature
- Book reviews
- Ratings
- Recommendation system
- Email notifications
- PDF invoice

# 14. Deployment

Frontend: - Vercel / Netlify

Backend: - Render / AWS EC2

Database: - MongoDB Atlas
