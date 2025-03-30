import api from './api';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: {
    _id: string;
    name: string;
    email: string;
  };
  assignedBy: {
    _id: string;
    name: string;
    email: string;
  };
  dueDate: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  createdAt: string;
}

const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  async getWorkerTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>('/tasks/my-tasks');
    return response.data;
  },

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const response = await api.post<Task>('/tasks', taskData);
    return response.data;
  },

  async updateTaskStatus(taskId: string, status: Task['status']): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${taskId}/status`, { status });
    return response.data;
  }
};

export default taskService;
