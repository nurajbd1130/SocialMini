
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup({ name, username, email, password });
      navigate('/');
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-slate-800">Create an Account</h2>
        
        {error && <p className="p-3 text-sm text-center text-red-700 bg-red-100 rounded-md">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"/>
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-slate-700">Username</label>
            <input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"/>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"/>
          </div>
          <div>
            <label htmlFor="password"className="text-sm font-medium text-slate-700">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full px-4 py-2 font-semibold text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
