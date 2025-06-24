import './App.css';
import RenderCityInfo from './components/RenderCityInfo';

function App() {
  return (
    <RenderCityInfo 
    country='Азербайджан' 
    city='Баку' 
    foundYear='886'
    images={['https://letsgotravel.ru/wp-content/uploads/heydar_aliyev_center_123-e1572624625881.jpg', 'https://youtravel.me/upload/medialibrary/261/ay09h8rnexry7omgz49zu0xwubch9shc.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykmbUh85bFWSBQVlNiDrdrBIypeq7mmKRTQ&s']}/>
  );
}

export default App;
