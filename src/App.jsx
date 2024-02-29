import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './components/Nav'; // import Nav component
import Footer from './components/Footer'; // import Footer component
import Home from './components/pages/Home';
import Contacts from "./components/pages/Contacts.jsx"; // import Home component
import NotFound from "./components/pages/NotFound.jsx";
import Gallery from "./components/pages/Gallery.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav/>}>
                    <Route index path="home" element={<Home />}/>
                    <Route path="contacts" element={<Contacts />}/>
                    <Route path="gallery" element={<Gallery />}/>
                    <Route path="*" element={<NotFound/>} />
                </Route>
            </Routes>
        </BrowserRouter>
        <Footer/>
    </>
  )
}

export default App;
