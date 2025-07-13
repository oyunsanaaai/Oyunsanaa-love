import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages([...messages, userMessage, { role: 'assistant', content: data.response }]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Оюунсанаа chatbot</h1>
      <div style={{ border: '1px solid gray', padding: 10, minHeight: 200 }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.role === 'user' ? 'Та' : 'Оюунсанаа'}:</b> {msg.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Асуух зүйлээ бичээрэй..."
      />
      <button onClick={handleSend}>Илгээх</button>
    </div>
  );
}
