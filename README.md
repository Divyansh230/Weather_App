# 🌦️ Agentic AI Weather App

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Groq](https://img.shields.io/badge/Groq-LLM%20Reasoning-orange?logo=openai)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 🧠 Overview

The **Agentic AI Weather App** is an intelligent weather assistant built with **FastAPI**, **React**, and **Groq LLM**, showcasing how **Agentic AI (LLM + Actions)** works.

It understands natural language queries like  
> “What’s the weather in Delhi and Mumbai?”  

and uses **Chain-of-Thought reasoning** to:
1. Extract city names 🧩  
2. Fetch real-time weather data ☁️  
3. Display interactive cards 🌤️ for each city on a sleek frontend.

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| 🧠 **AI Model** | Groq API – `llama-3.1-8b-instant` |
| ⚙️ **Backend** | FastAPI + Python + Requests |
| 🌤 **Data Source** | [wttr.in](https://wttr.in) |
| 💻 **Frontend** | React + TailwindCSS |
| 🔐 **Env Management** | Python Dotenv |

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/AgenticAI-WeatherApp.git
cd AgenticAI-WeatherApp


cd backend
pip install -r requirements.txt
```

```ini
GROQ_API_KEY=your_groq_api_key_here
```
```bash
uvicorn main:app --reload
```

3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```


