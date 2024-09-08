import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link to="/books"> 
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          BookList
        </button>
      </Link>
    </div>
  );
};

export default Home;

