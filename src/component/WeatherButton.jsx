import React from 'react'
import { Button, Dropdown, ButtonGroup, DropdownItem } from 'react-bootstrap';

const WeatherButton = ({cities, cityChange, currentLocation}) => {
  return (
    <div className='button-container'>
        <Button variant="light" onClick={currentLocation}>Current Location</Button>

        <Dropdown>
          <Dropdown.Toggle  variant="light" id="dropdown-basic">Select City
          </Dropdown.Toggle>
      
        <Dropdown.Menu>
          {cities.map((city, idx) => (
            <Dropdown.Item
          key={idx} 
          variant="light" 
          onClick={() => cityChange(city)}
        >
          {city}
        </Dropdown.Item>
      ))}
      </Dropdown.Menu>
      </Dropdown>
    </div>
    )
}

export default WeatherButton