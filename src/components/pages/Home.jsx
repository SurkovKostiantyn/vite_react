import MainContent from "../MainContent.jsx";
import Welcome from "../Welcome.jsx";
import Chat from "../Chat.jsx";
import List from "../List.jsx";

const Home = () => {
    return (
        <>
            <MainContent/>
            <Welcome name={"Текст, що завжди видно"} lastname={"Текст, який не видно"}/>
            <Chat label={"Введіть текст"} placeholder={"..."}/>
            <List/>
        </>
    )
}

export default Home;
