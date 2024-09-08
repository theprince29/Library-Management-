import React, { useState } from 'react';

const UserBooks = () => {
  const [userId, setUserId] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleFetchUserBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/transactions/user/${userId}`);
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching user books:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl mb-2">View My Books</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        className="border px-2 py-1 w-full mb-2"
      />
      <button onClick={handleFetchUserBooks} className="bg-purple-500 text-white px-4 py-2 rounded">
        Fetch My Books
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

export default UserBooks;