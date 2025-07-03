import { useRef } from "react";
import { fetchMovies } from "../services/fetchService";

function SearchForm({setValue}) {
    const searchInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetchMovies(searchInput.current.value);

        setValue(res);
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit } className="flex justify-center">
                <input className='rounded-l-lg w-90 p-2 border-1 border-solid' ref={searchInput} placeholder='Enter movie name' type='search' name="movie-name" id="movie-name"/>
                <button className="rounded-r-lg cursor-pointer p-2 border-1 border-solid bg-black text-white" type='submit'>Search</button>
            </form>
        </div>
    )
};

export default SearchForm;
    