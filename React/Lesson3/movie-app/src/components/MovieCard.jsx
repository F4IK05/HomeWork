import React from 'react';

function MovieCard({ movies }) {
    return (
        <div className='px-10 flex flex-row flex-wrap gap-5 justify-center'>
            {movies.results ? movies.results.map(m =>
                <div key={m.id} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-72">
                    <div className="flex justify-center relative m-2.5 overflow-hidden text-white rounded-md h-[400px]">
                        {m.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                alt={m.title}
                                className="h-full object-cover"
                            />
                        ) : (
                            <div className='text-black w-full h-full flex justify-center items-center bg-stone-200'>
                                NO PHOTO
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col flex-1 p-4 justify-between">
                        <div>
                            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                {m.title}
                            </h6>
                            <p className="text-slate-600 leading-normal font-light">
                                {m.overview ? m.overview : 'No info'}
                            </p>
                        </div>
                        <div className="mt-4">
                            <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                Read more
                            </button>
                        </div>
                    </div>
                </div>
            ) : <>

                <div className='flex flex-col items-center justify-center text-center h-[90vh] text-2xl'>
                    <img className='w-70' src="https://static.thenounproject.com/png/1400397-200.png" alt="" />
                    No info
                </div>

            </>}
        </div>
    );
}

export default MovieCard;