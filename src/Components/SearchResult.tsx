import React, { useContext, useEffect } from 'react';
import { TravelInfoContext } from '../Contexts/TravelContext';
let url;
let city;
let weatherInfo;

const SearchResult = (): JSX.Element => {
  const travelInfo = useContext(TravelInfoContext);
  const locationInput = travelInfo!.values.destination;
  const startDate = travelInfo!.values.tripStart;
  const endDate = travelInfo!.values.tripEnd;
  const duration = travelInfo!.values.travelDuration;

  const getLocation = (locationInput: string, startDate: string, endDate: string) => {
    fetch('http://localhost:8080/getGeoname', {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: `${locationInput}`, startDate: `${startDate}`, endDate: `${endDate}` }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('response json', json);
        city = json[0].city_name;
        url = json[1];
        weatherInfo = json[0].data;

        if (duration <= 0) {
          alert('Date input seems not correct');
          return;
        } else {
          console.log('Fetch testing');
          //Client.updateUi(city, url, startDate, endDate, duration, weatherInfo)
        }
      });
  };

  return (
    <div>
      <h1>{locationInput}</h1>
      {duration < 0 ? <h3>Your end date is not correct</h3> : <h3>Trip duration: {duration} days</h3>}
    </div>
  );
};

export default SearchResult;
