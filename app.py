from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend is running"

@app.route("/generate_idea", methods=["POST"])
def generate_idea():
    data = request.json
    # مؤقت فقط للتأكد من اتصال frontend مع backend
    idea = f"Test idea for {data.get('type', 'general')} on {data.get('platform', 'platform')}"
    return jsonify({"idea": idea})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
