  import React from 'react';
  import { useForm } from 'react-hook-form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import axios from 'axios';

  const TransactionForm = ({ type }) => {
    const { register, handleSubmit, reset } = useForm();
    const queryClient = useQueryClient();

    const mutation = useMutation(
      (data) => {
        if (type === 'issue') {
          return axios.post(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/transactions/issue`, data);
        } else {
          return axios.post(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/transactions/return`, data);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['books']);  
          reset();  
        }
      }
    );

    const onSubmit = (data) => {
      mutation.mutate(data);
    };

    const title = type === 'issue' ? 'Issue a Book' : 'Return a Book';
    const buttonText = type === 'issue' ? 'Issue Book' : 'Return Book';

    return (
      <div className="bg-gray-50 p-4 border rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('userId')}
            placeholder="User ID"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            {...register('bookName')}
            placeholder="Book Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            {...register(type === 'issue' ? 'issueDate' : 'returnDate')}
            type="date"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    );
  };

  export default TransactionForm;
