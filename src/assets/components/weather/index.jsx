import React, { useState, useCallback, useEffect } from 'react';
import Search from '../search';

// A dictionary of SVG icons for different weather conditions.
const ICONS = {
  thunderstorm: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M47.25,32.39a19.47,19.47,0,0,0-3.44-11.23,19.22,19.22,0,0,0-15-7.94,19.49,19.49,0,0,0-12.74,4.55A15.49,15.49,0,0,0,11,28.45a15.28,15.28,0,0,0,1.35,6.6,15.4,15.4,0,0,0,4,5.49h28.19A11,11,0,0,0,47.25,32.39Z" fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="3"/><path d="M37.67,41.13,31,48.87,35.25,51l-4.5,7.74,10-6.25-4.25-2.25Z" fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="3"/></svg>
  ),
  rain: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M47.25,32.39a19.47,19.47,0,0,0-3.44-11.23,19.22,19.22,0,0,0-15-7.94,19.49,19.49,0,0,0-12.74,4.55A15.49,15.49,0,0,0,11,28.45a15.28,15.28,0,0,0,1.35,6.6,15.4,15.4,0,0,0,4,5.49h28.19A11,11,0,0,0,47.25,32.39Z" fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="3"/><line x1="24.5" y1="46" x2="24.5" y2="54" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="32.5" y1="46" x2="32.5" y2="54" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="40.5" y1="46" x2="40.5" y2="54" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/></svg>
  ),
  snow: (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M47.25,32.39a19.47,19.47,0,0,0-3.44-11.23,19.22,19.22,0,0,0-15-7.94,19.49,19.49,0,0,0-12.74,4.55A15.49,15.49,0,0,0,11,28.45a15.28,15.28,0,0,0,1.35,6.6,15.4,15.4,0,0,0,4,5.49h28.19A11,11,0,0,0,47.25,32.39Z" fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="3"/><line x1="24.5" y1="50" x2="24.5" y2="50" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="22.5" y1="48" x2="26.5" y2="52" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="22.5" y1="52" x2="26.5" y2="48" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="32.5" y1="50" x2="32.5" y2="50" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="30.5" y1="48" x2="34.5" y2="52" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="30.5" y1="52" x2="34.5" y2="48" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="40.5" y1="50" x2="40.5" y2="50" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="38.5" y1="48" x2="42.5" y2="52" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="38.5" y1="52" x2="42.5" y2="48" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/></svg>
  ),
  clear: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="10.88" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="3"/><line x1="32" y1="4.5" x2="32" y2="12.25" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="32" y1="51.75" x2="32" y2="59.5" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="59.5" y1="32" x2="51.75" y2="32" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="12.25" y1="32" x2="4.5" y2="32" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="50.25" y1="13.75" x2="44.57" y2="19.43" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="19.43" y1="44.57" x2="13.75" y2="50.25" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="50.25" y1="50.25" x2="44.57" y2="44.57" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="19.43" y1="19.43" x2="13.75" y2="13.75" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/></svg>
  ),
  clouds: (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M47.25,32.39a19.47,19.47,0,0,0-3.44-11.23,19.22,19.22,0,0,0-15-7.94,19.49,19.49,0,0,0-12.74,4.55A15.49,15.49,0,0,0,11,28.45a15.28,15.28,0,0,0,1.35,6.6,15.4,15.4,0,0,0,4,5.49h28.19A11,11,0,0,0,47.25,32.39Z" fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="3"/></svg>
  ),
};

const WeatherIcon = ({ condition, className }) => {
  const lowerCaseCondition = condition.toLowerCase();
  let iconKey = 'clouds'; // Default icon

  if (lowerCaseCondition.includes('thunder')) iconKey = 'thunderstorm';
  else if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) iconKey = 'rain';
  else if (lowerCaseCondition.includes('snow')) iconKey = 'snow';
  else if (lowerCaseCondition.includes('clear')) iconKey = 'clear';
  else if (lowerCaseCondition.includes('clouds')) iconKey = 'clouds';
  
  return <div className={className}>{ICONS[iconKey]}</div>;
};

// Mock forecast data to match the UI, as the current weather API doesn't provide a forecast.
const MOCK_FORECAST = [
  { day: 'Mon', condition: 'clouds', max: 22, min: 16 },
  { day: 'Tue', condition: 'thunderstorm', max: 20, min: 13 },
  { day: 'Wed', condition: 'rain', max: 18, min: 11 },
  { day: 'Thu', condition: 'clouds', max: 22, min: 16 },
  { day: 'Fri', condition: 'clear', max: 25, min: 14 },
];

const kelvinToCelsius = (k) => Math.round(k - 273.15);

function Weather() {
    const [search, setSearch] = useState("Islamabad");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWeatherData = useCallback(async (city) => {
        if (!city) return;
        setLoading(true);
        setError(null);
        setWeatherData(null);
        try {
            const apiKey = "79a27073615c4d9270260c2314886463";
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'City not found');
            }

            const data = await res.json();
            setWeatherData(data);
        } catch (e) {
            setError(e.message);
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchWeatherData("Islamabad");
    }, [fetchWeatherData]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData(search);
    };

    return (
        <div className="w-full max-w-xs sm:max-w-sm bg-black/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl text-white">
            <Search 
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />

            <div className="text-center">
                {loading && <div className="my-24 text-lg animate-pulse">Loading Weather...</div>}
                {error && <div className="my-24 text-red-400 bg-red-900/50 p-4 rounded-lg">Error: {error}</div>}

                {weatherData && !loading && (
                    <div className="flex flex-col items-center animate-fade-in">
                        <h2 className="text-3xl font-semibold tracking-wide">{weatherData.name}</h2>
                        
                        <WeatherIcon 
                            condition={weatherData.weather[0]?.main || 'clouds'}
                            className="w-36 h-36 my-2"
                        />
                        
                        <p className="text-7xl font-thin tracking-tighter -mt-4">
                            {kelvinToCelsius(weatherData.main.temp)}°
                        </p>
                        <p className="text-lg font-medium text-gray-300 -mt-2">
                            {kelvinToCelsius(weatherData.main.temp_min)}° / {kelvinToCelsius(weatherData.main.temp_max)}°
                        </p>
                        <p className="mt-2 text-gray-200 capitalize">
                            {weatherData.weather[0]?.description}
                        </p>

                        <hr className="w-full border-white/20 my-6" />

                        <div className="w-full flex justify-between">
                            {MOCK_FORECAST.map((item) => (
                                <div key={item.day} className="flex flex-col items-center gap-1 w-1/5">
                                    <span className="font-medium text-gray-300">{item.day}</span>
                                    <WeatherIcon condition={item.condition} className="w-9 h-9"/>
                                    <span className="text-sm">{item.max}°/{item.min}°</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
