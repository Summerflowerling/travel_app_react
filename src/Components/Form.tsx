import { useState } from "react";
import { useForm }  from "../hooks/useForm.hook";

export const Search = () => {
    // One day Time in ms (milliseconds)
    let oneDayMs = 1000 * 60 * 60 * 24
    let today = new Date();
    const [preState, setPreState] = useState("")

// Calculate the trip duration
    function getDays(inputStartDate: number, inputEndDate: number) {

        let todayDate = today.getDate()
        let todayMonth = today.getMonth() + 1
        console.log("todayDate", todayDate)
        console.log("todayMonth", todayMonth)
    

        let travelStart = new Date(inputStartDate)
        let travelEnd = new Date(inputEndDate)
        let theStartDate = travelStart.getDate()
        let theStartMonth = travelStart.getMonth() + 1
        /*
        let theEndDate = travelEnd.getDate()
        let theEndMonth = travelEnd.getMonth()+1
        */
        if (theStartMonth < todayMonth || (theStartMonth === todayMonth && theStartDate < todayDate)) {
            return alert("You can't travel to the past. Please check your date again")
        }

        console.log("travelStartDate", travelStart)
        console.log("travelEndDate", travelEnd)
        // To calculate the time difference of two dates
        let differenceInTime = travelEnd.getTime() - travelStart.getTime();
  
        // To calculate the no. of days between two dates
        let differenceInDays = differenceInTime / (oneDayMs);
        console.log(Math.round(differenceInDays))
        let duration = Math.round(differenceInDays)
        return duration
    }

      
    const { handleChange, values} = useForm()
    return (
            <div>
                <form>
                <div className="form-flex-item-wrapper">
                <label id="label-destination" htmlFor="destination">Destination:</label>
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
                        onChange={ handleChange}
                       
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
                    value=""
                />
                </div>
            </form>
            <button type="submit">Submit</button>
            </div>
          
    )
}
