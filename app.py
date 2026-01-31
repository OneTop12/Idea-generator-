from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# المفتاح مضبوط مسبقًا
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/")
def home():
    return "Backend is running"

@app.route("/generate_idea", methods=["POST"])
def generate_idea():
    data = request.json

    prompt = f"""
    Generate a creative YouTube video idea.

    Video Type: {data.get("type", "General")}
    Content Type: {data.get("content_type", "General")}
    Duration: {data.get("duration", "Any")}
    Participants: {data.get("participants", "Any")}
    Audience: {data.get("audience", "General")}
    Gender Focus: {data.get("gender", "Any")}
    Budget: {data.get("budget", "Any")}

    Include suggested hashtags and a short catchy title.
    """

    try:
        # الطريقة الصحيحة للـ Gemini API الحديثة
        response = genai.generate_text(
            model="gemini-1.5",  # موديل رسمي متاح
            prompt=prompt,
            temperature=0.7,
            max_output_tokens=300
        )
        return jsonify({"idea": response.text})

    except Exception as e:
        # fallback آمن لتجنب crash
        return jsonify({"idea": f"Test idea (fallback) — Error: {str(e)}"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
