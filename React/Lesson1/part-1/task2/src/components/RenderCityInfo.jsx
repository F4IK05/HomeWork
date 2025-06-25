import React, { Component } from 'react';

class RenderCityInfo extends Component {
    render() {
        return (
            <div className='Block'>
            <h1>Информация о моем городе:</h1>
            <p>Страна: {this.props.country}</p>
            <p>Город: {this.props.city}</p>
            <p>Год основания: {this.props.foundYear}</p>

            <div className='Images'>
                {this.props.images.map((src, index) => 
                    <img key={index} src={src} alt=''/>
                )}
            </div>
        </div>
        );
    }
}

export default RenderCityInfo;