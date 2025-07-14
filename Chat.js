import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Сайн байна уу? Танд хэрхэн туслах вэ?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.result) {
        setMessages([...newMessages, { role: 'assistant', content: data.result }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', content: 'Алдаа гарлаа. Дахин оролдоно уу.' }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Сүлжээний алдаа гарлаа.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === 'user' ? 'Та' : msg.role === 'assistant' ? 'Оюунсанаа' : 'Систем'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Асуух зүйлээ бичээрэй..."
        style={{ width: '70%', padding: '8px' }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ marginLeft: 10 }}>
        Илгээх
      </button>
    </div>
  );
}
