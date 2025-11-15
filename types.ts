
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  last_seen: string;
}

export interface Post {
  id: string;
  user_id: string;
  author: User;
  content: string;
  image_url?: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  is_liked_by_user: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  author: User;
  content: string;
  created_at: string;
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  created_at: string;
  members: User[];
  last_message: Message | null;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender: User;
  content: string;
  attachment_url?: string;
  created_at: string;
  delivered: boolean;
}
