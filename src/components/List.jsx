import { useState } from 'react';
import Students from '../list.json';

function List() {
    const [selectedCity, setSelectedCity] = useState('');

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const filteredStudents = selectedCity
        ? Students.filter(student => student.city === selectedCity)
        : Students;

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
            </div>

            <div className={'users'}>
                {filteredStudents.map((student) => (
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
