import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import NavigationBar from './NavigationBar';
import Login from './components/Login';
import Signup from './components/Signup';

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
        </Routes>
      </Router>
    </>
  )

}

export default App;
