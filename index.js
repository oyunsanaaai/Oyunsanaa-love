import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Сайн уу, би Оюунсанаа!</h1>
      <p>Тайвширч, асуух зүйлээ чөлөөтэй</p>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Асуух зүйлээ бичнэ үү..."
      />
      <button onClick={handleSubmit}>Асуух</button>

      {reply && (
        <div style={{ marginTop: 20 }}>
          <strong>Хариулт:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
