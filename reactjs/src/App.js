import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/launches')
      .then(async (res) => {
        res = await res.json();
        setFlights(res);
      })
      .catch((error) => {
        setFlights([]);
      })
  })
  return (
    <div className='App'>
      <main>
        <h2 className='app-title'>React JS Application</h2>
        <div className='flights-container'>
      {
        flights.map(flight => (
          <div className='flight' key={flight.flight_number}>
            <img
              className='flight-logo'
              src={flight.links.mission_patch}
              alt='flight pic'
            /><br/>
            <h4>Mission: {flight.mission_name}</h4>
            <div className='flight-info'>
            <div className='row'>
                  <label>Launch Date:</label>
                  <p>{flight.launch_date_local}</p>
              </div>
              <div className='row'>
                <label>Launch Successful:</label>
                <p>{flight.launch_success ? 'Yes' : 'No'}</p>
              </div>
              <h4 className='details'>Details</h4>
              <div className='row'>
                  <p className='details-p'>{flight.details}</p>
              </div>
            </div>
          </div>
        ))
      }
      </div>
      </main>
    </div>
  );
}

export default App;
