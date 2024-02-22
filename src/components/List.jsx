import Students from '../list.json';

function List() {

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
                    <select>
                        <option value={''}>All</option>
                        {showOptions(Students)}
                    </select>
                </label>
            </div>
            <div className={'users'}>
                {Students.map((student) => (
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
