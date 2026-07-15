from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Hello from Python service"})

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/process")
def process():
    return jsonify({
        "status": "success",
        "result": "Python processed your request"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
