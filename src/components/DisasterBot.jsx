import React, { useState, useEffect } from 'react';
import { IconRobot } from '@tabler/icons-react'; // Import the Tabler Icons Robot
import { callOpenAI } from './openai'; // Adjust based on your file structure

const DisasterBot = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(true);

  // Initialize the conversation with a welcome message from the bot
  const [conversation, setConversation] = useState([
    { role: 'assistant', content: 'Hey, welcome to Disaster Bot AI! How can I help you today?' }
  ]);

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (loading || !query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setConversation(prev => [...prev, userMessage]);

    setLoading(true);
    setQuery(''); // Clear input field

    try {
      const botResponse = await callOpenAI(query);
      const botMessage = { role: 'assistant', content: botResponse };

      // Add bot's response to the conversation array
      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { role: 'assistant', content: 'Error occurred. Please try again.' };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  // Function to toggle the chatbot modal
  const toggleChat = () => setShowChat(prev => !prev);

  // Hide the prompt message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsPromptVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating chat bubble */}
      <div className="chat-bubble-container">
        <div className="chat-bubble" onClick={toggleChat}>
          {/* Using Tabler Icons' robot icon */}
          <IconRobot size={30} color="white" />
        </div>

        {/* Optional pop-up message to encourage user interaction */}
        {isPromptVisible && (
          <div className="chat-prompt">
            Need help? Click the AI to assist you in being more secure!
          </div>
        )}
      </div>

      {/* Chatbot modal */}
      {showChat && (
        <div className="chatbot-modal">
          <div className="modal">
            <header>
              <h2>Disaster Bot</h2>
              <button className="close-button" onClick={toggleChat}>✖</button>
            </header>

            {/* Chat window */}
            <div className="chat-window">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  {message.content}
                </div>
              ))}
            </div>

            {/* Chat input form */}
            <form onSubmit={handleSubmit} className="chat-input-form">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about disaster preparation..."
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DisasterBot;
