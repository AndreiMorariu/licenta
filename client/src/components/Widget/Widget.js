import { useEffect, useState } from 'react';
import './Widget.css';
import { RiCelsiusLine } from 'react-icons/ri';

function TrendsCard() {
  const [data, setData] = useState();
  const [dateState, setDateState] = useState(new Date());

  let seconds = dateState.getSeconds() + '';
  let minutes = dateState.getMinutes() + '';
  let hour = dateState.getHours() + '';

  if (seconds.length === 1) {
    seconds = '0' + seconds;
  }

  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }

  if (hour.length === 1) {
    hour = '0' + hour;
  }

  useEffect(() => {
    const getData = async (city) => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=bf3ca54e42ca49bda7e72248230204&q='Cluj-Napoca'&days=3&aqi=no&alerts=no`
        );
        if (!response.ok) throw new Error('Something went wrong');
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <div className="stat-card">
      {data && dateState && (
        <>
          <h3>{data.location.name}</h3>
          <div className="stat">
            <div className="time">
              <span className="hour">{dateState.getHours()}:</span>
              <span className="minutes">{minutes}:</span>
              <span className="seconds">{seconds}</span>
            </div>
            <p className="temperature">
              {data.current.temp_c} <RiCelsiusLine />{' '}
            </p>
            <img src={data.current.condition.icon} />
          </div>
        </>
      )}
    </div>
  );
}

export default TrendsCard;
