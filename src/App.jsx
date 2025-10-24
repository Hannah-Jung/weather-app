import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherBox from './component/WeatherBox'
import 'bootstrap/dist/css/bootstrap.min.css'
import WeatherButton from './component/WeatherButton'

// 1. Show current location weather when the app starts
// 2. Display city, Celsius, Fahrenheit, and weather condition
// 3. Have 5 buttons (1 for current location, 4 for other cities)
// 4. Show selected city’s weather when a city button is clicked
// 5. Return to current location weather when the current button is clicked
// 6. Show a loading spinner while fetching data

function App() {
  const [weather, setWeather] = useState(null)
  const apiKey = "9aeb742425429bca6132fd62a12182d1"
  const cities = ["Los Angeles", "Seoul", "Dubai", "Reykjavik", "Cape Town", "Aswan"]

  const getCurrentLocation=() => {
    // console.log("getCurrentLocation")
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      // console.log("current location", lat, lon)
      getWeatherByCurrentLocation(lat, lon)
    })
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    let response = await fetch(url)
    let data = await response.json()
    // console.log("data", data)
    setWeather(data)
  }

  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
  }

  useEffect(() => {
    getCurrentLocation()
  },[])
  
  return <div>
    <div className="container">
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities}
          cityChange={getWeatherByCity}
          currentLocation={getCurrentLocation}/>
    </div>
    
  </div>
}

export default App
