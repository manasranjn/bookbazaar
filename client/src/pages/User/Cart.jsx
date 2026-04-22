import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useCart();

  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return <p className="text-center py-20 text-gray-500">Cart is empty</p>;
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.bookId.price * item.quantity,
    0,
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">🛒 Your Cart</h1>

      <div className="space-y-6">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow"
          >
            {/* Book Info */}
            <div className="flex items-center gap-6">
              <img
                src={item.bookId?.image}
                alt=""
                className="w-20 h-28 object-cover rounded"
              />

              <div>
                <h3 className="font-semibold">{item.bookId?.title}</h3>

                <p className="text-gray-500">₹ {item.bookId?.price}</p>
              </div>
            </div>

            {/* Quantity */}
            <span className="font-medium">
              Qty:{" "}
              <input type="number" value={item.quantity} className="w-10" />
            </span>
          </div>
        ))}

        {/* Total */}
        <div className="text-right mt-10">
          <h2 className="text-2xl font-bold mb-4">Total: ₹ {totalPrice}</h2>

          <button
            onClick={() => navigate("/orders")}
            className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
