import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function NavHistory() {
    let navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    function handleGoForward() {
        navigate(1);
    }

    function handleGoToHome() {
        navigate('/home');
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
