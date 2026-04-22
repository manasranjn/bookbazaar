import React from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/assets.js";

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-indigo-50 to-purple-100 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}

        <div data-aos="fade-right" className="md:w-1/2 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover Your Next
            <span className="text-indigo-600"> Favorite Book</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Explore thousands of books across different categories. Buy, read
            and expand your knowledge with BookBazaar.
          </p>

          {/* CTA Buttons */}

          <div className="mt-8 flex gap-4">
            <Link
              to="/books"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition text-center"
            >
              Browse Books
            </Link>

            {/* <Link
              to="/categories"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition text-center"
            >
              Explore Categories
            </Link> */}
          </div>
        </div>

        {/* Right Image */}

        <div
          data-aos="fade-left"
          className="flex justify-center md:w-1/2 w-full"
        >
          <img
            src={assets.image1}
            alt="books"
            className="w-full rounded-xl drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
