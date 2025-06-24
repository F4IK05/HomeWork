import React from 'react';

function RenderCityInfo(props) {
    return (
        <div className='Block'>
            <h1>Информация о моем городе:</h1>
            <p>Страна: {props.country}</p>
            <p>Город: {props.city}</p>
            <p>Год основания: {props.foundYear}</p>
        </div>
    );
}

export default RenderCityInfo;