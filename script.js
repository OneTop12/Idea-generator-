const form = document.getElementById('videoForm');
const ideaContent = document.getElementById('ideaContent');

// استخدم الرابط العام اللي طلع من ngrok
const BACKEND_URL = "https://rolande-reverberative-unaromatically.ngrok-free.dev/generate_idea";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  ideaContent.innerHTML = 'Generating...';

  const data = {
    video_type: document.getElementById('videoType').value,
    category: document.getElementById('contentType').value,
    duration: document.getElementById('videoDuration').value,
    participants: document.getElementById('participants').value,
    audience: document.getElementById('audience').value,
    gender: document.getElementById('gender').value,
    budget: document.getElementById('budget').value
  };

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    ideaContent.innerHTML = `<pre>${result.idea}</pre>`;
  } catch (err) {
    ideaContent.innerHTML = 'Error generating idea. Check your backend or network.';
    console.error(err);
  }
});
