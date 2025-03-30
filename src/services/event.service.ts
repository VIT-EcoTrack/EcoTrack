import api from './api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  capacity: number;
  participants: {
    _id: string;
    name: string;
    email: string;
  }[];
  organizer: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const eventService = {
  async getAllEvents(): Promise<Event[]> {
    const response = await api.get<Event[]>('/events');
    return response.data;
  },

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    const response = await api.post<Event>('/events', eventData);
    return response.data;
  },

  async joinEvent(eventId: string): Promise<Event> {
    const response = await api.post<Event>(`/events/${eventId}/join`);
    return response.data;
  },

  async leaveEvent(eventId: string): Promise<Event> {
    const response = await api.post<Event>(`/events/${eventId}/leave`);
    return response.data;
  },

  async deleteEvent(eventId: string): Promise<void> {
    await api.delete(`/events/${eventId}`);
  }
};

export default eventService;
