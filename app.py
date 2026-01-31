@app.route("/list_models")
def list_models():
    try:
        models = genai.list_models()  # يرجع كل الموديلات المتاحة
        return jsonify(models)
    except Exception as e:
        return jsonify({"error": str(e)})
