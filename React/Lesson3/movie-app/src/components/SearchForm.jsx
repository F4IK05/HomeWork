import { useRef, useState } from "react";
import { fetchMovies } from "../services/fetchService";

function SearchForm({setValue}) {
    const searchInput = useRef();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetchMovies(searchInput.current.value);

        setValue(res);
        }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex justify-center">
                <input onChange={handleChange} className='rounded-l-lg w-90 p-2 border-1 border-solid' ref={searchInput} placeholder='Enter movie name' type='search' name="movie-name" id="movie-name"/>
                <button disabled={!inputValue}  className={`rounded-r-lg p-2 border-1 border-solid bg-black text-white ${!inputValue ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} type='submit'>Search</button>
            </form>
        </div>
    )
};

export default SearchForm;
    