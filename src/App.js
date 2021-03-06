import './App.css';
import React, {useState} from 'react';
import clouds from './SVGs/CLOUD.svg';
import sun from './SVGs/SUN.svg';

const api =  {
  key: "f81b8339e50b0bc056ffd0b0dc9153cb",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  

  const search =  evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
        console.log(result);
      })
    }
  }

  

  const dateBuilder = (d) => {
      
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

 
  return (
    <div className={(typeof weather.main != 'undefined' ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app')}>
      <main>
        <div className="search-box">
          <h1>Weather App</h1>
          <h2> <em> Please, </em> type a name of a city. </h2>
          <input type="text" placeholder="Ej. Guadalajara" onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <img className="icon-weather" src={(weather.weather[0].main === "Clear") ? sun : clouds} alt="" />
          <div className="temperature">
            {Math.round(weather.main.temp)}°c
            
          </div>
          <span>Feels like: {Math.round(weather.main.feels_like)}</span>
        </div>
        <div className="weather">
            {weather.weather[0].main}
          </div>
        </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
