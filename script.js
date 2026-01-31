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
    let text = result.idea || result.text || "";

    // حاول نقسم النص على العناصر (لو الموديل رجعهم بالشكل "Hook: ... Description: ...")
    const hookMatch = text.match(/Hook:\s*(.+?)(?=\n|$)/i);
    const descriptionMatch = text.match(/Description:\s*(.+?)(?=\n|$)/i);
    const hashtagsMatch = text.match(/Hashtags:\s*(.+?)(?=\n|$)/i);
    const strengthsMatch = text.match(/Strengths:\s*(.+?)(?=\n|$)/i);
    const suggestionsMatch = text.match(/Suggestions:\s*(.+?)(?=\n|$)/i);

    let ideaText = "";
    ideaText += `Hook: ${hookMatch ? hookMatch[1] : text}\n\n`;
    ideaText += `Description: ${descriptionMatch ? descriptionMatch[1] : text}\n\n`;
    ideaText += `Hashtags: ${hashtagsMatch ? hashtagsMatch[1] : ""}\n\n`;
    ideaText += `Strengths: ${strengthsMatch ? strengthsMatch[1] : ""}\n\n`;
    ideaText += `Suggestions: ${suggestionsMatch ? suggestionsMatch[1] : ""}`;

    // اختصار النص إذا طويل
    if (ideaText.length > 800) ideaText = ideaText.slice(0, 800) + "...";

    resultBox.innerText = ideaText;

  } catch (error) {
    resultBox.innerText = "Test idea (fallback)";
    console.error(error);
  }
});
