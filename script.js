const response = await fetch("https://idea-generator-production-0421.up.railway.app/generate_idea", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)  // data هو الشي اللي تبغى ترسله للـ backend
});

const result = await response.json();
console.log(result.idea); // هنا تطبع النتيجة أو تعرضها في الموقع
