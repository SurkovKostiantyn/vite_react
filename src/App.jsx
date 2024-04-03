import {HashRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
// elements
import Nav from './components/blocks/Nav.jsx';
import Footer from './components/blocks/Footer.jsx';
// pages
import Home from './components/pages/Home.jsx';
import Contacts from './components/pages/Contacts.jsx';
import Gallery from './components/pages/Gallery.jsx';
import TestAPI from './components/pages/TestAPI.jsx';
import List from './components/pages/List.jsx';
import Chat from './components/pages/Chat.jsx';
import NotFound from './components/pages/NotFound.jsx';
import Game from "./components/pages/Game.jsx";
// auth
import {AuthProvider, AuthContext} from "./components/Auth/AuthContext.jsx";
import Login from "./components/Auth/Login.jsx";
import Registration from "./components/Auth/Registration.jsx";
import Logout from "./components/Auth/Logout.jsx";

import store from "./store";
import {Provider} from 'react-redux';

const App = () => {
    return (
        <AuthProvider>
            <Provider store={store}>
                <div className="wrapper">
                    <Router>
                        <AuthContent/>
                    </Router>
                </div>
            </Provider>
        </AuthProvider>
    );
}

const AuthContent = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        return (
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
            </Routes>
        );
    }

    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="contacts" element={<Contacts/>}/>
                <Route path="gallery" element={<Gallery/>}/>
                <Route path="testapi" element={<TestAPI/>}/>
                <Route path="list" element={<List/>}/>
                <Route path="chat" element={<Chat />}/>
                <Route path="game" element={<Game/>}/>
                <Route path="logout" element={<Logout/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
