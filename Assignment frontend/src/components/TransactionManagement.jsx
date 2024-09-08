import React, { useState, useEffect } from 'react';
import TransactionTable from './TransactionTable'; 
import IssueBookForm from './IssueBookForm';
import ReturnBookForm from './ReturnBookForm'; 
import UserBooks from './UserBooks'; 
import BooksInRange from './BooksInRange'; 

const TransactionManagement = () => {
  const [currentView, setCurrentView] = useState('transactions');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Transaction Management</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setCurrentView('transactions')} className="bg-blue-500 text-white px-4 py-2 rounded">
          View Transactions
        </button>
        <button onClick={() => setCurrentView('issue')} className="bg-green-500 text-white px-4 py-2 rounded">
          Issue Book
        </button>
        <button onClick={() => setCurrentView('return')} className="bg-orange-500 text-white px-4 py-2 rounded">
          Return Book
        </button>
        <button onClick={() => setCurrentView('userBooks')} className="bg-purple-500 text-white px-4 py-2 rounded">
          My Books
        </button>
        <button onClick={() => setCurrentView('range')} className="bg-teal-500 text-white px-4 py-2 rounded">
          Books in Range
        </button>
      </div>

      {/* {currentView === 'transactions' && <TransactionTable />} */}
      {currentView === 'issue' && <IssueBookForm />}
      {currentView === 'return' && <ReturnBookForm />}
      {currentView === 'userBooks' && <UserBooks />}
      {currentView === 'range' && <BooksInRange />}
    </div>
  );
};

export default TransactionManagement;
