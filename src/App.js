import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './screens/Homescreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import ListingIndiv from './screens/Listingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='listings' element={<Homescreen />}/>
          <Route path='/listings/:id' element={<ListingIndiv/>}/>
          <Route path='register' element={<Registerscreen />}/>
          <Route path='login' element={<Loginscreen />}/>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
