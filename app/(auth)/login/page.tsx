'use client';

import React, { useEffect, useState } from 'react';

const Login: React.FC = () => {
  const [users, setUsers] = useState<{ iduser: number, name: string, password: string }[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li className='text-2xl' key={user.iduser}>{user.name} {user.password}</li>
        ))}
      </ul>
    </div>
  );
};

export default Login;

