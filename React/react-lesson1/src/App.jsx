import './App.css';
import RenderCityInfo from './components/RenderCityInfo';

function App() {
  return (
    <RenderCityInfo 
    country='Азербайджан' 
    city='Баку' 
    foundYear='886' 
    images={['https://c.files.bbci.co.uk/221B/production/_131013780_bbcm_azerbaijan_country_profile_070923-edit.png']}/>
  );
}

export default App;
