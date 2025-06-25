import React, { Component } from 'react';

class RenderFavBookInfo extends Component {
    render() {
        return (
        <div className='Block'>
            <h2>Название книги: {this.props.bookName}</h2>
            <img src={this.props.image} alt="" />
            <p>Автор книги: {this.props.author}</p>
            <p>Год издания: {this.props.year}</p>
            <p>Жанр: {this.props.genre}</p>
            <p>Количество страниц: {this.props.numOfPages}</p>

            <h3>Несколько рецензий на неё:</h3>
            <div className='Reviews'>
                <p>
                    Рецензия 1:<br/>
                    «American Psycho» — это жесткая и провокационная сатира на потребительское общество 1980-х.
                    Главный герой, Патрик Бэйтман, ведет двойную жизнь: днем он успешный бизнесмен, а ночью — безжалостный убийца. 
                    Книга пугает и завораживает одновременно.
                </p>
                <p>
                    Рецензия 2:<br/>
                    Чтение далось тяжело — местами текст жестокий и отталкивающий, но невозможно не признать литературную силу Эллиса. 
                    Он разоблачает пустоту общества, в котором важны лишь бренды и статус.
                </p>
            </div>
            
        </div>
    );
    }
}

export default RenderFavBookInfo;