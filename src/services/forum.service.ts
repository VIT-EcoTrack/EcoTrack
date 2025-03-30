import api from './api';

export interface ForumPost {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  comments: {
    _id: string;
    content: string;
    author: {
      _id: string;
      name: string;
      email: string;
    };
    createdAt: string;
  }[];
  likes: string[];
  tags: string[];
  createdAt: string;
}

const forumService = {
  async getAllPosts(): Promise<ForumPost[]> {
    const response = await api.get<ForumPost[]>('/forums');
    return response.data;
  },

  async createPost(postData: { title: string; content: string; tags?: string[] }): Promise<ForumPost> {
    const response = await api.post<ForumPost>('/forums', postData);
    return response.data;
  },

  async addComment(postId: string, content: string): Promise<ForumPost> {
    const response = await api.post<ForumPost>(`/forums/${postId}/comments`, { content });
    return response.data;
  },

  async likePost(postId: string): Promise<ForumPost> {
    const response = await api.post<ForumPost>(`/forums/${postId}/like`);
    return response.data;
  },

  async unlikePost(postId: string): Promise<ForumPost> {
    const response = await api.post<ForumPost>(`/forums/${postId}/unlike`);
    return response.data;
  },

  async deletePost(postId: string): Promise<void> {
    await api.delete(`/forums/${postId}`);
  }
};

export default forumService;
