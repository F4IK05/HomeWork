import React, { useState } from 'react';
import fetcher from '../services/fetchService'
import useSWR from 'swr';

function CatBreedSearch() {
    const [query, setQuery] = useState('');

    const { data, error, isLoading } = useSWR(`https://api.thecatapi.com/v1/breeds/search?q=${query}`, () => fetcher(query));

    return (
        <div className='flex flex-col justify-center items-center'>
            <input
                className='border rounded w-100 mb-10 p-2'
                type="text"
                placeholder='Search cat breeds'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {error && <div>Error loading</div>}
            {isLoading && <div>Loading...</div>}

            {!isLoading && data.length === 0 && (<div>No results for "{query}"</div>)}


            <div className='flex flex-col gap-10'>
                {data && data.map((breed: any) => (
                    <div key={breed.id} className='w-[800px] border-b flex'>
                        <img src={breed.image.url} className='w-[200px] mr-5' alt="" />
                        
                        <div className='pb-5'>
                            <p className='text-2xl'>{breed.name}</p>
                            <p className='italic pb-2'>{breed.origin}</p>
                            <p className='italic pb-3'>{breed.temperament}</p>
                            <p className='italic'>{breed.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CatBreedSearch;