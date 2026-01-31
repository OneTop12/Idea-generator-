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
    location: document.getElementById("locationDesc").value
  };

  const resultBox = document.getElementById("ideaContent");
  resultBox.innerHTML = "<em>Generating...</em>";

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

    // نفترض أن الـ backend يرجع فكرة بشكل نص يحتوي على جميع العناصر
    // نقدر نستخدم split أو regex لتقسيم النص حسب علامات محددة
    // هذي طريقة مبسطة للعرض
    const text = result.idea;

    // حاول تقسيم النص إلى عناصر رئيسية (تعديل حسب طريقة رد الـ AI)
    const sections = text.split("\n").filter(line => line.trim() !== "");

    let html = "";
    sections.forEach(section => {
      if (section.toLowerCase().includes("hook")) {
        html += `<h3>Hook</h3><p>${section}</p>`;
      } else if (section.toLowerCase().includes("description") || section.toLowerCase().includes("idea")) {
        html += `<h3>شرح الفكرة</h3><p>${section}</p>`;
      } else if (section.toLowerCase().includes("strength")) {
        html += `<h3>نقاط القوة</h3><p>${section}</p>`;
      } else if (section.toLowerCase().includes("improve") || section.toLowerCase().includes("suggestion")) {
        html += `<h3>اقتراحات التحسين</h3><p>${section}</p>`;
      } else if (section.toLowerCase().includes("#")) {
        html += `<h3>هاشتاغات</h3><p>${section}</p>`;
      } else if (section.toLowerCase().includes("track")) {
        html += `<h3>تراك</h3><p>${section}</p>`;
      } else {
        html += `<p>${section}</p>`; // أي نص إضافي
      }
    });

    resultBox.innerHTML = html;

  } catch (error) {
    resultBox.innerHTML = "<p>Test idea (fallback)</p>";
    console.error(error);
  }
});
