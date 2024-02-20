import {useState} from 'react';
import PropTypes from "prop-types";

function Chat({label, placeholder}) {
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
            setDisplayedText(currentDisplayText => {
                const newComment = {
                    text: inputValue,
                    date: new Date().toLocaleString(),
                    author: "User"
                };

                // Додаємо новий коментар на початок масиву
                const updatedComments = [newComment, ...currentDisplayText];

                // Якщо кількість коментарів перевищує дозволену, видаляємо останній
                if (updatedComments.length > elementsOnPage) {
                    updatedComments.pop(); // Видаляємо останній коментар
                }

                return updatedComments;
            });

            setInputValue('');
        }
    };

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
            <div key={index}>
                {isEditing ? (
                    <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                ) : (
                    <p>{comment.text} <small>({comment.date} by {comment.author})</small></p>
                )}
                {isEditing ? (
                    <>
                        <button onClick={() => saveEdit(index)}>Save</button>
                        <button onClick={() => setEditingIndex(-1)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => deleteComment(index)}>Delete</button>
                        <button onClick={() => {
                            startEditing(index);
                            setEditingText(comment.text);
                        }}>Edit</button>
                    </>
                )}
            </div>
        );
    };

    // Повертаємо JSX
    return (
        <div>
            <label>{label}</label>
            <input
                placeholder={placeholder} // Використовуємо передані пропси
                value={inputValue} // Використовуємо змінну стану
                onChange={handleInputChange} // Викликаємо функцію при зміні значення в інпуті
                onKeyDown={handleKeyPress} // Викликаємо функцію при натисканні на клавішу
            />
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
