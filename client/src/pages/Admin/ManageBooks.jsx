import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { uploadToCloudinary } from "../../utils/cloudinary";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    author: "",
    category: "",
    description: "",
    image: null,
  });

  const API = "http://localhost:5000/api/books";

  // Fetch Books
  const fetchBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data.data);
  };

  // Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      // Upload image if new file selected
      if (formData.image instanceof File) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      const payload = {
        ...formData,
        image: imageUrl,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (isEdit) {
        await axios.put(`${API}/${selectedBookId}`, payload, config);
        alert("Book Updated ✅");
      } else {
        await axios.post(API, payload, config);
        alert("Book Created ✅");
      }

      fetchBooks();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Error ❌");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchBooks();
  };

  // Edit
  const handleEdit = (book) => {
    setIsEdit(true);
    setSelectedBookId(book._id);

    setFormData({
      title: book.title,
      price: book.price,
      stock: book.stock,
      author: book.author,
      category: book.category?._id,
      description: book.description,
      image: book.image,
    });

    setIsOpenModal(true);
  };

  // Reset
  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      stock: "",
      author: "",
      category: "",
      description: "",
      image: null,
    });
    setIsEdit(false);
    setSelectedBookId(null);
    setIsOpenModal(false);
  };

  return (
    <div className="p-6 bg-linear-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">📚 Manage Books</h1>

        <button
          onClick={() => {
            resetForm();
            setIsOpenModal(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg shadow-md"
        >
          Add Book <IoMdAdd />
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="font-semibold text-lg line-clamp-1">
                {book.title}
              </h2>
              <p className="text-sm text-gray-500">{book.author}</p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-indigo-600 font-bold">₹{book.price}</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {book.category?.name}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(book)}
                  className="cursor-pointer flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => handleDelete(book._id)}
                  className="cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Edit Book" : "Add Book"}
              </h2>

              <button
                onClick={resetForm}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-full"
              >
                <IoClose />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="input"
              />
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                className="input"
              />
              <input
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                type="number"
                className="input"
              />
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="input"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="file"
                onChange={handleImageChange}
                className="input"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="col-span-2 input"
              />

              <button
                type="submit"
                className="cursor-pointer col-span-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg hover:opacity-90"
              >
                {isEdit ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
