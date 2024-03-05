import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './components/Nav'; // Компонент навігації
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Contacts from "./components/pages/Contacts.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Gallery from "./components/pages/Gallery.jsx";
import TestAPI from "./components/TestAPI.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Nav /> {/* Компонент навігації */}
                <TestAPI />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    )
}

export default App;
