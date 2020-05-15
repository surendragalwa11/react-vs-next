import Head from 'next/head'

export async function getStaticProps(context) {
  let flights;
  try {
    const res = await fetch('https://api.spacexdata.com/v3/launches');
    flights = await res.json();
  } catch(err) {
    // some error handling
    flights = [];
  }
  return {props: {flights}};
}

export default function Home({flights = []}) {
  return (
    <div className="App">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className='app-title'>Next JS Application</h2>
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
      <style jsx>{`
        .App {
          text-align: center;
        }
        
        .flight-logo {
          height: 40vmin;
          pointer-events: none;
        }
        
        @media (prefers-reduced-motion: no-preference) {
          .flight-logo {
            animation: App-logo-spin infinite 5s linear;
          }
        }
        
        .App-header {
          background-color: #282c34;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: white;
        }
        
        .App-link {
          color: #61dafb;
        }
        
        @keyframes App-logo-spin {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-40px);
          }
        }
        
        .app-title {
          margin: 1rem;
          padding: 1rem;
          border: 1px solid darkgray;
          border-radius: 10px;
        }
        
        .flights-container {
          /* background-color: azure; */
        }
        
        .flight {
          padding: 2rem;
          border: 1px solid darkgray;
          border-radius: 10px;
          margin: 1rem;
        }
        
        .row {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        
        .row label {
          font-weight: 500;
          margin-right: 15px;
        }
        
        .details {
          margin-bottom: 0;
        }
        
        .details-p {
          margin-top: 10px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          height: 100vh;
          width: 100vw;
          background-color: azure;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
