import React, { useContext, useEffect } from 'react';
import { TravelInfoContext } from '../Contexts/TravelContext';

const SearchResult = (): JSX.Element => {
  const travelInfo = useContext(TravelInfoContext);
  useEffect(() => {
    console.log(travelInfo!);
  });

  return (
    <div>
      <h1>{travelInfo!.values.destination}</h1>
      {travelInfo!.values.travelDuration != 0 ? <h3>{travelInfo!.values.travelDuration}</h3> : null}
    </div>
  );
};

export default SearchResult;
