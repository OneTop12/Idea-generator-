from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # يسمح للـ frontend من GitHub Pages بالاتصال

# ربط المفتاح من متغير البيئة
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")  # أو نسخة حديثة حسب المكتبة

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
        response = model.generate_content(prompt)
        return jsonify({"idea": response.text})
    except Exception as e:
        return jsonify({"idea": f"Error: {str(e)}"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
