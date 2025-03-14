import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './Components/User/user';
import Photographer from './Components/Vendors/Photographer/photographer';
// import PreWedding from './Components/Vendors/PreWedding/prewedding';
import Venues from './Components/Venues/venues';
import Service from './Components/Service/service';
import RealWedding from './Components/Real wedding/realWedding';
import Login from './Components/Pages/login';
import MakeUp from './Components/Vendors/MakeUp/makeUp';
import PreWedding from './Components/Vendors/PreWedding/preWedding';
import Food from './Components/Vendors/Food/food';
import Mehandi from './Components/Vendors/Mehandi/mehandi';
import MusicDance from './Components/Vendors/Music&Dance/music_Dance';
import PlanningDecor from './Components/Vendors/Planning&Decor/planning_Decor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/photographer" element={<Photographer />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/service" element={<Service />} />
        <Route path="/real-wedding" element={<RealWedding />} />
        <Route path="/pre-wedding" element={<PreWedding />} />
        <Route path="/make-up" element={<MakeUp />} />
        <Route path="/food" element={<Food />} />
        <Route path="/mehandi" element={<Mehandi />} />
        <Route path="/music-dance" element={<MusicDance />} />
        <Route path="/planning-decor" element={<PlanningDecor />} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
