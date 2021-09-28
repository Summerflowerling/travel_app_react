import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Button from './Components/Button';
import Form from './Components/Form';
import Weather from './Components/Weather';

const App = (): JSX.Element => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Form} />
          <Route path="/weather" component={Weather} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

/* To be added after pressing submit
{checkWeather ? (
  <Link to="/weather">
  <Button text="Go Back" onClick={toggleButton} />
</Link>
) : (
<Link to="/">
  <Button text="Check Weather" onClick={toggleButton} />
</Link>
)}

*/
