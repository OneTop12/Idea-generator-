document.getElementById("videoForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    type: document.getElementById("videoType").value,
    content_type: document.getElementById("contentType").value,
    duration: document.getElementById("videoDuration").value,
    participants: document.getElementById("participants").value,
    audience: document.getElementById("audience").value,
    gender: document.getElementById("gender").value,
    budget: document.getElementById("budget").value,
    difficulty: document.getElementById("difficulty").value,
    location: document.getElementById("locationDesc").value,
    language: document.getElementById("language").value,
    country: document.getElementById("country").value
  };

  const resultBox = document.getElementById("ideaContent");
  resultBox.innerText = "Generating...";

  try {
    const response = await fetch(
      "https://idea-generator-production-0421.up.railway.app/generate_idea",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    let ideaText = `Hook: ${result.hook || ""}\n\n`;
    ideaText += `Description: ${result.description || ""}\n\n`;
    ideaText += `Hashtags: ${result.hashtags || ""}\n\n`;
    ideaText += `Strengths: ${result.strengths || ""}\n\n`;
    ideaText += `Suggestions: ${result.suggestions || ""}`;

    if (ideaText.length > 800) ideaText = ideaText.slice(0, 800) + "...";

    resultBox.innerText = ideaText;

  } catch (error) {
    resultBox.innerText = "Test idea (fallback)";
    console.error(error);
  }
});
