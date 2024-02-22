import { useState } from 'react';
import Students from '../list.json';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function List() {
    const [selectedCity, setSelectedCity] = useState('');
    const [sortDirection, setSortDirection] = useState(null); // 'up', 'down', null

    const handleSort = (direction) => {
        setSortDirection(direction);
    }

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSortDirection(null);
    };

    const getSortedFilteredStudents = () => {
        let filteredStudents = selectedCity
            ? Students.filter(student => student.city === selectedCity)
            : Students;

        if (sortDirection) {
            filteredStudents = [...filteredStudents].sort((a, b) => {
                return sortDirection === 'up' ? a.absences - b.absences : b.absences - a.absences;
            });
        }

        return filteredStudents;
    };

    const sortedFilteredStudents = getSortedFilteredStudents();

    const showOptions = (data) => {
        return [...new Set(data.map(item => item.city))]
        .map(city => (
            <option key={city} value={city}>
                {city}
            </option>
        ));
    };

    return (
        <>

            <div className={'filters'}>
                <label>Filter by city
                    <select onChange={handleCityChange}>
                        <option value={''}>Всі міста та села</option>
                        {showOptions(Students)}
                    </select>
                </label>
                <button className={'filterButton'} onClick={() => handleSort('down')}>
                    Absences <ArrowDownwardIcon/>
                </button>
                <button className={'filterButton'} onClick={() => handleSort('up')}>
                    Absences <ArrowUpwardIcon/>
                </button>
                <button className={'filterButton'} onClick={() => handleSort(null)}>
                    Clear sorting <HighlightOffIcon />
                </button>
            </div>

            <div className={'users'}>
                {sortedFilteredStudents.map((student) => (
                    <div className={'user'} key={student.name}>
                        <p>{student.name}</p>
                        <p>{student.absences}</p>
                        <p>{student.city}</p>
                    </div>
                ))}
            </div>

        </>
    );
}

export default List;
