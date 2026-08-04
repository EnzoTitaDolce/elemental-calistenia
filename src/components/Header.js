import './Header.css';
//import logo from "../assets/img/logoElemental.png"
import logoBlanco from "../assets/img/logoElementalBlanco.png"
import { Link } from 'react-router-dom';
import Navbar from './navbar';

function Header(){
    return(
        <div id="principal">
            <div id="logoElemental">
                <Link to="/">
                    {<img src={logoBlanco} alt="logo elemental" id='logo'></img>}
                </Link>                
            </div>
            <h1 id="titulo">ELEMENTAL</h1>
            <div id="navbar">
                <Navbar/>
            </div>
        </div>
    )
}

export default Header;