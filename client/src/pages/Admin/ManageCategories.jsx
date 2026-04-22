import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [name, setName] = useState("");

  const API = "http://localhost:5000/api/categories";

  // 🔹 Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Category name required");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      if (isEdit) {
        await axios.put(`${API}/${selectedId}`, { name }, config);
        alert("Category updated ✅");
      } else {
        await axios.post(API, { name }, config);
        alert("Category added ✅");
      }

      fetchCategories();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Error ❌");
    }
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Edit
  const handleEdit = (cat) => {
    setIsEdit(true);
    setSelectedId(cat._id);
    setName(cat.name);
    setIsOpenModal(true);
  };

  // 🔹 Reset
  const resetForm = () => {
    setName("");
    setIsEdit(false);
    setSelectedId(null);
    setIsOpenModal(false);
  };

  return (
    <div className="p-6 bg-linear-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">📂 Manage Categories</h1>

        <button
          onClick={() => {
            resetForm();
            setIsOpenModal(true);
          }}
          className="cursor-pointer flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Add Category <IoMdAdd />
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>

            <div className="flex justify-between mt-5">
              <button
                onClick={() => handleEdit(cat)}
                className="cursor-pointer flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(cat._id)}
                className="cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-800"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Edit Category" : "Add Category"}
              </h2>

              <button
                onClick={resetForm}
                className="cursor-pointer bg-red-500 text-white p-2 rounded-full"
              >
                <IoClose />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />

              <button
                type="submit"
                className="cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg"
              >
                {isEdit ? "Update Category" : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
