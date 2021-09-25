import React, { useState } from 'react';
import useForm from '../Hooks/useForm.hook';

const Search = (): JSX.Element => {
  // One day Time in ms (milliseconds)
  const oneDayMs = 1000 * 60 * 60 * 24;
  const today = new Date();
  const [preState, setPreState] = useState('');

  // Calculate the trip duration
  const getDays = (inputStartDate: number, inputEndDate: number) => {
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    console.log('todayDate', todayDate);
    console.log('todayMonth', todayMonth);

    const travelStart = new Date(inputStartDate);
    const travelEnd = new Date(inputEndDate);
    const theStartDate = travelStart.getDate();
    const theStartMonth = travelStart.getMonth() + 1;
    /*
        let theEndDate = travelEnd.getDate()
        let theEndMonth = travelEnd.getMonth()+1
        */
    if (theStartMonth < todayMonth || (theStartMonth === todayMonth && theStartDate < todayDate)) {
      return alert("You can't travel to the past. Please check your date again");
    }

    console.log('travelStartDate', travelStart);
    console.log('travelEndDate', travelEnd);
    // To calculate the time difference of two dates
    const differenceInTime = travelEnd.getTime() - travelStart.getTime();

    // To calculate the no. of days between two dates
    const differenceInDays = differenceInTime / oneDayMs;
    console.log(Math.round(differenceInDays));
    const duration = Math.round(differenceInDays);
    return duration;
  };

  const { handleChange, values } = useForm();
  return (
    <div>
      <form>
        <div className="form-flex-item-wrapper">
          <label id="label-destination" htmlFor="destination">
            Destination:
          </label>
          <input
            required
            id="destination"
            placeholder="Enter a city name"
            className="destination"
            type="text"
            name="destination"
            value={values.destination}
            onChange={handleChange}
          />
        </div>
        <div className="form-flex-item-wrapper">
          <label htmlFor="travelStartDate">Start date:</label>
          <input
            required
            id="travelStartDate"
            placeholder="2021/mm/dd"
            className="duration"
            type="date"
            name="tripStart"
            min="2021-01-01"
            max="2022-12-31"
            value={values.tripStart}
            onChange={handleChange}
          />
        </div>
        <div className="form-flex-item-wrapper">
          <label htmlFor="travelEndDate">End date:</label>
          <input
            required
            id="travelEndDate"
            placeholder="2021/mm/dd"
            className="duration"
            type="date"
            name="tripEnd"
            min="2021-01-01"
            max="2022-12-31"
            value={values.tripEnd}
            onChange={handleChange}
          />
        </div>
      </form>
      <button type="submit">Submit</button>
    </div>
  );
};

export default Search;
