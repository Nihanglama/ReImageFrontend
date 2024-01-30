import './App.css'
import NavBar from './components/nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login'
import SignUp from './components/register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './components/Upload';
import Home from './components/Home';
import Logout from './components/Logout';
import ConvertImg from './components/Convert';
import GetImages from './components/Images';

function App() { 
  return (
    <Router>
      <NavBar/>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/uploads" element={<Upload/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/convert" element={<ConvertImg/>} />
      <Route path="/images" element={<GetImages/>} />

      <Route path="/" element={<Home/>} />
    </Routes>
  </Router>
   
  )
}

export default App
