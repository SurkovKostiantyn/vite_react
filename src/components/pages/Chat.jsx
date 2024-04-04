import {useContext, useState, useEffect} from 'react';
import SendIcon from '@mui/icons-material/Send';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {onAuthStateChanged} from 'firebase/auth';
import CancelIcon from '@mui/icons-material/HighlightOff';
import {ThemeContext} from "../ThemeContext.jsx";
// Firestore
import { db } from "@/firebase.js"; // Припускаючи, що db - це екземпляр Firestore
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

// Authentication
import {auth} from "@/firebase.js";

function Chat() {
    const { lightMode } = useContext(ThemeContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("date"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            setDisplayedText(messages);
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        // Очистити підписку, коли компонент знищується
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);
    // Використовуємо хук useState для створення змінних стану

    // Змінна стану для зберігання значення інпута
    const [inputValue, setInputValue] = useState('');
    // Змінна стану для зберігання коментарів
    const [displayedText, setDisplayedText] = useState([]);
    // Змінна стану для зберігання індексу редагованого коментаря
    const [editingIndex, setEditingIndex] = useState(-1);
    // Змінна стану для зберігання тексту редагованого коментаря
    const [editingText, setEditingText] = useState('');

    // Функція, яка викликається при кліку на кнопку редагування
    const startEditing = (index) => {
        setEditingIndex(index); // Починаємо редагування
        setEditingText(displayedText[index]); // Зберігаємо текст коментаря
    };

    // Функція, яка викликається при кліку на кнопку збереження редагування
    const saveEdit = async (index) => {
        const message = displayedText[index];
        const messageRef = doc(db, "messages", message.id);

        await updateDoc(messageRef, {
            text: editingText,
            edited: true, // Додати це поле
            date_edited: new Date().toISOString()
            // Дата не змінюється

        });
        console.log('updated');
        setEditingIndex(-1);
    };


    // Функція, яка викликається при зміні значення в інпуті
    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Зберігаємо значення інпута
    }

    // Функція, яка викликається при натисканні на клавішу Enter в інпуті
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendText();
        }
    };

    const handleOnClick = () => {
        sendText();
    }

    const sendText = async () => {
        if (inputValue.trim()) {
            await addDoc(collection(db, "messages"), {
                text: inputValue,
                date: new Date().toISOString(),
                edited: false, // Додати це поле
                date_edited: null, // Додати це поле
                author: user ? user.displayName : 'Anonymous',
                userId: user ? user.uid : null // Додати це поле
            });

            setInputValue('');
        }
    }

    // Функція, яка видаляє коментар
    const deleteComment = async (index) => {
        const message = displayedText[index];
        const messageRef = doc(db, "messages", message.id);

        await deleteDoc(messageRef);
    };

    // Функція, яка рендерить коментарі
    const renderComment = (comment, index) => {
        const isEditing = index === editingIndex;
        const isCurrentUser = user && user.uid === comment.userId; // Перевірка, чи поточний користувач є автором

        return (
            <div
                key={comment.id || index}
            >
                {isEditing ? (
                    <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                ) : (
                    <p>
                        {comment.text}
                        <br/>
                        <small>
                            (Posted {new Date(comment.date).toLocaleString()} by {comment.author})
                        </small>
                        <br/>
                        { /*check if the message was edited and display the date */ }
                        {comment.edited && (
                            <small>
                                (Edited {new Date(comment.date_edited).toLocaleString()})
                            </small>
                        )}
                    </p>
                )}
                {isCurrentUser && (
                    <>
                        {isEditing ? (
                            <>
                                <SaveIcon onClick={() => saveEdit(index)} />
                                <CancelIcon onClick={() => setEditingIndex(-1)} />
                            </>
                        ) : (
                            <>
                                <DeleteIcon onClick={() => deleteComment(index)} />
                                <ModeEditIcon onClick={() => {
                                    startEditing(index);
                                    setEditingText(comment.text);
                                }} />
                            </>
                        )}
                    </>
                )}
            </div>
        );
    };

    // Повертаємо JSX
    return (
        <div  className={"main" + (lightMode ? " light-mode" : " dark-mode")}>
            <div className={'chat-input'}>
                <label>Chat
                    <input
                        className={'filterButton'}
                        placeholder={'Type your message here'}
                        value={inputValue} // Використовуємо змінну стану
                        onChange={handleInputChange} // Викликаємо функцію при зміні значення в інпуті
                        onKeyDown={handleKeyPress}
                    />
                </label>
                <SendIcon onClick={handleOnClick} />
            </div>
            {displayedText.map(renderComment)} {/*Викликаємо функцію для кожного елементу масиву*/}
        </div>
    );
}

// Експортуємо Chat
export default Chat;
