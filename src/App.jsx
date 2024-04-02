import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Nav from './components/blocks/Nav.jsx';
import Footer from './components/blocks/Footer.jsx';
import Home from './components/pages/Home.jsx';
import Contacts from './components/pages/Contacts.jsx';
import Gallery from './components/pages/Gallery.jsx';
import TestAPI from './components/pages/TestAPI.jsx';
import List from './components/pages/List.jsx';
import Chat from './components/pages/Chat.jsx';
import NotFound from './components/pages/NotFound.jsx';
import Game from "./components/pages/Game.jsx";
import Login from "./components/Auth/Login.jsx";
import Registration from "./components/Auth/Registration.jsx";
import Logout from "./components/Auth/Logout.jsx";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from "./components/PublicRoute.jsx";

import { configureStore } from '@reduxjs/toolkit';
import likesReducer from './components/likesSlice.js';
import {Provider} from 'react-redux';

export const store = configureStore({
    reducer: {
        likes: likesReducer,
    },
});


const PrivateRoutes = () => {
    return (
        <PrivateRoute>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="contacts" element={<Contacts/>}/>
                <Route path="gallery" element={<Gallery/>}/>
                <Route path="testapi" element={<TestAPI/>}/>
                <Route path="list" element={<List/>}/>
                <Route path="chat" element={<Chat label={"Введіть текст"} placeholder={"..."}/>}/>
                <Route path="game" element={<Game/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="logout" element={<Logout/>}/>
            </Routes>
        </PrivateRoute>
    );
};

function App() {
    return (
        <Provider store={store}>
            <div className="wrapper">
                <Router>
                    <Nav/>
                    <Routes>
                        <Route path="/*" element={<PrivateRoutes/>}/>
                        <Route path="login" element={<PublicRoute><Login/></PublicRoute>}/>
                        <Route path="registration" element={<PublicRoute><Registration/></PublicRoute>}/>
                    </Routes>
                </Router>
                <Footer/>
            </div>
        </Provider>
    );
}

export default App;
