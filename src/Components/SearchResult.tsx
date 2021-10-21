import React, { useContext } from 'react';
import { TravelInfoContext } from '../Contexts/TravelContext';
let url;
let weatherInfo;

const SearchResult = (): JSX.Element => {
  const travelInfo = useContext(TravelInfoContext);
  const locationInput = travelInfo!.values.destination;
  const startDate = travelInfo!.values.tripStart;
  const endDate = travelInfo!.values.tripEnd;
  const duration = travelInfo!.values.travelDuration;

  return (
    <div>
      <h1>{locationInput}</h1>
      {duration < 0 ? <h3>Your end date is not correct</h3> : <h3>Trip duration: {duration} days</h3>}
    </div>
  );
};

export default SearchResult;
