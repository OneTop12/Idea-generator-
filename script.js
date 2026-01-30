const form = document.getElementById('videoForm');
const ideaContent = document.getElementById('ideaContent');

// Replace with your Gemini 3 API key
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
const GEMINI_API_URL = 'https://api.openai.com/v1/engines/gemini-3/completions';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  ideaContent.innerHTML = 'Generating...';

  const data = {
    videoType: document.getElementById('videoType').value,
    contentType: document.getElementById('contentType').value,
    videoDuration: document.getElementById('videoDuration').value,
    participants: document.getElementById('participants').value,
    audience: document.getElementById('audience').value,
    gender: document.getElementById('gender').value,
    budget: document.getElementById('budget').value,
    boosts: Array.from(document.getElementById('boosts').selectedOptions).map(o => o.value)
  };

  const prompt = `Generate a creative, logical YouTube video idea based on the following data:\n
Video Type: ${data.videoType}\n
Content Type: ${data.contentType}\n
Video Duration: ${data.videoDuration}\n
Participants: ${data.participants}\n
Audience: ${data.audience}\n
Gender: ${data.gender}\n
Budget: ${data.budget}\n
Optional Boosts: ${data.boosts.join(', ')}\n
Output: Title, Full Idea Description, Optional Enhancements, Suggested Hashtags`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 500
      })
    });

    const result = await response.json();
    ideaContent.innerHTML = `<pre>${result.choices[0].text}</pre>`;
  } catch (err) {
    ideaContent.innerHTML = 'Error generating idea. Check your API key and network.';
    console.error(err);
  }
});
