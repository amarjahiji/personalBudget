import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;