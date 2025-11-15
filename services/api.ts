
import type { User, Post, Comment, Conversation, Message } from '../types';

// --- MOCK DATA ---
const MOCK_USERS: { [key: string]: User } = {
  '1': { id: '1', name: 'Alice', username: 'alice', email: 'alice@example.com', avatar_url: 'https://picsum.photos/seed/alice/100/100', bio: 'Frontend Developer | React Enthusiast', created_at: new Date().toISOString(), last_seen: new Date().toISOString() },
  '2': { id: '2', name: 'Bob', username: 'bob', email: 'bob@example.com', avatar_url: 'https://picsum.photos/seed/bob/100/100', bio: 'Backend Guru', created_at: new Date().toISOString(), last_seen: new Date().toISOString() },
  '3': { id: '3', name: 'Charlie', username: 'charlie', email: 'charlie@example.com', avatar_url: 'https://picsum.photos/seed/charlie/100/100', bio: 'Just vibing', created_at: new Date().toISOString(), last_seen: new Date().toISOString() },
};

const MOCK_POSTS: Post[] = [
  { id: 'p1', user_id: '2', author: MOCK_USERS['2'], content: 'Just deployed the new microservice! 🚀 #backend', image_url: 'https://picsum.photos/seed/post1/600/400', created_at: new Date(Date.now() - 3600000).toISOString(), likes_count: 15, comments_count: 4, is_liked_by_user: false },
  { id: 'p2', user_id: '1', author: MOCK_USERS['1'], content: 'Loving the new features in React 18. Tailwind CSS makes styling so much faster too!', created_at: new Date(Date.now() - 7200000).toISOString(), likes_count: 42, comments_count: 8, is_liked_by_user: true },
  { id: 'p3', user_id: '3', author: MOCK_USERS['3'], content: 'A beautiful day for a walk in the park.', image_url: 'https://picsum.photos/seed/post3/600/400', created_at: new Date(Date.now() - 86400000).toISOString(), likes_count: 120, comments_count: 12, is_liked_by_user: false },
];

// --- MOCK API FUNCTIONS ---
const mockApiCall = <T,>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

// Auth
export const apiLogin = (credentials: any) => mockApiCall({ token: 'mock-jwt-token', user: MOCK_USERS['1'] });
export const apiSignup = (details: any) => mockApiCall({ token: 'mock-jwt-token', user: MOCK_USERS['1'] });
export const apiGetMe = (token: string) => {
    if (!token) return Promise.reject("No token");
    return mockApiCall(MOCK_USERS['1']);
}

// Posts
export const apiGetPosts = () => mockApiCall(MOCK_POSTS);
export const apiCreatePost = (data: { content: string, image?: File }) => {
    const newPost: Post = {
        id: `p${Math.random()}`,
        user_id: '1',
        author: MOCK_USERS['1'],
        content: data.content,
        image_url: data.image ? 'https://picsum.photos/seed/newpost/600/400' : undefined,
        created_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        is_liked_by_user: false,
    };
    MOCK_POSTS.unshift(newPost);
    return mockApiCall(newPost);
};

// Users
export const apiGetUserProfile = (id: string) => mockApiCall(MOCK_USERS[id] || MOCK_USERS['2']);
export const apiGetUserPosts = (userId: string) => mockApiCall(MOCK_POSTS.filter(p => p.user_id === userId));

// Likes & Comments
export const apiToggleLike = (postId: string) => {
    const post = MOCK_POSTS.find(p => p.id === postId);
    if (post) {
        post.is_liked_by_user = !post.is_liked_by_user;
        post.likes_count += post.is_liked_by_user ? 1 : -1;
    }
    return mockApiCall({ success: true });
}

export const apiGetComments = (postId: string) => mockApiCall([
    { id: 'c1', post_id: postId, user_id: '2', author: MOCK_USERS['2'], content: 'Great point!', created_at: new Date().toISOString() },
    { id: 'c2', post_id: postId, user_id: '3', author: MOCK_USERS['3'], content: 'I agree!', created_at: new Date().toISOString() },
]);

// ... other mock functions for conversations, messages etc. can be added here
