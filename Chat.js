const data = await res.json();
if (data.content) {
  setMessages([...newMessages, { role: 'assistant', content: data.content }]);
} else {
  setMessages([...newMessages, { role: 'assistant', content: 'Алдаа гарлаа. Дахин оролдоно уу.' }]);
}
