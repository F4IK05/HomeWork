import './App.css';
import RenderPersonalInfo from './components/RenderPersonalInfo';

function App() {
  return (
    <RenderPersonalInfo 
      fullName="Фаиг Гасанов Эльшад"
      photo="https://preview.redd.it/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-v0-elx0vyxdhgpd1.png?width=1080&crop=smart&auto=webp&s=90fb482d202d04af3fd163498ae47fd80dca9560"
      age="19"
      city="Баку"
      email="faikhasanov05mail.ru"
      phone="+994 50 123 45 67"
    />
  );
}

export default App;
