
import React, { useEffect, useState } from 'react';
import { apiGetPosts, apiCreatePost } from '../services/api';
import type { Post } from '../types';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import CreatePostForm from '../components/CreatePostForm';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await apiGetPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePostForm onPostCreated={handlePostCreated} />
      
      <div className="mt-8 space-y-6">
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
