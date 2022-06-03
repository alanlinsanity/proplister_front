import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './screens/Homescreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import ListingIndiv from './screens/Listingscreen';
import Createscreen from './screens/Createscreen';
import Dashboard from './screens/Dashboard';
import Edit from './screens/Edit';
import Welcomescreen from './screens/Welcomescreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
        <Route path='' element={<Welcomescreen />}/>
          <Route path='listings' element={<Homescreen />}/>
          <Route path='dashboard' element={<Dashboard />}/>

          <Route path='create' element={<Createscreen />}/>
          <Route path='/listings/:id' exact element={<ListingIndiv/>}/>
          <Route path='/listings/edit/:id' element={<Edit />}/>
          <Route path='register' element={<Registerscreen />}/>
          <Route path='login' element={<Loginscreen />}/>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
