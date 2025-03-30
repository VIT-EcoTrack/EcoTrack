import api from './api';

export interface Waste {
  _id: string;
  type: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'electronic' | 'other';
  quantity: {
    value: number;
    unit: 'kg' | 'pieces';
  };
  location: {
    address: string;
    coordinates: [number, number];
  };
  status: 'reported' | 'assigned' | 'collected' | 'processed';
  reportedBy: {
    _id: string;
    name: string;
  };
  assignedTo?: {
    _id: string;
    name: string;
  };
  images: string[];
  description?: string;
  createdAt: string;
  collectedAt?: string;
  processedAt?: string;
}

const wasteService = {
  async getAllWaste(): Promise<Waste[]> {
    const response = await api.get<Waste[]>('/waste');
    return response.data;
  },

  async reportWaste(wasteData: Partial<Waste>): Promise<Waste> {
    const response = await api.post<Waste>('/waste/report', wasteData);
    return response.data;
  },

  async assignWaste(wasteId: string, workerId: string): Promise<Waste> {
    const response = await api.put<Waste>(`/waste/${wasteId}/assign`, { workerId });
    return response.data;
  },

  async updateWasteStatus(wasteId: string, status: Waste['status']): Promise<Waste> {
    const response = await api.put<Waste>(`/waste/${wasteId}/status`, { status });
    return response.data;
  },

  async getWorkerAssignments(): Promise<Waste[]> {
    const response = await api.get<Waste[]>('/waste/assignments');
    return response.data;
  },

  async classifyWaste(image: File): Promise<{
    classification: string;
    confidence: number;
    insights: string;
  }> {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to classify waste');
    }

    return response.json();
  }
};

export default wasteService;
