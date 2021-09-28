import React, { useState, useEffect } from 'react';
import Button from './Button';
import SearchResult from './SearchResult';

const Form = (): JSX.Element => {
  const [submitForm, setSubmitForm] = useState(false);
  const [checkWeather, setCheckWeather] = useState(false);
  const [values, setValues] = useState({
    destination: '',
    tripStart: '',
    tripEnd: '',
    travelDurationT: 0,
  });

  const toggleButton = () => {
    setCheckWeather(prevCheckWeather => !prevCheckWeather);
    console.log(checkWeather);
  };

  // Calculate the trip duration
  const getDays = (inputStartDate: string, inputEndDate: string) => {
    const oneDayMs = 1000 * 60 * 60 * 24;
    const today = new Date();
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
    setValues({
      ...values,
      travelDurationT: duration,
    });
    return duration;
  };

  /*const getLocation = (locationInput, startDate, endDate) => {
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
        const duration = Client.getDays(startDate, endDate);
        if (duration <= 0) {
          alert('Date input seems not correct');
          return;
        } else {
          Client.updateUi(city, url, startDate, endDate, duration, weatherInfo);
        }
      });
  };
  */

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    return { handleChange, values } as const;
  };

  const handleSubmit = () => {
    console.log('submit');
    console.log(values);
    getDays(values.tripStart, values.tripEnd);
    console.log(' travel info', values); // didn't update right away
  };

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
      <Button id="submit" text="submit" onClick={handleSubmit} />
      <SearchResult />
    </div>
  );
};

export default Form;
