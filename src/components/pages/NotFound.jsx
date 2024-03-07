import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ThemeContext} from "../ThemeContext.jsx";

function NotFoundPage() {
    const { lightMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Зменшуємо лічильник кожну секунду
        const timer = setInterval(() => {
            setCountdown((currentCountdown) => currentCountdown - 1);
        }, 1000);

        // Перенаправлення після закінчення зворотного відліку
        const timeoutId = setTimeout(() => navigate('/'), 5000);

        // Очищення таймера і таймауту при демонтуванні компонента
        return () => {
            clearInterval(timer);
            clearTimeout(timeoutId);
        };
    }, [navigate]);

    return (
        <div
            className={"main"}
            style={{backgroundColor: lightMode ? "white" : "black", color: lightMode ? "black" : "white"}}
        >
            <h1>404: Сторінку не знайдено</h1>
            <p>Ви будете перенаправлені через {countdown} секунд...</p>
        </div>
    );
}

export default NotFoundPage;
