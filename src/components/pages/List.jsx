import React, {useState, useCallback, useMemo, useContext} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Checkbox from '@mui/material/Checkbox';
import Students from '../../list.json';
import {ThemeContext} from "../ThemeContext.jsx";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {addLike, removeLike} from "../likesSlice.js";

const CityFilter = ({ onChange }) => {
    const options = useMemo(() => {
        const uniqueCities = [...new Set(Students.map(item => item.city))];
        return uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
        ));
    }, []);

    return (
        <select onChange={onChange}>
            <option value="">All Cities</option>
            {options}
        </select>
    );
};

CityFilter.propTypes = {
    onChange: PropTypes.func.isRequired
};

const StudentComponent = ({ student, dragState, onDragStart, onDragOver, onDrop }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();

    const handleDragStart = (e) => {
        setIsDragging(true);
        onDragStart(student.id); // Use student ID or any unique identifier
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };


    const handleOnClick = () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            dispatch(addLike());
        } else {
            dispatch(removeLike());
        }
    };

    let className = isDragging ? 'user dragging' : 'user';

    return (
        <div
            className={className}
            draggable={dragState}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            id={student.id} // Assign ID here
        >
            <p>{student.id}</p>
            <p>{student.name}</p>
            <p>{student.absences}</p>
            <p>{student.city}</p>

            <div onClick={handleOnClick} >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </div>

        </div>
    );
};

StudentComponent.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        absences: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired
    }).isRequired,
    dragState: PropTypes.bool.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
};

const Student = React.memo(StudentComponent);

export const List = () => {
    const { lightMode } = useContext(ThemeContext);
    const [selectedCity, setSelectedCity] = useState('');
    const [sortDirection, setSortDirection] = useState(null);
    const [dragState, setDragState] = useState(false);
    const [draggedId, setDraggedId] = useState(null);
    const [overId, setOverId] = useState(null);
    const [students, setStudents] = useState(Students); // Manage students as a state

    const handleDragStart = (id) => {
        setDraggedId(id);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setOverId(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setOverId(parseInt(e.currentTarget.id, 10)); // Преобразование строки в число
    };

    const handleDrop = () => {
        if (draggedId && overId && draggedId !== overId) {
            console.log('Dragged ID:', draggedId, 'Over ID:', overId);
            setStudents(prevStudents => replaceDraggedAndOverItems(prevStudents, draggedId, parseInt(overId, 10)));
        }
    };

    const replaceDraggedAndOverItems = (students, draggedId, overId) => {
        const indexDragged = students.findIndex(student => student.id === draggedId);
        const indexOver = students.findIndex(student => student.id === overId);
        if (indexDragged < 0 || indexOver < 0) return students; // Check if indexes are valid

        const newStudents = [...students];
        [newStudents[indexDragged], newStudents[indexOver]] = [newStudents[indexOver], newStudents[indexDragged]];
        return newStudents;
    };

    const handleDragStateChange = useCallback(() => {
        setDragState(prev => !prev);
    }, []);

    const handleCityChange = useCallback((event) => {
        setSelectedCity(event.target.value);
    }, []);

    const handleSort = useCallback((direction) => {
        setSortDirection(direction);
    }, []);

    const handleClear = useCallback(() => {
        setSelectedCity('');
        setSortDirection(null);
    }, []);

    const sortedFilteredStudents = useMemo(() => {
        let filteredStudents = students; // Use 'students' state instead of 'Students'

        if (selectedCity) {
            filteredStudents = filteredStudents.filter(student => student.city === selectedCity);
        }

        if (sortDirection) {
            filteredStudents = [...filteredStudents].sort((a, b) =>
                sortDirection === 'up' ? a.absences - b.absences : b.absences - a.absences
            );
        }

        return filteredStudents;
    }, [selectedCity, sortDirection, students]); // Add 'students' to dependency array

    if (!sortedFilteredStudents.length) {
        return <p>No students to display.</p>;
    }

    return (
        <div
            className={"main" + (lightMode ? " light-mode" : " dark-mode")}
        >
            <div className="filters">
                <label>
                    Filter by city
                    <CityFilter onChange={handleCityChange} />
                </label>
                Absences <ArrowDownwardIcon onClick={() => handleSort('down')}/>
                Absences <ArrowUpwardIcon onClick={() => handleSort('up')}/>
                Clear <HighlightOffIcon onClick={handleClear}/>
                <Checkbox icon={<ToggleOffIcon />} checkedIcon={<ToggleOnIcon />} onClick={handleDragStateChange} />
            </div>
            <div className="users">
                {sortedFilteredStudents.map(student => (
                    <Student
                        key={student.id}
                        student={student}
                        dragState={dragState}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
        </div>
    );
};

// Остання частина файлу
export default List;
