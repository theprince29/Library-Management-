// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./components/Books";
import Home from "./Home";
import BooksList from "./components/BooksList";
import TransactionForm from "./components/TransactionForm";
import TotalRent from "./components/TotalRent";
import "./App.css";
import UserList from "./components/UserList";
import { Link } from "react-router-dom";
import TransactionManagement from "./components/TransactionManagement";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Library Management</h1>
            <div className="space-x-4">
              <Link
                to="/"
                className="text-white hover:text-blue-300 transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/users"
                className="text-white hover:text-blue-300 transition duration-200"
              >
                Users
              </Link>
              <Link
                to="/transactions"
                className="text-white hover:text-blue-300 transition duration-200"
              >
                Transaction
              </Link>
              <Link
                to="/total-rent"
                className="text-white hover:text-blue-300 transition duration-200"
              >
                Total Rent
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<BooksList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/transactions" element={<TransactionManagement/>} />
            <Route path="/total-rent" element={<TotalRent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
