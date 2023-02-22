import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import NavigationBar from './NavigationBar';
import Login from './components/Login';
import Signup from './components/Signup';
import AddContact from './components/AddContact';
import UpdateContact from './components/UpdateContact';
import AddGroup from './components/AddGroup';

function App() {

  return(
    <>
      <nav>
        <NavigationBar />
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addcontact" element={<AddContact />} />
          <Route path="/updatecontact" element={<UpdateContact />} />
          <Route path="/addgroup" element={<AddGroup />} />
        </Routes>
      </Router>
    </>
  )

}

export default App;
