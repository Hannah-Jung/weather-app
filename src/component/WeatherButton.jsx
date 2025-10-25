import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, cityChange, currentLocation, selectedCity }) => {
  return (
    <div className='button-container'>
      <div className='location-section'>      
        <Button
          variant="outline-light"
          onClick={currentLocation}
          className={`city-button ${selectedCity === "current" ? "active" : ""}`}
        >
          Current Location
        </Button>
      </div>        

        <div className='city-buttons'>
          {cities.map((city, idx) => (
        <Button
          key={idx}
          variant="outline-light"
          onClick={() => cityChange(city)}
          className={`city-button ${city === selectedCity ? "active" : ""}`}
        >
          {city}
        </Button>
      ))}
        </div>          
    </div>
    )
}

export default WeatherButton