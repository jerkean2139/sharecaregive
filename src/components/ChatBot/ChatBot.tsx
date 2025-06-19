import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import type { ChatMessageProps } from './ChatMessage';

// Initial welcome message from the assistant
const INITIAL_MESSAGE = {
  id: '1',
  content: "Hello! I'm your Share Care Give assistant. How can I help you today?",
  role: 'assistant' as const,
  timestamp: new Date()
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessageProps['message'][]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (this will be replaced with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your message. This is a placeholder response. In the final implementation, this will be connected to an AI service with a vector database of Share Care Give knowledge.`,
        role: 'assistant' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#69932f] text-white shadow-lg flex items-center justify-center hover:bg-[#5a7f28] transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 ease-in-out ${
            isMinimized ? 'h-14' : 'h-[500px] max-h-[80vh]'
          }`}
        >
          {/* Chat header */}
          <div className="bg-[#00304f] text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#69932f] flex items-center justify-center mr-2">
                <span className="text-xs font-bold">AI</span>
              </div>
              <h3 className="font-medium">Share Care Give Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMinimize} 
                className="text-white/80 hover:text-white"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button 
                onClick={toggleChat} 
                className="text-white/80 hover:text-white"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          {!isMinimized && (
            <div className="p-4 h-[calc(100%-120px)] overflow-y-auto">
              {messages.map(message => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isLoading={isLoading && messages[messages.length - 1].id === message.id && message.role === 'user'} 
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Chat input */}
          {!isMinimized && (
            <form onSubmit={handleSubmit} className="border-t p-3 bg-gray-50">
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#00304f]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`p-2 rounded-r-lg ${
                    isLoading || !input.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#69932f] text-white hover:bg-[#5a7f28]'
                  }`}
                  disabled={isLoading || !input.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};
