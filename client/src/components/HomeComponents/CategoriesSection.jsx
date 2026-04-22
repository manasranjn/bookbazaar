import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");

      setCategories(res.data.data);
    } catch (error) {
      console.error("CATEGORY ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 data-aos="fade-up" className="text-3xl font-bold text-center mb-6">
          Browse Categories
        </h2>

        {/* 🔹 Loading */}
        {loading ? (
          <div className="grid md:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found</p>
        ) : (
          <div className="grid md:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                data-aos="zoom-in"
                className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
              >
                {cat.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
