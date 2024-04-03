import React, {useState, useCallback, useEffect, useMemo, useContext} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ThemeContext} from "../ThemeContext.jsx";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase.js';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {addLike, removeLike} from "../likesSlice.js";

const CityFilter = ({ onChange, students }) => {
    const options = useMemo(() => {
        const uniqueCities = [...new Set(students.map(item => item.city))];
        return uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
        ));
    }, [students]);

    return (
        <select onChange={onChange}>
            <option value="">All Cities</option>
            {options}
        </select>
    );
};

CityFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired // Додайте propTypes для students
};

const StudentComponent = ({ student }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            dispatch(addLike());
        } else {
            dispatch(removeLike());
        }
    };

    return (
        <div
            id={student.id} // Assign ID here
            className={"user"}
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
};

const Student = React.memo(StudentComponent);

export const List = () => {
    const { lightMode } = useContext(ThemeContext);
    const [selectedCity, setSelectedCity] = useState('');
    const [sortDirection, setSortDirection] = useState(null);
    const [students, setStudents] = useState([]);

    const loadStudents = async () => {
        const querySnapshot = await getDocs(collection(db, "students")); // Припускаючи, що ваша колекція називається "students"
        const studentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentList);
        console.log('Students loaded:', studentList);
    };

    useEffect(() => {
        loadStudents()
            .then(() => console.log('Students loaded'))
            .catch(error => console.error('Error loading students:', error))
            .finally(() => console.log('Finally'));
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
                    <CityFilter onChange={handleCityChange} students={students} />
                </label>
                Absences <ArrowDownwardIcon onClick={() => handleSort('down')}/>
                Absences <ArrowUpwardIcon onClick={() => handleSort('up')}/>
                Clear <HighlightOffIcon onClick={handleClear}/>
            </div>
            <div className="users">
                {sortedFilteredStudents.map(student => (
                    <Student
                        key={student.id}
                        student={student}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
