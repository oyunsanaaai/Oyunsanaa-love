async function fetchAndSetMessages(res) {
  const data = await res.json();

  if (data.choices && data.choices[0]?.message?.content) {
    setMessages([...newMessages, { role: 'assistant', content: data.choices[0].message.content }]);
  } else {
    setMessages([...newMessages, { role: 'assistant', content: 'No response from API' }]);
  }
}
