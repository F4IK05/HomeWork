import React, { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext'
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

function SearchWithContext() {
    const { movies, setMovies } = useContext(MovieContext)


    return (
        <div className='flex items-center justify-center align-center flex-col'>
            <Navbar setValue={setMovies} />
            <MovieCard movies={movies}/>
        </div>
    );
}

export default SearchWithContext;