import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherBox from './component/WeatherBox'
import 'bootstrap/dist/css/bootstrap.min.css'
import WeatherButton from './component/WeatherButton'
import { ClipLoader } from "react-spinners";

// 1. Show current location weather when the app starts
// 2. Display city, Celsius, Fahrenheit, and weather condition
// 3. Have 5 buttons (1 for current location, 4 for other cities)
// 4. Show selected city’s weather when a city button is clicked
// 5. Return to current location weather when the current button is clicked
// 6. Show a loading spinner while fetching data

function App() {
  const [weather, setWeather] = useState(null)
  const [selectedCity, setSelectedCity] = useState("current");
  const apiKey = "9aeb742425429bca6132fd62a12182d1"
  const cities = ["New York", "Seoul", "Dubai", "Oslo", "Sydney"]
  const [loading, setLoading] = useState(true)

  const getCurrentLocation=() => {
    // console.log("getCurrentLocation")
    setSelectedCity(null);
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      // console.log("current location", lat, lon)
      getWeatherByCurrentLocation(lat, lon)
      setSelectedCity("current")
    })
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    // console.log("data", data)
    setWeather(data)
    setLoading(false)
  }

  const getWeatherByCity = async (city) => {
    setSelectedCity(city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setLoading(false)
  }

  useEffect(() => {
    getCurrentLocation()
  },[])
  
  return (
    <div>
      {loading?(<div className="container">
        <ClipLoader
        color="#fff"
        loading={loading}
        size={150}
      /> <div className='loading-spinner-msg'>Loading...</div> </div>):(<div className="container">      
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities}
          cityChange={getWeatherByCity}
          currentLocation={getCurrentLocation}
          selectedCity={selectedCity}
          />
    </div>)}
    </div>
   ) }

export default App
