import React from 'react';

function RenderPersonalInfo(props) {
    return (
        <div className='PersonalCard'>
            <p><b>ФИО:</b> {props.fullName}</p>
            <img src={props.photo} alt={props.fullName} />
            <p><b>Возраст:</b> {props.age}</p>
            <p><b>Город проживания:</b> {props.city}</p>

            <div className='AdditionalInfo'>
                <p><b>Email:</b> {props.email}</p>
                <p><b>Телефон:</b> {props.phone}</p>
            </div>
        </div>
    );
}

export default RenderPersonalInfo;