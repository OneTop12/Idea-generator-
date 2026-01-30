const form = document.getElementById('videoForm');
const ideaContent = document.getElementById('ideaContent');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  ideaContent.innerHTML = 'Generating...';

  const data = {
    video_type: document.getElementById('videoType').value,
    content_type: document.getElementById('contentType').value,
    duration: document.getElementById('videoDuration').value,
    participants: document.getElementById('participants').value,
    audience: document.getElementById('audience').value,
    gender: document.getElementById('gender').value,
    budget: document.getElementById('budget').value
  };

  try {
    const response = await fetch('https://YOUR_PUBLIC_URL_FROM_RAILWAY/generate_idea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    ideaContent.innerHTML = result.idea || 'No idea generated.';
  } catch (err) {
    ideaContent.innerHTML = 'Error generating idea. Check your backend or network.';
    console.error(err);
  }
});
