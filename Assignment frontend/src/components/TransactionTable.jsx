import React, { useEffect, useState } from 'react';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/transactions`); 
        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Book Name</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Issue Date</th>
            <th className="py-2 px-4 border-b">Return Date</th>
            <th className="py-2 px-4 border-b">Rent Cost</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{transaction.bookName}</td>
              <td className="py-2 px-4 border-b">{transaction.userId}</td>
              <td className="py-2 px-4 border-b">
                {new Date(transaction.issueDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {transaction.returnDate
                  ? new Date(transaction.returnDate).toLocaleDateString()
                  : 'Not Returned'}
              </td>
              <td className="py-2 px-4 border-b">
                {transaction.rentCost ? `$${transaction.rentCost}` : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
