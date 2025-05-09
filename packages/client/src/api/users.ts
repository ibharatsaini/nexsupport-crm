// import { delay, generateId } from '../lib/utils';
// import { users } from '../data/mockData';
// import { User, ApiResponse, UserRole } from '../types';

// // Get all users
// export async function getUsers(): Promise<ApiResponse<User[]>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   return {
//     success: true,
//     message: 'Users retrieved successfully',
//     data: [...users],
//   };
// }

// // Get user by ID
// export async function getUserById(id: string): Promise<ApiResponse<User>> {
//   // Simulate network delay
//   await delay(null, 500);
  
//   const user = users.find(user => user.id === id);
  
//   if (!user) {
//     throw new Error('User not found');
//   }
  
//   return {
//     success: true,
//     message: 'User retrieved successfully',
//     data: { ...user },
//   };
// }

// // Create a new user
// export async function createUser(
//   userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<ApiResponse<User>> {
//   // Simulate network delay
//   await delay(null, 1000);
  
//   // Check if user already exists
//   const existingUser = users.find(user => user.email === userData.email);
  
//   if (existingUser) {
//     throw new Error('User with this email already exists');
//   }
  
//   const newUser: User = {
//     id: generateId(),
//     ...userData,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
  
//   users.push(newUser);
  
//   return {
//     success: true,
//     message: 'User created successfully',
//     data: newUser,
//   };
// }

// // Update an existing user
// export async function updateUser(
//   id: string,
//   userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
// ): Promise<ApiResponse<User>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const index = users.findIndex(user => user.id === id);
  
//   if (index === -1) {
//     throw new Error('User not found');
//   }
  
//   // Check if email is being updated and is unique
//   if (userData.email && userData.email !== users[index].email) {
//     const existingUserWithEmail = users.find(
//       user => user.email === userData.email && user.id !== id
//     );
    
//     if (existingUserWithEmail) {
//       throw new Error('User with this email already exists');
//     }
//   }
  
//   const updatedUser: User = {
//     ...users[index],
//     ...userData,
//     updatedAt: new Date().toISOString(),
//   };
  
//   users[index] = updatedUser;
  
//   return {
//     success: true,
//     message: 'User updated successfully',
//     data: updatedUser,
//   };
// }

// // Delete a user
// export async function deleteUser(id: string): Promise<ApiResponse<null>> {
//   // Simulate network delay
//   await delay(null, 700);
  
//   const index = users.findIndex(user => user.id === id);
  
//   if (index === -1) {
//     throw new Error('User not found');
//   }
  
//   users.splice(index, 1);
  
//   return {
//     success: true,
//     message: 'User deleted successfully',
//     data: null,
//   };
// }

// // Get users by role
// export async function getUsersByRole(role: UserRole): Promise<ApiResponse<User[]>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const filteredUsers = users.filter(user => user.role === role);
  
//   return {
//     success: true,
//     message: 'Users retrieved successfully',
//     data: filteredUsers,
//   };
// }

import {api} from '../lib/api';
import { User, ApiResponse, UserRole } from '../types';

export async function getUsers(): Promise<ApiResponse<User[]>> {
  const response = await api.get('/users');
  return response.data;
}

export async function getUserById(id: string): Promise<ApiResponse<User>> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function createUser(
  userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<User>> {
  const response = await api.post('/users', userData);
  return response.data;
}

export async function updateUser(
  id: string,
  userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<User>> {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
}

export async function deleteUser(id: string): Promise<ApiResponse<null>> {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}

export async function getUsersByRole(role: UserRole): Promise<ApiResponse<User[]>> {
  const response = await api.get(`/users/role/${role}`);
  return response.data;
}