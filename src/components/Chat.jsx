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
        const newComments = [...displayedText]; // Копіюємо масив
        newComments[index] = editingText; // Замінюємо коментар
        setDisplayedText(newComments); // Зберігаємо новий масив
        setEditingIndex(-1); // Закінчуємо редагування
    };

    // Функція, яка викликається при зміні значення в інпуті
    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Зберігаємо значення інпута
    }

    // Функція, яка викликається при натисканні на клавішу Enter в інпуті
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (displayedText.length >= elementsOnPage - 1) {
                deleteItemFromArray(0); // Видаляємо перший коментар
            }
            addItemToTheEndOfArray(inputValue); // Додаємо коментар в кінець масиву
            setInputValue(''); // Очищаємо інпут
        }
    };

    // Функція, яка видаляє елемент з масиву за індексом
    const deleteItemFromArray = (index) => {
        // Використовуємо метод filter для створення нового масиву без елемента за індексом
        setDisplayedText(displayedText.filter((_, i) => i !== index));
    };

    // Функція, яка додає елемент в кінець масиву
    const addItemToTheEndOfArray = (text) => {
        // Використовуємо оператор розширення для створення нового масиву зі старими елементами та новим елементом
        setDisplayedText([...displayedText, text]);
    }

    // Функція, яка видаляє коментар
    const deleteComment = (index) => {
        deleteItemFromArray(index);
    }

    // Функція, яка скасовує редагування
    const cancelEdit = () => {
        // Скасовуємо редагування
        setEditingIndex(-1);
    };

    // Функція, яка рендерить коментарі
    const renderComment = (comment, index) => {
        const isEditing = index === editingIndex;

        const EditButtons = () => (
            <>
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
            </>
        );

        const DefaultButtons = () => (
            <>
                <button onClick={() => deleteComment(index)}>Delete</button>
                <button onClick={() => startEditing(index)}>Edit</button>
            </>
        );

        return (
            <div key={index}>
                {isEditing ? (
                    <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                ) : (
                    <p>{comment}</p>
                )}
                {isEditing ? <EditButtons /> : <DefaultButtons />}
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
