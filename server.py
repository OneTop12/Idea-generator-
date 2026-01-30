from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# استخدم متغير البيئة
openai.api_key = os.getenv("GEMINI_API_KEY")

@app.route('/generate_idea', methods=['POST'])
def generate_idea():
    data = request.json
    prompt = f"""
Generate a creative, logical YouTube video idea based on the following:
Video type: {data['video_type']}
Number of participants: {data['participants']}
Video duration: {data['duration']}
Target audience: {data['audience']}
Gender focus: {data['gender']}
Category: {data['category']}
Budget: {data['budget']}
"""
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300
    )
    return jsonify({"idea": response.choices[0].message.content})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
