import { useNavigate } from 'react-router-dom';

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
            <a onClick={handleGoBack}>Back</a>
            <a onClick={handleGoForward}>Forward</a>
            <a onClick={handleGoToHome}>Home</a>
        </div>
    );
}

export default NavHistory;
