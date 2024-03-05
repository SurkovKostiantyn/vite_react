import { useEffect, useState } from 'react';

const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

const TestAPI = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch data');
            })
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return null;

    return (
        <div>
            <h1>Exchange rates</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.cc}>
                        {item.txt} - {item.cc} - {item.rate}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default TestAPI;
