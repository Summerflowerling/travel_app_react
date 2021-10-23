import React, { useContext, useEffect, useState } from 'react';
import { TravelInfoContext } from '../Contexts/TravelContext';
import { TravelInfoFromServerContext } from '../Contexts/TravelInfoFromServer';
import Weather from './Weather';

let url;
//let weatherInfo;
type IsWeatherInfo = {
  weather: Record<string, unknown>;
  maxTemp: number;
  minTemp: number;
  validDate: string;
};

const SearchResult = (): JSX.Element => {
  const travelInfo = useContext(TravelInfoContext);
  const { destination, tripStart, tripEnd, travelDuration } = travelInfo!.values;
  //Below is the travel info send back from the backend server
  const travelInfoFromServer = useContext(TravelInfoFromServerContext);
  const { timezone, city_name } = travelInfoFromServer!.valuesFromServer;
  const [weatherInfo, setWeatherInfo] = useState<IsWeatherInfo[] | unknown>([]);

  console.log('Travel info from the server context', travelInfoFromServer);

  const getWeatherData = () => {
    const weatherInfoParentDiv = document.getElementById('weatherInfoParentDiv');
    const weatherInfoExtract = travelInfoFromServer!.valuesFromServer.data.map(x => {
      return { weather: x.weather, maxTemp: x.max_temp, minTemp: x.min_temp, validDate: x.valid_date };
    });
    setWeatherInfo(weatherInfoExtract);
    console.log('weatherInfoExtract', weatherInfoExtract);
    console.log('weatherInfo', weatherInfo);
  };

  return (
    <div>
      <h1>Search City: {destination}</h1>
      {timezone !== 'No data yet' ? <h3>Your are going: {timezone}</h3> : <h3>Timezone:{timezone}</h3>}
      {travelDuration < 0 ? <h3>Your end date is not correct</h3> : <h3>Trip duration: {travelDuration} days</h3>}

      {city_name !== 'No data yet' ? <button onClick={getWeatherData}>Get {city_name} weather</button> : null}
      <div id="weatherInfoParentDiv"></div>
    </div>
  );
};

export default SearchResult;
