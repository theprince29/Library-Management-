import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBooks = async () => {
  const baseUri = import.meta.env.VITE_BASE_BACKEND_URI;
  console.log(baseUri)
  const { data } = await axios.get(`${baseUri}/api/books`);
  return data;
};

const BooksList = () => {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // State for search inputs
  const [bookName, setBookName] = useState("");
  const [category, setCategory] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault(); 
    try {
      
      const termB = bookName ? `term=${encodeURIComponent(bookName)}` : "";
      const cat = category ? `category=${encodeURIComponent(category)}` : "";
      const rentR = minRent && maxRent ? `rentRange=${minRent},${maxRent}` : "";

      
      const queryParams = [termB, cat, rentR]
        .filter((param) => param)
        .join("&");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_BACKEND_URI}/api/search?${queryParams}`
      );

      
      setFilteredBooks(response.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching books</div>;

  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Books List</h2>

      
      <form className="flex flex-row gap-4 mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Book Name"
          className="w-full p-2 border border-gray-300 rounded"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border border-gray-300 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="minRent">Min Rent:</label>
        <input
          id="minRent"
          type="number"
          placeholder="Min Rent"
          className="w-full p-2 border border-gray-300 rounded"
          value={minRent}
          onChange={(e) => {
            const value = Math.max(0, Math.min(10, e.target.value)); 
            setMinRent(value);
          }}
          min="1"
          max="10"
        />
        <label htmlFor="maxRent">Max Rent:</label>
        <input
          id="maxRent"
          type="number"
          placeholder="Max Rent"
          className="w-full p-2 border border-gray-300 rounded"
          value={maxRent}
          onChange={(e) => {
            const value = Math.max(0, Math.min(10, e.target.value)); 
            setMaxRent(value);
          }}
          min="1"
          max="10"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Book Name</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Rent Per Day</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {(filteredBooks.length > 0 ? filteredBooks : books).length > 0 ? (
            (filteredBooks.length > 0 ? filteredBooks : books).map((book) => (
              <tr key={book._id}>
                <td className="border-b p-2">{book.bookName}</td>
                <td className="border-b p-2">{book.category}</td>
                <td className="border-b p-2"> &#8377;{book.rentPerDay}</td>
                <td
                  className={`border-b p-2 ${
                    book.status === "Issued" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {book.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border-b p-2 text-center">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
