import Calistenia from '../components/Calistenia';
import Carrusel from '../components/Carrusel';
import Nosotros  from '../components/Nosotros';
import Contacto from '../components/Contacto'
import './Home.css';

function Home(){

    return(
        <div>
            <h1 id="homeh1">Construí tu fuerza</h1>
            <Carrusel></Carrusel>
            <Calistenia></Calistenia>
            <Nosotros></Nosotros>
            <Contacto></Contacto>
        </div>
    )

}

export default Home;