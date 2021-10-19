import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { TravelInfoContext } from '../Contexts/TravelContext';
let url;
let weatherInfo;

const SearchResult = (): JSX.Element => {
  const travelInfo = useContext(TravelInfoContext);
  const locationInput = travelInfo!.values.destination;
  const startDate = travelInfo!.values.tripStart;
  const endDate = travelInfo!.values.tripEnd;
  const duration = travelInfo!.values.travelDuration;
  const [city, setCity] = useState('');

  /*
  const getTravelInfo = () => {
    got('http://localhost:8089/getGeoname')
      .then(res => {
        console.log(res.body)
      })
      .catch(error => {
        console.log(error)
      })
  }
  */

  type data = {
    weatherbitRes: any;
    pixabayRes: string;
  };

  const getTravelInfo = () => {
    axios
      .get<data>('/getGeoname')
      .then(res => setCity(res.data.weatherbitRes.city_name))
      .catch(err => console.log('There is some:', err));
  };

  return (
    <div>
      <button onClick={getTravelInfo}>No Info yet</button>
      <p>{city}</p>
      <h1>{locationInput}</h1>
      {duration < 0 ? <h3>Your end date is not correct</h3> : <h3>Trip duration: {duration} days</h3>}
    </div>
  );
};

export default SearchResult;
