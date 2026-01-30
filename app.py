from flask import Flask, request, jsonify
import os
# لو تستخدم Gemini API:
# import google.generativeai as genai

app = Flask(__name__)

@app.route("/")
def home():
    return "OK"

@app.route("/generate_idea", methods=["POST"])
def generate_idea():
    data = request.json
    # هنا تقدر تحط كود Gemini API لاحقًا
    return jsonify({"idea": "Test idea"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
