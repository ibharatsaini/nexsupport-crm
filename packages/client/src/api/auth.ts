import {api} from '../lib/api';
import { User, ApiResponse, LoginCredentials, RegisterData, Organization, RegisterResponse } from '../types';

export async function login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
  const response = await api.post('/auth/login', credentials);
  const { user, tokens } = response.data;
  
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  
  return {
    success: true,
    message: 'Login successful',
    data: user,
  };
}

export async function logout(): Promise<ApiResponse<null>> {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  
  return {
    success: true,
    message: 'Logout successful',
    data: null,
  };
}

export async function getCurrentUser(): Promise<ApiResponse<User | null>> {
  try {
    const response = await api.get('/auth/me');
    return {
      success: true,
      message: 'User retrieved successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'User not authenticated',
      data: null,
    };
  }
}

export async function register(data: RegisterData): Promise<ApiResponse<RegisterResponse>> {
  const response = await api.post('/auth/register', data);
  const { user, tokens, organization } = response.data;
  
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);

  


  return {
    success: true,
    message: 'Registration successful',
    data: {
      user,
      organization
    },
  };
}

export function checkNeedsOnboarding(): boolean {
  return localStorage.getItem('needsOnboarding') === 'true';
}

export function completeOnboarding(): void {
  localStorage.removeItem('needsOnboarding');
}