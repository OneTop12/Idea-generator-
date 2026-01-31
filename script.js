// SCROLL TO FORM ON CLICK
document.getElementById('clickScroll').addEventListener('click', () => {
  document.getElementById('ideaForm').scrollIntoView({behavior:'smooth'});
});

// GENERATE IDEAS
document.getElementById('generateBtn').addEventListener('click', () => {
  const platform = document.getElementById('platform').value;
  const duration = parseFloat(document.getElementById('duration').value);
  const hook = document.getElementById('hook').value;
  const location = document.getElementById('location').value;

  const checkboxes = document.querySelectorAll('.checkbox-group input:checked');
  const contentTypes = Array.from(checkboxes).map(cb => cb.value);

  // ANALYZE SHORT OR LONG
  let typeSuggestion = '';
  if(duration <= 3 && platform==='youtube') typeSuggestion = 'This is a YouTube Short';
  else typeSuggestion = 'Standard Content';

  // GENERATE IDEAS
  const ideas = [
    `Idea based on platform: ${platform}`,
    `Content Type Suggestion: ${typeSuggestion}`,
    hook ? `Hook: ${hook}` : 'No Hook specified',
    location ? `Suggested Location: ${location}` : 'No location specified',
    contentTypes.length ? `Selected Content Types: ${contentTypes.join(', ')}` : 'No Content Type selected',
    `Hashtags suggestion: #creative #content #ideas`
  ];

  const ideasList = document.getElementById('ideasList');
  ideasList.innerHTML = '';
  ideas.forEach(i => {
    const li = document.createElement('li');
    li.textContent = i;
    ideasList.appendChild(li);
  });

  // Scroll to output
  document.getElementById('output').scrollIntoView({behavior:'smooth'});
});
