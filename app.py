from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend is running"

@app.route("/generate_idea", methods=["POST"])
def generate_idea():
    data = request.json
    return jsonify({"idea": "Test idea"})

if __name__ == "__main__":
    # Railway يعطي PORT في متغير البيئة
    port = int(os.environ.get("PORT", 5000))  # <-- هنا الفرق
    app.run(host="0.0.0.0", port=port)
