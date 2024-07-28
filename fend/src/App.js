import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import Footer from './Footer';
import Login from './Login';
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;