
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Messages from './pages/Messages';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <MainApp />
      </HashRouter>
    </AuthProvider>
  );
};

const MainApp: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/messages" element={user ? <Messages /> : <Navigate to="/login" />} />
          <Route path="/messages/:conversationId" element={user ? <Messages /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
