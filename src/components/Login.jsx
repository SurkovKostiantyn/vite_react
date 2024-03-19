// src/components/Login.jsx

import { useState } from 'react';
import { auth } from '../fb-cfg.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            // Обробка успішного входу
        } catch (error) {
            // Обробка помилок
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
