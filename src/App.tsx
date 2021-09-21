
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import { Weather } from "./Components/Weather"
import { Search } from "./Components/Search"
import { useState } from "react"


function App() {
  const [checkWeather, setCheckWeather] = useState(false)
  const toggleButton = () => {
      setCheckWeather(prevCheckWeather => !prevCheckWeather)    
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/weather" component={Weather} />
        </Switch>
        {checkWeather ?
           <Link to="/weather">
           <button onClick={toggleButton}>Go back</button>
          </Link> :
          <Link to="/">
          <button onClick={toggleButton}>Check Weather</button>
         </Link> 
        }
       
      </div>
    </Router>
  );
}

export default App;
