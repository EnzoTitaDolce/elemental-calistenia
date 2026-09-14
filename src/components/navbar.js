import { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
function Navbar(){
 
    const [abierto, setAbierto] = useState(false)

    return(        
            <nav>
                <button id="botonMenu" onClick={()=>setAbierto(!abierto)}>☰</button>
                <ul id="listaLinks" className={abierto ? "mostrar" : ""}>
                    <li><Link to="/" onClick={()=>setAbierto(!abierto)}>Inicio</Link></li>
                    <li><Link to="/calistenia" onClick={()=>setAbierto(!abierto)}>¿Qué es?</Link></li>
                    <li><Link to="/nosotros" onClick={()=>setAbierto(!abierto)}>Nosotros</Link></li>
                    <li><Link to="/contacto" onClick={()=>setAbierto(!abierto)}>Contacto</Link></li>
                    <li><Link to="/login" onClick={()=>setAbierto(!abierto)}>Log In</Link></li>
                </ul>
            </nav>        
    )

}

export default Navbar;