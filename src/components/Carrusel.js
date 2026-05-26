import { useState, useEffect } from "react";
import './Carrusel.css'
import img1 from "../assets/img/calistenia/imagen1.png";
import img2 from "../assets/img/calistenia/imagen2.png";
import img3 from "../assets/img/calistenia/imagen3.png";
import img4 from "../assets/img/calistenia/imagen4.png";
import img5 from "../assets/img/calistenia/imagen5.png";
import img6 from "../assets/img/calistenia/imagen6.png";

const images = [img1, img2, img3, img4, img5, img6];


function Carrusel(){

    const [index,setIndex] = useState(0);

    const next = ()=>{
        setIndex((prev)=>(prev+1) % images.length);
    };

    const prev = () =>{
        setIndex((prev) => prev===0 ? images.length-1 : prev-1)
    }

    useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

    return(
        <div className="carousel">
      <div
        className="track"
        style={{ transform: `translateX(-${index*100}%)` }}
      >
        {images.map((images, i) => (
          <div className="slide" key={i}>
            <img src={images} alt={`slide-${i}`}/>       
          </div>
        ))}
      </div>

      <button onClick={prev} className="btn prev">‹</button>
      <button onClick={next} className="btn next">›</button>
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
    )

}

export default Carrusel;