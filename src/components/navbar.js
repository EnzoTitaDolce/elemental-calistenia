import './navbar.css';
import { Link } from 'react-router-dom';
function Navbar(){

    return(        
            <nav>
                <ul id="listaLinks">
                    <li><Link to="/">Inicio</Link></li>
                    <li>¿Qué es?</li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                    <li>Contacto</li>
                </ul>
            </nav>        
    )

}

export default Navbar;