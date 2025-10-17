# 🌦️ Forecastly App

A simple and interactive weather application built using **React.js** that allows users to search weather details by **city name**, fetches data from the **OpenWeatherMap API**, and displays detailed weather information.

---

## 🚀 Features

✅ **Search Weather by City Name**  
Users can type any city name to get real-time weather data.

✅ **Weather Details Display**
- City Name  
- Temperature (°C)  
- Weather Condition (Clear, Cloudy, Rainy, etc.)  
- Weather Icon or background based on the condition  
- Humidity
- “Feels Like” Temperature  

✅ **Dynamic Background**
- Background color changes automatically based on current weather condition (e.g., sunny, cloudy, rainy, etc.)

✅ **Save Last Searched City**
- The last searched city is saved in `localStorage` so that it persists even after reloading the page.

✅ **Default Weather by Location**
- On first load, the app automatically detects your **current location** using the **Geolocation API** and shows the weather for your city.

---

## 🧰 Tech Stack

- **Frontend:** React.js, CSS / Tailwind CSS  
- **API:** [OpenWeatherMap API](https://openweathermap.org/api)  
- **Browser APIs:** Geolocation API, LocalStorage  

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```
   
2. Install Dependencies
   ```bash
   npm install
   ```
  
3. Get Your API Key
   - Go to OpenWeatherMap
   - Create a free account
   - Generate your API key
     
4. Add Environment Variable
   Create a .env file in the root directory and add your API key:
   ```bash
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```
   
6. Start the Development Server
   ```bash
   npm run dev
   ```

7. Open in Browser
   Visit 👉 http://localhost:5173

## Screenshots
<img width="1920" height="1080" alt="Screenshot (866)" src="https://github.com/user-attachments/assets/4b0e9969-689c-4dee-82de-0bd816ce25f4" />

<img width="1920" height="1080" alt="Screenshot (867)" src="https://github.com/user-attachments/assets/b3da54be-ef1d-4252-880c-f78fe81782cc" />


## 🧑‍💻 Author
Yashi Sharma
