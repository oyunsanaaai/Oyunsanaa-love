import Chat from './Chat';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Сайн байна уу, Оюунсанаа chatbot энд ажиллаж байна</h1>
      <p>Та надад юу ч асууж болно 🧠</p>
      <Chat />
    </div>
  );
}
