import { useCallback, useState } from 'react';
import { onSearch } from '../../actions/actions';
import SearchData from './SearchData';

const SearchTask = () => {
  const [searchParams, setSearchParams] = useState({
    name_like: '',
    description_like: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };



  return (
    <div className='main_search_task'>
      <h2 className='text-center mt-5'>Search</h2>
      <form className="search-form">
        <div>
          <input
            type="text"
            name="name_like"
            value={searchParams.name_like}
            onChange={handleChange}
            placeholder="Search by name"
            className="search-input"
          />
        </div>
        <div>
          <input
            type="text"
            name="description_like"
            value={searchParams.description_like}
            onChange={handleChange}
            placeholder="Search by description"
            className="search-input"
          />
        </div>
        <div>
          <input
            type="date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleChange}
            placeholder="Search by start date"
            className="search-input"
          />
        </div>
        <div>
          <input
            type="date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleChange}
            placeholder="Search by end date"
            className="search-input"
          />
        </div>
        <SearchData searchParams={searchParams} />
      </form>
    </div>
  );
};

export default SearchTask;
