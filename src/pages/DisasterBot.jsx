import React, { useState } from 'react';
import { callOpenAI } from '../API/openai'; // Adjust this based on your file structure

const DisasterBot = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading || !query.trim()) return;

    setLoading(true);
    setResponse(''); // Clear previous response
    try {
      const botResponse = await callOpenAI(query);
      setResponse(botResponse);
    } catch (error) {
      setResponse('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bot-container">
      <h1>Disaster Bot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about disaster preparation..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Ask the Bot'}
        </button>
      </form>
      {response && <p>Bot's response: {response}</p>}
    </div>
  );
};

export default DisasterBot;
