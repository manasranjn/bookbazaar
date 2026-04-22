import React from "react";
import PageBanner from "../../components/common/PageBanner";
import AllBooks from "../../components/BooksComponents/Books";

const Books = () => {
  return (
    <div>
      <PageBanner
        title="Browse Books"
        subtitle="Explore thousands of books from different categories"
      />
      <AllBooks />
    </div>
  );
};

export default Books;
