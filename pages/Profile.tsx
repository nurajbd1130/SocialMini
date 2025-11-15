
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiGetUserProfile, apiGetUserPosts } from '../services/api';
import type { User, Post } from '../types';
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [profileData, postsData] = await Promise.all([
          apiGetUserProfile(id),
          apiGetUserPosts(id),
        ]);
        setProfile(profileData);
        setPosts(postsData);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [id]);

  if (loading) return <Spinner />;
  if (!profile) return <p className="text-center text-xl">User not found.</p>;

  const isOwnProfile = currentUser?.id === profile.id;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={profile.avatar_url || `https://i.pravatar.cc/150?u=${profile.id}`}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-primary-500"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-800">{profile.name}</h1>
            <p className="text-slate-500">@{profile.username}</p>
            <p className="mt-2 text-slate-600">{profile.bio}</p>
          </div>
          {isOwnProfile ? (
            <button className="px-4 py-2 text-sm font-semibold border rounded-md border-slate-300 hover:bg-slate-50">Edit Profile</button>
          ) : (
             <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700">Send Message</button>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Posts</h2>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-slate-500 bg-white p-6 rounded-lg shadow-md">This user hasn't posted anything yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
