import React, { useContext, useEffect, useState } from 'react';
import { TravelInfoContext } from '../Contexts/TravelContext';
import { TravelInfoFromServerContext } from '../Contexts/TravelInfoFromServer';
import Weather from './Weather';

//let weatherInfo;
type IsWeatherInfo = {
  weather: Record<string, unknown>;
  maxTemp: number;
  minTemp: number;
  validDate: string;
};

type weatherInfo = {
  weatherInfo: IsWeatherInfo;
  setWeatherInfo: React.Dispatch<React.SetStateAction<IsWeatherInfo>>;
};

const SearchResult = (): JSX.Element => {
  const travelInfo = useContext(TravelInfoContext);
  const { destination, tripStart, tripEnd, travelDuration } = travelInfo!.values;
  //Below is the travel info send back from the backend server
  const travelInfoFromServer = useContext(TravelInfoFromServerContext);
  const { timezone, city_name } = travelInfoFromServer!.valuesFromServer;
  const [weatherInfo, setWeatherInfo] = useState<IsWeatherInfo | any>([]); // changed the unknow to any first to test out my logic
  //const [weatherInfo, setWeatherInfo] = useState<IsWeatherInfo>({} as IsWeatherInfo);
  const [maxTemp, setMaxTemp] = useState<number | any>(0);
  console.log('Travel info from the server context', travelInfoFromServer);

  const getWeatherData = () => {
    const weatherInfoParentDiv = document.getElementById('weatherInfoParentDiv');
    const weatherInfoExtract = travelInfoFromServer!.valuesFromServer.data.map(x => {
      //setMaxTemp(x.max_temp); works here
      return { weather: x.weather, maxTemp: x.max_temp, minTemp: x.min_temp, validDate: x.valid_date };
    });
    // has problem to assign key with x.valid_date. typescript error occur
    setWeatherInfo(weatherInfoExtract);

    // note: need to press two times of the get local weather button
    console.log('weatherInfoExtract', weatherInfoExtract, 'Typeof the weatherInfoExtract:', typeof weatherInfoExtract);
    console.log('weatherInfo', weatherInfo);
    console.log('maxTemp state', maxTemp);
  };

  //TODO: Create jsx elements to render the values inside weatherInfo in useEffect
  const maxTempAWeek = weatherInfo.map((x: any) => {
    return (
      <div key={x.validDate} className="result_maxTemp_flex">
        <p>{x.validDate}</p>
        <p>
          {x.maxTemp} <span>&deg;C</span>
        </p>
      </div>
    );
  });

  return (
    <div>
      <h1>Search City: {destination}</h1>
      {timezone !== 'No data yet' ? <h3>Your are going: {timezone}</h3> : <h3>Timezone:{timezone}</h3>}
      {travelDuration < 0 ? <h3>Your end date is not correct</h3> : <h3>Trip duration: {travelDuration} days</h3>}

      {city_name !== 'No data yet' ? <button onClick={getWeatherData}>Get {city_name} weather</button> : null}
      <div id="weatherInfoParentDiv"></div>
      <h3>Below are the maximum Temp for the next 7 days in {destination}</h3>
      {maxTempAWeek}
    </div>
  );
};

export default SearchResult;
