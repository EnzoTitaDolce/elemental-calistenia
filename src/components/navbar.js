import { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
function Navbar(){
 
    const [abierto, setAbierto] = useState(false)

    return(        
            <nav>
                <button id="botonMenu" onClick={()=>setAbierto(!abierto)}>☰</button>
                <ul id="listaLinks" className={abierto ? "mostrar" : ""}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/calistenia">¿Qué es?</Link></li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </nav>        
    )

}

export default Navbar;