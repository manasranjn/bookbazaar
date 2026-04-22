import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
    >
      <img
        src={book.image}
        alt={book.title}
        className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{book.title}</h3>

        <p className="text-gray-500 text-sm mb-2">{book.author}</p>

        <p className="text-indigo-600 font-bold mb-3">₹ {book.price}</p>

        <Link
          to={`/books/${book._id}`}
          className="block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
