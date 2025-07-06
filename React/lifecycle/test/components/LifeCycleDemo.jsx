import React from 'react';

class LifeCycleExample extends React.Component {
  constructor(props) {
    super(props);
    console.log('[constructor] Компонент создан');
    this.state = {
      count: 0,
    };
  }

  // УСТАРЕВШИЙ метод
  UNSAFE_componentWillMount() {
    console.log('[UNSAFE_componentWillMount] До render, устаревший метод');
  }

  componentDidMount() {
    console.log('[componentDidMount] Компонент примонтирован');
  }

  // УСТАРЕВШИЙ метод
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('[UNSAFE_componentWillReceiveProps] Получены новые props:', nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('[componentDidUpdate] Компонент обновился');
  }

  componentWillUnmount() {
    console.log('[componentWillUnmount] Компонент удаляется');
  }

  componentDidCatch(error, info) {
    console.log('[componentDidCatch] Ошибка поймана:', error);
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log('[render] Рендер компонента');
    return (
      <div className="p-4 border rounded shadow-md">
        <h2>Счётчик: {this.state.count}</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={this.increment}>
          Увеличить
        </button>
      </div>
    );
  }
}

export default LifeCycleExample;
