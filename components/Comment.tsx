
import React from 'react';
import { Link } from 'react-router-dom';
import type { Comment } from '../types';

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
        <div className="flex items-start space-x-3 py-2">
            <Link to={`/profile/${comment.author.id}`}>
                <img 
                    src={comment.author.avatar_url || `https://i.pravatar.cc/150?u=${comment.author.id}`} 
                    alt={comment.author.name} 
                    className="w-8 h-8 rounded-full" 
                />
            </Link>
            <div className="flex-1 bg-slate-100 rounded-lg p-2">
                <Link to={`/profile/${comment.author.id}`} className="font-semibold text-sm text-slate-800 hover:underline">{comment.author.name}</Link>
                <p className="text-sm text-slate-700">{comment.content}</p>
            </div>
        </div>
    );
};

export default CommentComponent;
