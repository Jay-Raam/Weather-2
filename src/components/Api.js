import React, { useState, useEffect } from 'react';
import "./api.css"

const WeatherDashboard = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const API_KEY = '96c44501fb5bcea738c9382742220173';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    if (city.trim() === '') return;
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [API_URL, city]);

  return (
    <div className='weather'>
      <h1 className='title'>{props.name}</h1>
      <div className='contaniner'>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='gal-2'
          autoFocus
        />
      </div>
      {weatherData && (
        <div className="cardContainer">
          <div className="card">
            <p className="city">{weatherData.name}, {weatherData.sys.country}</p>
            <p className="temp">{weatherData.main.temp}°C</p>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" className='gal-1'/>
            <div className="minmaxContainer">
              <div className="flex">
                <div className="min">
                  <p className="minHeading">Min</p>
                  <p className="minTemp">{weatherData.main.temp_min}</p>
                </div>
                <div className="max">
                  <p className="maxHeading">Max</p>
                  <p className="maxTemp">{weatherData.main.temp_max}</p>
                </div>
              </div>
              <div className="flex">
                <div className="min">
                  <p className="minHeading">Sunrise</p>
                  <p className="minTemp">{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                </div>
                <div className="max">
                  <p className="maxHeading">Sunset</p>
                  <p className="maxTemp">{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
