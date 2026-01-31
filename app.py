from flask import Flask, request, jsonify
from flask_cors import CORS  # <--- مهم

app = Flask(__name__)
CORS(app)  # هذا يسمح لأي موقع frontend بالاتصال بالسيرفر

@app.route("/")
def home():
    return "Backend is running"

@app.route("/generate_idea", methods=["POST"])
def generate_idea():
    data = request.json
    # مؤقت للتأكد أن الاتصال شغال
    idea = f"Test idea for {data.get('type', 'general')} on {data.get('platform', 'platform')}"
    return jsonify({"idea": idea})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
