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
                    data.map(({ Departure, Return }) => (
                        <li key={Departure}><h3>{Return}</h3></li>
                    ))}
            </ul>
        </div>
    );
}