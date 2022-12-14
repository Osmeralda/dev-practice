import { useState, useEffect } from 'react'


export default function Travels() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/bikedata?_limit=100`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => {
                setData(actualData.data);
                setError(null);
                console.log(actualData);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Travels</h1>
            {loading && <div>Please wait a moment...</div>}
            {error && (<div>{`There appears to be and error ${error}`}</div>)}
            <ul>
                {data &&
                    data.map(({ departure_time, return_time, return_station_id, return_station_name, departure_station_name, departure_station_id, covered_distance, duration }) => (
                        <li key={departure_time}><h3>From: {departure_station_name} {departure_station_id} To: {return_station_name} {return_station_id} Covering: {(covered_distance / 1000).toFixed(1)}km Lasting: {(duration / 60).toFixed(1)} minutes</h3></li>
                    ))}
            </ul>
        </div>
    );
}