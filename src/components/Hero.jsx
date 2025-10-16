import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FiSunset, FiSunrise } from "react-icons/fi";

import axios from "axios";

const Hero = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [cityName, setCityName] = useState("");
    const [data, setData] = useState({});

    const apiKey = "7cd1dc8955b805a6aa401d56338eb53c";

    const searchWeather = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`)
            .then(function (response) {
                console.log(response);
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("not supported");
        }
        navigator.geolocation.getCurrentPosition((position) =>
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            })
        );
    }, []);

    useEffect(() => {
        if (location.lat !== null || location.lon !== null) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`)
                .then(function (response) {
                    console.log(response);
                    setData(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [location]);

    const weatherColors = {
        Thunderstorm: "#4e4c59",
        Drizzle: "#a9c9ff",
        Rain: "#6e7f9c",
        Snow: "#e0f7fa",
        Mist: "#cfd8dc",
        Smoke: "#757575",
        Haze: "#d7ccc8",
        Dust: "#c2b280",
        Fog: "#b0bec5",
        Sand: "#e4cfa1",
        Ash: "#616161",
        Squall: "#3a4a63",
        Tornado: "#4b626c",
        Clear: "#87ceeb",
        Clouds: "#90a4ae",
    };

    const weatherMain = data?.weather?.[0]?.main;
    const bgColor = weatherColors[weatherMain] || "#ffffff";

    return (
        <div className="h-screen" style={{ backgroundColor: bgColor }}>
            <div className="text-blue-500 font-bold text-3xl p-3 fixed top-0">Forecastly</div>
            <div className="flex flex-col gap-4 justify-center items-center h-full">
                <h1 className="font-bold text-white text-5xl text-shadow-lg">Today's Weather</h1>
                {data && data.main ? (
                    <div>
                        <div className="flex gap-1 justify-center items-center">
                            <FaLocationDot />
                            <h2>{data.name}</h2>
                        </div>
                        <div className="grid grid-cols-2 justify-center items-center">
                            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                            <h3 className="text-4xl font-bold">{Math.round(data.main.temp)}°C</h3>

                            <h3 className="text-xs pl-2">{data.weather[0].main}</h3>
                            <h3 className="text-xs font-light">Feels Like: {Math.round(data.main.temp)}°C</h3>
                        </div>
                        <div className="flex mt-4">
                            <WiHumidity size={24} />
                            <h3>{data.main.humidity}%</h3>
                        </div>
                        {/* <div className="flex">
                            <FiSunrise size={24} />
                            <h3>{new Date(data.sys.sunrise).toLocaleTimeString()} {}</h3>
                        </div>
                        <div className="flex">
                            <FiSunset size={24} />
                            <h3>{new Date(data.sys.sunset).toLocaleTimeString()}</h3>
                        </div> */}

                        {/* <div>Latitude: {location.lat}</div>
                    <div>Longitude: {location.lon}</div> */}
                    </div>
                ) : (
                    <p>Loading weather data</p>
                )}

                <div className="flex gap-6">
                    <input type="text" placeholder="Search city..." value={cityName} onChange={(e) => setCityName(e.target.value)} className="border border-gray-400 p-2 rounded-lg focus:outline-none" />
                    <button onClick={searchWeather} className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
