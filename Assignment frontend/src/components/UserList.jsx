import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_BACKEND_URI}/api/users`);
  return data;
};

const UserList = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers, 
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Users List</h2>
      <ul className="list-disc pl-6">
        {users.map((user) => (
          <li
            key={user.id}
            className="mb-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            {user.userId}   {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
