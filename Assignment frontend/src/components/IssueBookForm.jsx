import React, { useState } from 'react';

const IssueBookForm = () => {
  const [bookName, setBookName] = useState('');
  const [userId, setUserId] = useState('');
  const [issueDate, setIssueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/transactions/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookName, userId, issueDate }),
      });
      const data = await response.json();
      alert(data.message);
      // Optionally reset form or handle success
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl mb-2">Issue Book</h2>
      <div className="mb-4">
        <label className="block mb-1">Book Name</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          required
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Issue Date</label>
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          required
          className="border px-2 py-1 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Issue Book
      </button>
    </form>
  );
};

export default IssueBookForm;