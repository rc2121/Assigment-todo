import './FilterTask.css';
const FilterTask = ({filterValue = 'all', setFilterValue}) => {
    return (
        <div className="filterWrapper">
            <label htmlFor="filter">Filter: </label>
            <select id="filter" className='filterList' value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                <option value='all'>ALL</option>
                <option value='completed'>Completed</option>
                <option value='pending'>Pending</option>
            </select>
        </div>
    )
}

export default FilterTask;