import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header.js";
import Home from"./pages/Home.js"
import './App.css';
import Nosotros from "./components/Nosotros.js";

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nosotros" element={<Nosotros/>}/>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
