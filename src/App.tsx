import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Form from './Components/Form';
import SearchResult from './Components/SearchResult';
import Weather from './Components/Weather';
import { TravelInfoContextProvider } from './Contexts/TravelContext';
import {TravelInfoFromServerProvider } from './Contexts/TravelInfoFromServer';

const App = (): JSX.Element => {
  return (
    <Router>
      <TravelInfoFromServerProvider>
      <TravelInfoContextProvider>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Form} />
            <Route path="/weather" component={Weather} />
            <Route path="/SearchResult" component={SearchResult} />
          </Switch>
        </div>
      </TravelInfoContextProvider>
      </TravelInfoFromServerProvider>
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
