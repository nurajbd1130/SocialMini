
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          SocialMini
        </Link>
        
        {user && (
          <div className="hidden md:block w-1/3">
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full px-4 py-2 bg-slate-100 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        )}

        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/" className="text-slate-600 hover:text-primary-600 transition-colors">Home</Link>
              <Link to="/messages" className="text-slate-600 hover:text-primary-600 transition-colors">Messages</Link>
              <div className="relative group">
                <Link to={`/profile/${user.id}`}>
                  <img 
                    src={user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent group-hover:border-primary-500 transition-all"
                  />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link to={`/profile/${user.id}`} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">My Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                      Logout
                    </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-primary-600">Login</Link>
              <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
