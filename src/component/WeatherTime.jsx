import { useEffect, useState } from 'react';

const WeatherTime = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (!timezone) return;
    const updateTime = () => {
      const now = new Date();
      const cityTime = new Date(now.getTime() + timezone * 1000);

      const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = cityTime.toLocaleDateString('en-US', optionsDate);
      setCurrentDate(formattedDate);

      let hours = cityTime.getUTCHours();
      const minutes = cityTime.getUTCMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedTime = `${hours}:${minutes.toString().padStart(2,'0')} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="weather-time">
      <div className='current-time'>{currentTime}</div>
      <div>{currentDate}</div>      
    </div>
  );
};

export default WeatherTime;