
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useContext } from 'react';
import Home from './components/Home';
import Three from './threeD/Three';
import AuthContext from './components/Context';
import Loader from './threeD/Loader';


function App() {
  const {load} =useContext(AuthContext)
  return (
    
    <Router>
    <Routes>
    <Route  path='/' element={<Home/>}></Route>
    
    <Route  path='/three' element={<Three/>}></Route>
    </Routes>
    </Router>
    
  );
}

export default App;
