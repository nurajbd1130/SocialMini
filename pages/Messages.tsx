
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

// This is a placeholder component for the messaging page.
// A full implementation would involve fetching conversations, handling active chats,
// and using the socket for real-time messages and typing indicators.

const Messages: React.FC = () => {
  const { user } = useAuth();
  // Initialize socket connection
  useSocket(user?.id);

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-lg shadow-md">
      {/* Left Column: Conversations List */}
      <div className="w-1/3 border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold">Messages</h2>
          {/* Search bar can go here */}
        </div>
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          {/* Placeholder for conversation items */}
          <div className="p-4 flex items-center space-x-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
            <img src="https://picsum.photos/seed/bob/50/50" alt="Bob" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">Bob</p>
              <p className="text-sm text-slate-500 truncate">Hey, are you free this weekend?</p>
            </div>
          </div>
          <div className="p-4 flex items-center space-x-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 bg-primary-50">
            <img src="https://picsum.photos/seed/charlie/50/50" alt="Charlie" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">Charlie</p>
              <p className="text-sm text-slate-500 truncate">Yeah, that sounds great!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Active Chat Window */}
      <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3">
          <img src="https://picsum.photos/seed/charlie/50/50" alt="Charlie" className="w-10 h-10 rounded-full" />
          <h3 className="font-semibold">Charlie</h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {/* Placeholder for Message Bubbles */}
            <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 max-w-lg">
                    <p>Yeah, that sounds great!</p>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="bg-primary-600 text-white rounded-lg p-3 max-w-lg">
                    <p>Awesome! Let's meet at the usual spot at 2 PM.</p>
                </div>
            </div>
        </div>
        <div className="p-4 border-t border-slate-200">
            {/* Placeholder for Chat Input */}
            <input 
                type="text" 
                placeholder="Type a message..."
                className="w-full px-4 py-2 bg-slate-100 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
        </div>
      </div>
    </div>
  );
};

export default Messages;
