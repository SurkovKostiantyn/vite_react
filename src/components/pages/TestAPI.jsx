import {useContext, useEffect, useState} from 'react';
import { Pagination } from '@mui/material';
import {ThemeContext} from "../ThemeContext.jsx";

const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

const TestAPI = () => {
    const { lightMode } = useContext(ThemeContext);
    // Створення станів (useState) для зберігання даних, завантаження та помилок
    const [data, setData] = useState(null); // null - початкове значення
    const [loading, setLoading] = useState(true); // true - початкове значення
    const [error, setError] = useState(null); // null - початкове значення

    const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка
    const [itemsPerPage] = useState(10); // Кількість елементів на сторінці

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

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

    if (loading) return <div className={"main"}>Loading...</div>;
    if (error) return <div className={"main"}>Error!</div>;
    if (!data) return null;

    return (
        <div
            className={"main" + (lightMode ? " light-mode" : " dark-mode")}
        >
            <h1>Exchange rates</h1>
            <ul>
                {/* Відображення списку даних */}
                {currentData.map((item) => (
                    <li key={item.cc}>
                        {item.txt} - {item.cc} - {item.rate}
                    </li>
                ))}
            </ul>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
            />
        </div>
    );

}

export default TestAPI;
