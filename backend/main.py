from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests, os, re
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS setup for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client initialization
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ------------------------------------------------------------
# ✅ Weather Data Function — Fully stable version
# ------------------------------------------------------------
def get_weather(city: str):
    """
    Fetches real-time weather data for a city using wttr.in.
    Returns a structured dictionary for frontend rendering.
    """
    try:
        url = f"https://wttr.in/{city}?format=%C|%t|%h|%w"
        # Example format: "Partly cloudy|+30°C|60%|15 km/h"
        res = requests.get(url, timeout=6)

        if res.status_code != 200:
            return {"city": city, "error": "Weather API request failed"}

        data = res.text.strip().split("|")
        if len(data) < 4:
            return {"city": city, "error": "Incomplete weather data"}

        condition, temperature, humidity, wind = data
        return {
            "city": city.capitalize(),
            "condition": condition,
            "temperature": temperature.replace("+", "").replace("°C", ""),
            "humidity": humidity.replace("%", ""),
            "feels_like": temperature.replace("+", "").replace("°C", ""),
            "wind_speed": wind.replace(" km/h", ""),
        }

    except Exception as e:
        return {"city": city, "error": str(e)}


# ------------------------------------------------------------
# 🧠 AI-Powered Weather Agent
# ------------------------------------------------------------
@app.post("/agent")
async def weather_agent(request: Request):
    """
    Handles queries like:
    'What’s the weather in Delhi and Mumbai?'
    and returns structured weather data for all cities.
    """
    data = await request.json()
    user_query = data.get("query", "")

    # AI prompt to detect all city names in the query
    system_prompt = """
    You are an AI weather assistant.
    Your job is to identify all city names mentioned by the user.
    Return only a comma-separated list of cities (no extra words).
    Example:
    Input: "What is the weather in Delhi and Mumbai?"
    Output: Delhi, Mumbai
    """

    # Ask Groq to extract cities
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_query},
        ],
    )

    ai_text = response.choices[0].message.content.strip()
    print(f"🧠 AI extracted cities: {ai_text}")

    # Detect multiple cities via regex
    cities = re.split(r",|and|&", ai_text)
    cities = [c.strip() for c in cities if c.strip()]

    if not cities:
        return {"error": "No valid city detected", "ai_reasoning": ai_text}

    # Fetch live weather for each detected city
    weather_data = [get_weather(city) for city in cities]

    return {
        "ai_reasoning": f"Detected cities: {', '.join(cities)}",
        "weather_data": weather_data,
    }


@app.get("/")
def home():
    return {"message": "🌤 Weather Agent API is live!"}
