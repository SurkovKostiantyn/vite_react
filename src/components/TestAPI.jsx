import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

const TestAPI = () => {
    // Створення станів (useState) для зберігання даних, завантаження та помилок
    const [data, setData] = useState(null); // null - початкове значення
    const [loading, setLoading] = useState(true); // true - початкове значення
    const [error, setError] = useState(null); // null - початкове значення

    const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка
    const [itemsPerPage] = useState(10); // Кількість елементів на сторінці

    useEffect(() => { // Використання useEffect для виконання запиту до API
        fetch(API_URL)// Використання fetch для виконання запиту до API
            .then((response) => { // Обробка відповіді
                if (response.ok) { // Перевірка, чи відповідь успішна
                    return response.json(); // Повернення відповіді у форматі JSON
                }
                throw new Error('Failed to fetch data'); // Викидання помилки, якщо відповідь не успішна
            })
            .then((data) => setData(data))// Встановлення даних у стані
            .catch((error) => setError(error))// Встановлення помилки у стані
            .finally(() => setLoading(false)); // Встановлення значення false для завантаження
    }, []); // Порожній масив залежностей, щоб запит виконувався лише один раз

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentData = data?.slice(firstItemIndex, lastItemIndex);
    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return null;

    return (
        <div>
            <h1>Exchange rates</h1>
            <ul>
                {currentData.map((item) => ( // Відображення списку даних
                    <li key={item.cc}>
                        {item.txt} - {item.cc} - {item.rate}
                    </li>
                ))}
            </ul>
            <div>
                <Button onClick={previousPage} disabled={currentPage === 1}>
                    <ArrowLeftIcon />
                    Back
                </Button>
                <Button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                    <ArrowRightIcon/>
                </Button>
                <p>Page {currentPage} of {totalPages}</p>
            </div>
        </div>
    );

}

export default TestAPI;
