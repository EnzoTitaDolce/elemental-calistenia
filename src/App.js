import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header.js";
import Home from"./pages/Home.js"
import './App.css';
import Nosotros from "./components/Nosotros.js";
import Calistenia from "./components/Calistenia.js";
import Contacto from "./components/Contacto.js"
import Login from  "./pages/Login.js"
import Panel from "./components/Panel.js"
import ProtectedRoute from "./components/ProtectedRoute.js";

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nosotros" element={<Nosotros/>}/>
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/calistenia" element={<Calistenia/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/panel" element={<ProtectedRoute><Panel/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
