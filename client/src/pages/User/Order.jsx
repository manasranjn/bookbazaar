import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [loading, setLoading] = useState(false);

  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔹 Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // 🔹 Place Order
  const placeOrder = async () => {
    try {
      if (!token) {
        return alert("Please login first ❌");
      }

      if (!cart || cart.items.length === 0) {
        return alert("Cart is empty ❌");
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message || "Order placed successfully ✅");

      await fetchCart(); // refresh cart after order

      navigate("/");
    } catch (error) {
      console.error("ORDER ERROR:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Order failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Safe total calculation
  const totalPrice =
    cart?.items?.reduce((total, item) => {
      const price = item?.bookId?.price || 0;
      return total + price * item.quantity;
    }, 0) || 0;

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">🧾 Order Summary</h1>

      {!cart || cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {/* Items */}
          <div className="space-y-4 mb-8">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-2"
              >
                <span>
                  {item?.bookId?.title || "Book"} × {item.quantity}
                </span>

                <span>₹ {(item?.bookId?.price || 0) * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>₹ {totalPrice}</span>
          </div>

          {/* Button */}
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </section>
  );
};

export default Order;
