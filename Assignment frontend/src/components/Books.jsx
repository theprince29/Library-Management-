import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log(import.meta.env.VITE_BASE_BACKEND_URI)
    axios.get(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching the books:', error);
      });
  }, []);

  
  const filteredBooks = books.filter(book =>
    book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Books List</h1>
      <input
        type="text"
        placeholder="Search for a book..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredBooks.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <li key={book._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold">{book.bookName}</h2>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">Rent Per Day: ₹{book.rentPerDay}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default Books;
