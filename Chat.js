import React, { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Сайн байна уу, би Оюунсанаа байна. Танд юугаар туслах вэ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, data]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Оюунсанаа chatbot</h2>
      <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 10, height: 300, overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <div style={{
              display: 'inline-block',
              padding: 10,
              borderRadius: 10,
              background: msg.role === 'user' ? '#DCF8C6' : '#F1F0F0'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ fontStyle: 'italic', color: '#999' }}>Оюунсанаа бичиж байна...</div>}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 10, display: 'flex' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Та асуултаа бичнэ үү..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ marginLeft: 10, padding: '10px 20px' }}>Явуулах</button>
      </form>
    </div>
  );
}
