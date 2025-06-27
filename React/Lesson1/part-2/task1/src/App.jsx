import './App.css';
import RenderFavMovieInfo from './components/RenderFavMovieInfo';

function App() {
  return (
    <RenderFavMovieInfo
      movieName="Скотт Пилигрим против всех"
      poster="https://wallpapercat.com/w/full/a/e/1/528873-3840x2160-desktop-4k-scott-pilgrim-wallpaper.jpg"
      year="2010"
      director="Эдгар Райт"
      genre="Экшн, комедия, фэнтези"
      description="Скотт Пилигрим, 22-летний музыкант, влюбляется в загадочную Рамону Флауэрс. Чтобы завоевать её сердце, он должен победить её семерых злобных бывших бойфрендов."
    />
  );
}

export default App;
