import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import NavigationBar from './NavigationBar';
import Login from './components/Login';

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
        </Routes>
      </Router>
    </>
  )

}

export default App;
