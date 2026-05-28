import './Nosotros.css';
import fotoMena from '../assets/img/profes/mena.webp'
import fotoNacho from '../assets/img/profes/nacho.webp'
import fotoFran from '../assets/img/profes/fran.webp'
import { useState, useEffect } from 'react';


const profes =[{'nombre':'Ignacio Quintana','desc':'Descripción de nacho','foto':fotoNacho},
                {'nombre':'Fran García', 'desc':'Descripción de Fran', 'foto':fotoFran},
                {'nombre':'Emanuel Mena','desc':'Descripción de Emanuel', 'foto':fotoMena}
]

function Nosotros(){
    const [index,setIndex] = useState(0)
    const next = ()=>{
        setIndex((prev)=> (prev+1)%profes.length);
    };
    const prev = ()=>{
        setIndex((prev)=> prev===0 ? profes.length-1 : prev-1)
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            setIndex((prev)=> (prev+1) % profes.length);
        },3000);
        return ()=>clearInterval(interval)
    },[])

    return(
        <div>
            <h1 id="nosotrosh1">Conocenos</h1>
            <div className="carousel">
      <div
        className="track"
        style={{ transform: `translateX(-${index*100}%)` }}
      >
        {profes.map((profes, i) => (
          <div className="slide" key={i}>
            <figure className='card'>
                <img src={profes.foto} alt={`slide-${i}`}/>
                <figcaption>
                    <h3>Nombre: {profes.nombre}</h3>
                    <h3>{profes.desc}</h3>
                </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <button onClick={prev} className="btn prev">‹</button>
      <button onClick={next} className="btn next">›</button>
      <div className="dots">
        {profes.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
        </div>

    );
}

export default Nosotros;