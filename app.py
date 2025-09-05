from flask import Flask, render_template, request, jsonify
from rag import init_chatbot, get_response

app = Flask(__name__, template_folder="templates", static_folder="static")
qa = init_chatbot()

@app.route("/")  # homepage
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        if not user_message:
            return jsonify({"response": "⚠️ Please type a message."})
        
        bot_response = get_response(qa, user_message)
        return jsonify({"response": bot_response})
    except Exception as e:
        error_msg = str(e)
        if "quota" in error_msg.lower() or "429" in error_msg:
            return jsonify({"response": "🚫 Sorry, I've reached my daily limit of free requests. Please try again tomorrow or consider upgrading your API plan."})
        else:
            return jsonify({"response": "❌ Sorry, I'm having trouble right now. Please try again later."})

if __name__ == "__main__":
    app.run(debug=True)
