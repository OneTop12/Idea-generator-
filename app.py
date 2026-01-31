from flask import Flask, request, jsonify
import os
import google.generativeai as genai

app = Flask(__name__)

# ربط Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/")
def home():
    return "Backend is running"

@app.route("/generate_idea", methods=["POST"])
def generate_idea():
    data = request.json

    prompt = f"""
    Generate a professional and creative content idea.

    Platform: {data.get("platform")}
    Content type: {data.get("type")}
    Audience: {data.get("audience")}
    Goal: {data.get("goal")}

    Also include:
    - Suggested hashtags
    - Short catchy title
    """

    response = model.generate_content(prompt)

    return jsonify({
        "idea": response.text
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
