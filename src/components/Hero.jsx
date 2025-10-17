import React, { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";

const Hero = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [cityName, setCityName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ val: false, msg: "" });
    const [data, setData] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [recentSearches, SetRecentSearches] = useState([]);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const searchWeather = () => {
        let url = "";
        if (cityName) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`;
        }
        setLoading(true);
        setError(false);
        axios
            .get(url)
            .then(function (response) {
                setData(response.data);
                console.log(recentSearches);

                if (cityName != "") {
                    let newHistory = recentSearches.filter((city) => city !== cityName);

                    newHistory.push(cityName);
                    if (newHistory.length > 5) {
                        newHistory = newHistory.slice(-5);
                    }

                    SetRecentSearches(newHistory);
                    localStorage.setItem("history", JSON.stringify(newHistory));
                }
            })
            .catch(function (response) {
                console.log(response);

                setError({ val: true, msg: response.response.data.message });
            })
            .finally(() => {
                setLoading(false);
                setShowDropdown(false)
            });
    };

    const containerRef = useRef(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError({ val: true, msg: "GeoLocation not enabled by your browser" });
        }
        navigator.geolocation.getCurrentPosition((position) =>
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            })
        );
        SetRecentSearches(JSON.parse(localStorage.getItem("history")) || []);

        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (location.lat !== null || location.lon !== null) {
            searchWeather();
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
        <div className="h-screen transition duration-400 ease-in-out" style={{ backgroundColor: bgColor }}>
            <div className="text-black font-bold text-3xl p-3 fixed top-0">Forecastly</div>
            <div className="flex flex-col gap-4 justify-center items-center h-full">
                <h1 className="font-bold text-white text-5xl text-shadow-lg">Today's Weather</h1>
                <div className="min-h-36 min-w-54">
                    {loading === true ? (
                        <p className="text-blue-500 font-semibold">Loading weather data...</p>
                    ) : error.val ? (
                        <div className="px-3 py-1 bg-red-500 rounded-full">
                            <p className="text-red-100">Error: {error.msg}</p>
                        </div>
                    ) : (
                        <div className="shadow-md p-2">
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
                        </div>
                    )}
                </div>

                <div  ref={containerRef} className="grid grid-cols-2 gap-2">
                    <div>
                        <input type="text" placeholder="Search city..." value={cityName} onFocus={() => setShowDropdown(true)} onChange={(e) => setCityName(e.target.value)} className="border border-gray-400 p-2 rounded-lg focus:outline-none" />
                    </div>
                    <button onClick={searchWeather} className="px-4 py-2 font-semibold bg-black text-white rounded-lg">
                        Search
                    </button>
                    {showDropdown && recentSearches.length > 0 && (
                        <div className="bg-gray-200 border border-gray-400 rounded-lg overflow-hidden">
                            <ul>
                                {recentSearches
                                    .slice()
                                    .reverse()
                                    .map((i) => {
                                        return (
                                            <li key={i} onClick={() => setCityName(i)} className="px-3 py-[3px] flex items-center gap-2 cursor-pointer hover:bg-gray-300">
                                                <span>
                                                    <FaHistory color="gray" />
                                                </span>
                                                <span className="text-gray-600">{i}</span>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
