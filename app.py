from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is running"

@app.route("/generate_idea", methods=["POST"])
def generate_idea():
    data = request.json
    return jsonify({"idea": "Test idea"})  # فقط نص ثابت لتأكد أنه frontend + backend شغال

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
