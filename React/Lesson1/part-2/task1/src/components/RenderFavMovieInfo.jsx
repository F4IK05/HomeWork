import React from 'react';

function RenderFavMovieInfo(props) {
    return (
        <div className='Block' style={{backgroundImage: `url(${props.poster})`}}>
            <div className='AboutMovie'>
                <h1 id='MovieName'>{props.movieName}</h1>
                <p><b>Год выпуска:</b> {props.year}</p>
                <p><b>Режиссёр:</b> {props.director}</p>
                <p><b>Жанр:</b> {props.genre}</p>
                <p className='Description'><b>Описание:</b><br/> {props.description}</p>
            </div>
        </div>
    );
}

export default RenderFavMovieInfo;