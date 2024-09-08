import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTotalRent = async (bookName) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/transactions/total-rent?bookName=${bookName}`);
  return data;
};

const TotalRent = () => {
  const { register, handleSubmit } = useForm();
  const [bookName, setBookName] = useState(null);

  const { data: rent, isLoading, error } = useQuery({
    queryKey: ['totalRent', bookName],
    queryFn: () => fetchTotalRent(bookName),
    enabled: !!bookName, // Only fetch when bookName is not null
  });

  const onSubmit = (data) => {
    setBookName(data.bookName);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-bold mb-4">Total Rent for a Book</h2>
      <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input {...register('bookName')} placeholder="Enter book name"  className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Get Total Rent</button>
      </form>
      {rent && <p>Total Rent: {rent}</p>}
    </div>
  );
};

export default TotalRent;
