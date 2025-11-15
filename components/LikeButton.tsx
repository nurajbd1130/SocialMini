
import React from 'react';

interface LikeButtonProps {
    isLiked: boolean;
    onToggle: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onToggle }) => {
    return (
        <button onClick={onToggle} className={`flex items-center space-x-2 font-medium transition-colors ${isLiked ? 'text-red-500' : 'text-slate-600 hover:text-red-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
    );
};

export default LikeButton;
