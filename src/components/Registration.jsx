// src/components/Registration.jsx

import { useState } from 'react';
import { auth } from '../fb-cfg.js';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            // Обробка успішної реєстрації
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Registration;
