import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/blocks/Nav.jsx'; // Компонент навігації
import Footer from './components/blocks/Footer.jsx';
import Home from './components/pages/Home';
import Contacts from "./components/pages/Contacts.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Gallery from "./components/pages/Gallery.jsx";
import TestAPI from "./components/pages/TestAPI.jsx";
import Chat from "./components/pages/Chat.jsx";
import List from "./components/pages/List.jsx";

function App() {
    return (
        <div className={"wrapper"}>
            <Router>
                <Nav /> {/* Компонент навігації */}
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="gallery" element={<Gallery/>} />
                    <Route path="testapi" element={<TestAPI />} />
                    <Route path="chat" element={<Chat label={"Введіть текст"} placeholder={"..."}/>} />
                    <Route path="list" element={<List />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    )
}

export default App;
