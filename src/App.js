
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Three from './threeD/Three';


function App() {
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
