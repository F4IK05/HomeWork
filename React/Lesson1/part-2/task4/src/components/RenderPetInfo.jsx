import React from 'react';

function RenderPetInfo(props) {
    return (
        <div className='PetCard'>
            <img src={props.photo} alt="" />
            <p><b>Имя:</b> {props.name}</p>
            <p><b>Вид:</b> {props.type}</p>
            <p><b>Возраст:</b> {props.age} лет</p>
        </div>
    );
}

export default RenderPetInfo;