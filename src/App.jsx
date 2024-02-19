import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Display from './Display';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/display' element={<Display />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
