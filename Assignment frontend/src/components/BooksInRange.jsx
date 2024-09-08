import React, { useState } from 'react';

const BooksInRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleFetchBooksInRange = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/transactions/range?start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching books in range:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl mb-2">Books Issued in Date Range</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>
      <button onClick={handleFetchBooksInRange} className="bg-teal-500 text-white px-4 py-2 rounded">
        Fetch Books in Range
      </button>
      <ul className="mt-4">
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.bookName} - Issued on: {new Date(transaction.issueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksInRange;
