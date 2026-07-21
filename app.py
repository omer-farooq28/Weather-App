from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("WEATHER_API_KEY")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/weather")
def weather():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "City is required"}), 400

    url = (
        f"https://api.weatherapi.com/v1/forecast.json"
        f"?key={API_KEY}&q={city}&days=7&aqi=yes&alerts=yes"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return jsonify(response.json()), response.status_code

    return jsonify(response.json())


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)