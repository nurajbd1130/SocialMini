
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiCreatePost } from '../services/api';
import type { Post } from '../types';

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post content cannot be empty.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const newPost = await apiCreatePost({ content, image: image || undefined });
      onPostCreated(newPost);
      setContent('');
      setImage(null);
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start space-x-4">
        <img
          src={user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user.name}?`}
            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
          ></textarea>
          {image && <p className="mt-2 text-sm text-slate-500">Selected: {image.name}</p>}
           {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="flex items-center justify-between mt-2">
            <label htmlFor="image-upload" className="cursor-pointer text-slate-500 hover:text-primary-600">
              {/* SVG Icon for Image */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 disabled:bg-primary-300"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
