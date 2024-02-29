import { useNavigate  } from 'react-router-dom';
import Button from '@mui/material/Button';

function NavHistory() {
    let history = useNavigate();

    function handleGoBack() {
        history(-1); // повертає користувача на попередню сторінку
    }

    function handleGoForward() {
        history(1); // переводить користувача на наступну сторінку в історії
    }

    function handleGoToHome() {
        history('/home'); // перенаправляє користувача на головну сторінку
    }

    return (
        <div>
            <Button onClick={handleGoBack}>Go Back</Button>
            <Button onClick={handleGoForward}>Go Forward</Button>
            <Button onClick={handleGoToHome}>Go to Home</Button>
        </div>
    );
}

export default NavHistory;
