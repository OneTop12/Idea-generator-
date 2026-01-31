async function generateIdea() {
  const resultBox = document.getElementById("result");
  resultBox.innerText = "Generating...";

  const data = {
    platform: "YouTube",
    type: "Creative video",
    audience: "General audience",
    goal: "High engagement"
  };

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
}
