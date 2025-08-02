// Configuration for the Grindly API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://grindly.onrender.com';
const API_VERSION = '/api/v1';

// Get auth token from localStorage or environment
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return process.env.GRINDLY_AUTH_TOKEN || null;
};

// API helper function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const fullUrl = `${API_BASE_URL}${API_VERSION}${endpoint}`;
  
  const response = await fetch(fullUrl, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Task interface matching the Grindly API response
export interface Task {
  _id: string;
  title: string;
  description?: string;
  user?: string;
  dueDate?: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  xpReward: number;
  coinReward: number;
  completedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

// Task creation interface
export interface CreateTaskData {
  title: string;
  description?: string;
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  xpReward?: number;
  coinReward?: number;
  dueDate?: string;
}

// Task update interface
export interface UpdateTaskData {
  title?: string;
  description?: string;
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  xpReward?: number;
  coinReward?: number;
  dueDate?: string;
}

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication required. Please log in to view tasks.');
  }

  const response = await apiRequest('/tasks');
  
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch tasks');
  }

  return response.data;
};

// Create a new task
export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  const response = await apiRequest('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description || '',
      frequency: taskData.frequency || 'once',
      xpReward: taskData.xpReward || 5,
      coinReward: taskData.coinReward || 1,
      dueDate: taskData.dueDate,
    }),
  });

  if (!response.success) {
    throw new Error(response.message || 'Failed to create task');
  }

  return response.data;
};

// Get a single task
export const getTask = async (id: string): Promise<Task> => {
  if (!id) {
    throw new Error('Invalid task ID');
  }

  const response = await apiRequest(`/tasks/${id}`);

  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch task');
  }

  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  if (!id) {
    throw new Error('Invalid task ID');
  }

  const response = await apiRequest(`/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.success) {
    throw new Error(response.message || 'Failed to delete task');
  }
};

// Update a task
export const updateTask = async (id: string, taskData: UpdateTaskData): Promise<Task> => {
  if (!id) {
    throw new Error('Invalid task ID');
  }

  const response = await apiRequest(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(taskData),
  });

  if (!response.success) {
    throw new Error(response.message || 'Failed to update task');
  }

  return response.data;
};

// Mark task as complete
export const completeTask = async (id: string): Promise<Task> => {
  if (!id) {
    throw new Error('Invalid task ID');
  }

  const response = await apiRequest(`/tasks/${id}/complete`, {
    method: 'PATCH',
  });

  if (!response.success) {
    throw new Error(response.message || 'Failed to complete task');
  }

  return response.data;
};
