
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post, Comment as CommentType } from '../types';
import { apiToggleLike, apiGetComments } from '../services/api';
import Comment from './Comment';
import LikeButton from './LikeButton';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [likeCount, setLikeCount] = useState(post.likes_count);

  const handleLikeToggle = async () => {
    // Optimistic UI update
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    try {
      await apiToggleLike(post.id);
    } catch (error) {
      // Revert on failure
      setIsLiked(isLiked);
      setLikeCount(likeCount);
      console.error("Failed to toggle like:", error);
    }
  };

  const fetchComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }
    setLoadingComments(true);
    try {
      const fetchedComments = await apiGetComments(post.id);
      setComments(fetchedComments);
      setShowComments(true);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author.id}`}>
            <img 
              src={post.author.avatar_url || `https://i.pravatar.cc/150?u=${post.author.id}`} 
              alt={post.author.name} 
              className="w-12 h-12 rounded-full" 
            />
          </Link>
          <div>
            <Link to={`/profile/${post.author.id}`} className="font-semibold text-slate-800 hover:underline">{post.author.name}</Link>
            <p className="text-sm text-slate-500">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        </div>
        <p className="mt-4 text-slate-700">{post.content}</p>
      </div>
      {post.image_url && (
        <img src={post.image_url} alt="Post content" className="w-full h-auto object-cover" />
      )}
      <div className="p-4 border-t border-slate-100">
        <div className="flex justify-between items-center text-slate-500">
            <span className="text-sm">{likeCount} Likes</span>
            <span className="text-sm">{post.comments_count} Comments</span>
        </div>
        <div className="flex justify-around items-center pt-2 mt-2 border-t border-slate-100">
            <LikeButton isLiked={isLiked} onToggle={handleLikeToggle} />
            <button onClick={fetchComments} className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 font-medium transition-colors">
                {/* SVG Icon for Comment */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span>Comment</span>
            </button>
        </div>
      </div>
      {showComments && (
        <div className="p-4 bg-slate-50">
            {loadingComments ? <p>Loading comments...</p> : comments.map(c => <Comment key={c.id} comment={c}/>)}
        </div>
      )}
    </div>
  );
};

export default PostCard;
