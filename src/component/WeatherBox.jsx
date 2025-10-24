import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import WeatherTime from './WeatherTime';

const WeatherBox = ({weather}) => {
  console.log("weather", weather)

  const [isFahrenheit, setIsFahrenheit] = useState(true);
  if (!weather || !weather.main) return null;

  const tempF = weather.main.temp;
  const tempC = ((tempF - 32) / 1.8).toFixed(1);

  const maxF = weather.main.temp_max;
  const maxC = ((maxF - 32) / 1.8).toFixed(1);

  const minF = weather.main.temp_min;
  const minC = ((minF - 32) / 1.8).toFixed(1);

  const humidity = weather.main.humidity;
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <div className="weather-box">
      <button
          className="unit-toggle-btn top-right"
          onClick={() => setIsFahrenheit(!isFahrenheit)}
        >
          {isFahrenheit ? " °C" : " °F"}
        </button>
        <h5><WeatherTime timezone={weather.timezone} /></h5>
      <h3 className="city-header">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="location-icon"
        />
        {weather.name}
      </h3>      

      <div className="temp-container">
        <h2 className="temperature">
          {isFahrenheit ? `${tempF.toFixed(1)} °F` : `${tempC} °C`}
        </h2>
        
      </div>

      <div className="weather-desc">
        <img src={iconUrl} className="weather-icon" />
        <p className='weather-status'>{weather.weather[0].main}</p>
      </div>

      <div className="temp-range">
        <span>
          <FontAwesomeIcon icon={faArrowUp} className='arrow-up'/>{" "}
          {isFahrenheit ? `${maxF.toFixed(1)} °F` : `${maxC} °C`}
        </span>
        <span className="separator">  |  </span>
        <span>
          <FontAwesomeIcon icon={faArrowDown} className='arrow-down' />{" "}
          {isFahrenheit ? `${minF.toFixed(1)} °F` : `${minC} °C`}
        </span>
      </div>

      <div className="humidity-section">
        <div className="humidity-label">
          <span>Humidity: {humidity}%</span>
        </div>
        <div className="humidity-bar">
          <div
            className="humidity-fill"
            style={{ width: `${humidity}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox