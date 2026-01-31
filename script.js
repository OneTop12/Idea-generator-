document.getElementById("videoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const loader = document.getElementById("loader");
  const resultBox = document.getElementById("ideaContent");

  loader.classList.remove("hidden");
  resultBox.innerHTML = "";

  const data = {
    platform: platform.value,
    duration: videoDuration.value,
    location: location.value,
    content_type: contentType.value,
    audience: audience.value,
    gender: gender.value,
    budget: budget.value,
    participants: participants.value,
    participants_type: participantsType.value
  };

  try {
    const res = await fetch(
      "https://idea-generator-production-0421.up.railway.app/generate_idea",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    const json = await res.json();

    resultBox.innerHTML = `
      <h3>Video Idea</h3>
      <p>${json.idea}</p>
    `;
  } catch (err) {
    resultBox.innerText = "Something went wrong.";
    console.error(err);
  } finally {
    loader.classList.add("hidden");
  }
});
