import {useContext, useState, useEffect} from 'react';
import PropTypes from "prop-types";
import SendIcon from '@mui/icons-material/Send';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {onAuthStateChanged} from 'firebase/auth';
import CancelIcon from '@mui/icons-material/HighlightOff';
import {ThemeContext} from "../ThemeContext.jsx";
// Firestore
import { db } from "../../fb-cfg.js"; // Припускаючи, що db - це екземпляр Firestore
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
// Authentication
import {auth} from "../../fb-cfg.js";

function Chat({label, placeholder}) {
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
            console.log(currentUser);
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

    // Кількість елементів чату на сторінці
    const elementsOnPage = 5;

    // Функція, яка викликається при кліку на кнопку редагування
    const startEditing = (index) => {
        setEditingIndex(index); // Починаємо редагування
        setEditingText(displayedText[index]); // Зберігаємо текст коментаря
    };

    // Функція, яка викликається при кліку на кнопку збереження редагування
    const saveEdit = (index) => {
        const newComments = [...displayedText];
        newComments[index] = {
            ...newComments[index],
            text: editingText,
            date: new Date().toLocaleString() // оновлюємо дату редагування
        };
        setDisplayedText(newComments);
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
                author: user ? user.displayName : 'Anonymous'
            });

            setInputValue('');
        }
    }


    // Функція, яка видаляє елемент з масиву за індексом
    const deleteItemFromArray = (index) => {
        // Використовуємо метод filter для створення нового масиву без елемента за індексом
        setDisplayedText(displayedText.filter((_, i) => i !== index));
    };

    // Функція, яка видаляє коментар
    const deleteComment = (index) => {
        deleteItemFromArray(index);
    }

    // Функція, яка рендерить коментарі
    const renderComment = (comment, index) => {
        const isEditing = index === editingIndex;

        return (
            <div key={comment.id || index}> {/* Використання унікального ідентифікатора або індексу як ключа */}
                {isEditing ? (
                    <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                ) : (
                    <p>
                        {comment.text}
                        <small>
                            ({new Date(comment.date).toLocaleString()} by {comment.author})
                        </small>
                    </p>
                )}
                {isEditing ? (
                    <>
                        <SaveIcon onClick={() => saveEdit(index)}/>
                        <CancelIcon onClick={() => setEditingIndex(-1)}/>
                    </>
                ) : (
                    <>
                        <DeleteIcon onClick={() => deleteComment(index)}/>
                        <ModeEditIcon onClick={() => {
                            startEditing(index);
                            setEditingText(comment.text);
                        }}/>
                    </>
                )}
            </div>
        );
    };


    // Повертаємо JSX
    return (
        <div
            className={"main"}
            style={{backgroundColor: lightMode ? "white" : "black", color: lightMode ? "black" : "white"}}
        >
            <div className={'chat-input'}>
                <label>{label}</label>
                <input
                    className={'filterButton'}
                    placeholder={placeholder} // Використовуємо передані пропси
                    value={inputValue} // Використовуємо змінну стану
                    onChange={handleInputChange} // Викликаємо функцію при зміні значення в інпуті
                    onKeyDown={handleKeyPress}
                />
                <SendIcon onClick={handleOnClick} />
            </div>
            {displayedText.map(renderComment)} {/*Викликаємо функцію для кожного елементу масиву*/}
        </div>
    );
}

// Валідація пропсів
Chat.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

// Експортуємо Chat
export default Chat;
