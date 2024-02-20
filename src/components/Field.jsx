import {useState} from 'react';
import PropTypes from "prop-types";

function Field({label, placeholder}) {
    const [inputValue, setInputValue] = useState('');
    const [displayedText, setDisplayedText] = useState([]);

    const elementsOnPage = 5;

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addItemToTheEndOfArray(inputValue);
            setInputValue('');
        }
    };

    const deleteItemFromArray = (index) => {
        setDisplayedText([...displayedText].filter((_, i) => i !== index));
    };

    const addItemToTheEndOfArray = (text) => {
        setDisplayedText([...displayedText, text]);
    }

    const deleteComment = (index) => {
        deleteItemFromArray(index);
    }

    const showComments = (comments) => {
        if (comments.length > 0) {
            if (comments.length > elementsOnPage) {
                // Видаляємо перший коментар
                deleteComment(0);
            }

            return comments.map((comment, index) => {
                return (
                    <p key={index}>
                        {comment}
                        <button
                            key={index}
                            onClick={() => deleteComment(index)}
                        >
                            Delete
                        </button>
                    </p>)
            })
        }
    }

    return (<div>
            <label>{label}</label>
            <input
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            {showComments(displayedText)}
        </div>);
}

Field.propTypes = {
    label: PropTypes.string.isRequired, placeholder: PropTypes.string.isRequired,
};

export default Field;
