import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Button from './Components/Button';
import Search from './Components/Form';
import Weather from './Components/Weather';

const App = (): JSX.Element => {
  const [checkWeather, setCheckWeather] = useState(false);
  const toggleButton = () => {
    setCheckWeather(prevCheckWeather => !prevCheckWeather);
    console.log(checkWeather);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/weather" component={Weather} />
        </Switch>

        {checkWeather ? (
          <Link to="/weather">
            <Button text="Go Back" onClick={toggleButton} />
          </Link>
        ) : (
          <Link to="/">
            <Button text="Check Weather" onClick={toggleButton} />
          </Link>
        )}
      </div>
    </Router>
  );
};

export default App;
