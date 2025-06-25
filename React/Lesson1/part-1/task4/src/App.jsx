import './App.css';
import RenderFavBookInfo from './components/RenderFavBookInfo';

function App() {
  return (
    <RenderFavBookInfo
      bookName="American Psycho"
      image="https://massivepublishing.com/cdn/shop/files/STL299920.jpg?v=1703103877&width=1445"
      author="Брет Истон Эллис"
      year={1991}
      genre="Психологический триллер, сатирический роман"
      numOfPages={400}
    />
  );
}

export default App;
