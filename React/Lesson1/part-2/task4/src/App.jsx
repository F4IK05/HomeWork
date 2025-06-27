import './App.css';
import RenderPetInfo from './components/RenderPetInfo';

function App() {
  return (
    <RenderPetInfo
      photo='https://preview.redd.it/zazu-soldier-cat-two-thousand-yard-stare-meme-restoration-v0-elx0vyxdhgpd1.png?width=1080&crop=smart&auto=webp&s=90fb482d202d04af3fd163498ae47fd80dca9560'
      name='Одди'
      type='Кот'
      age='6'
    />
  );
}

export default App;
