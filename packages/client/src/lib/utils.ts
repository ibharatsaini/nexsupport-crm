import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge classes with tailwind-merge
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Format date to locale string
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format date to relative time string
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  return formatDate(date);
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Delay promise for mocking API calls
export function delay<T>(data: T, ms = 500): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

// Handle API response with loading/error states
export async function handleApiResponse<T>(
  apiCall: Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void
): Promise<{ data: T | null; error: Error | null; isLoading: boolean }> {
  try {
    const data = await apiCall;
    onSuccess?.(data);
    return { data, error: null, isLoading: false };
  } catch (error) {
    const err = error instanceof Error ? error : new Error('An unknown error occurred');
    onError?.(err);
    return { data: null, error: err, isLoading: false };
  }
}

// Create a search function that filters an array of objects based on a search term
export function createSearchFilter<T>(
  items: T[], 
  searchTerm: string, 
  fields: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearchTerm);
      }
      return false;
    });
  });
}