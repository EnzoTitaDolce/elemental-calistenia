import Calistenia from '../components/Calistenia';
import Carrusel from '../components/Carrusel';
import Nosotros  from '../components/Nosotros';
import './Home.css';

function Home(){

    return(
        <div>
            <h1>Construí tu fuerza</h1>
            <Carrusel></Carrusel>
            <Calistenia></Calistenia>
            <Nosotros></Nosotros>
        </div>
    )

}

export default Home;