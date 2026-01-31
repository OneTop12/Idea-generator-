document.getElementById("videoForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // يمنع الصفحة من إعادة التحميل

  const data = {
    platform: "YouTube",
    type: document.getElementById("videoType").value,
    content_type: document.getElementById("contentType").value,
    duration: document.getElementById("videoDuration").value,
    participants: document.getElementById("participants").value,
    audience: document.getElementById("audience").value,
    gender: document.getElementById("gender").value,
    budget: document.getElementById("budget").value
  };

  const resultBox = document.getElementById("ideaContent");
  resultBox.innerText = "Generating...";

  try {
    const response = await fetch(
      "https://idea-generator-production-0421.up.railway.app/generate_idea",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();
    resultBox.innerText = result.idea;

  } catch (error) {
    resultBox.innerText = "Error generating idea";
    console.error(error);
  }
});
