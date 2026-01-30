from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("GEMINI_API_KEY")  # خزن المفتاح في .env

@app.route('/generate_idea', methods=['POST'])
def generate_idea():
    data = request.json
    prompt = f"""
Generate a creative, logical YouTube video idea based on:
Video type: {data['video_type']}
Content type: {data['content_type']}
Duration: {data['duration']}
Participants: {data['participants']}
Audience: {data['audience']}
Gender focus: {data['gender']}
Budget: {data['budget']}
Output: Title, Full Description, Optional Enhancements, Suggested Hashtags
"""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500
        )
        idea_text = response.choices[0].message.content
        return jsonify({"idea": idea_text})
    except Exception as e:
        return jsonify({"idea": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run()
