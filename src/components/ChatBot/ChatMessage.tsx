import React from 'react';

// Define the types for chat messages
export interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  };
  isLoading?: boolean;
}

// Placeholder for the bot avatar - we'll replace this with the actual image later
const BotAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-[#69932f] flex items-center justify-center text-white">
    <span className="text-xs font-bold">AI</span>
  </div>
);

// User avatar component
const UserAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-[#00304f] flex items-center justify-center text-white">
    <span className="text-xs font-bold">You</span>
  </div>
);

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isBot = message.role === 'assistant';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && <div className="mr-2"><BotAvatar /></div>}
      
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-[#00304f] text-white'
        }`}
      >
        <div className="text-sm">
          {message.content}
          {isLoading && (
            <span className="inline-block ml-1">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse animation-delay-200">.</span>
              <span className="animate-pulse animation-delay-400">.</span>
            </span>
          )}
        </div>
        <div className="text-xs mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isBot && <div className="ml-2"><UserAvatar /></div>}
    </div>
  );
};
