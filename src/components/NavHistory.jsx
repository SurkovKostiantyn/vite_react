import { useHistory } from 'react-router-dom';

function NavHistory() {
    let history = useHistory();

    function handleGoBack() {
        history.goBack(); // повертає користувача на попередню сторінку
    }

    function handleGoForward() {
        history.goForward(); // переводить користувача на наступну сторінку в історії
    }

    function handleGoToHome() {
        history.push('/'); // перенаправляє користувача на головну сторінку
    }

    return (
        <div>
            <button onClick={handleGoBack}>Go Back</button>
            <button onClick={handleGoForward}>Go Forward</button>
            <button onClick={handleGoToHome}>Go to Home</button>
        </div>
    );
}

export default NavHistory;
