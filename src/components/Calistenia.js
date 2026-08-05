import './Calistenia.css'


function Calistenia(){

    return(
        <div>
            <h1 id="calish1">¿Qué es la Calistenia?</h1>
            <section id='calistenia'>
            <article id="fuerza" className='articleItem'>
                <details>
                    <summary>
                    Fuerza
                    </summary>
                    <p>
                        Construí un cuerpo que impresione por su potencia, no solo por su apariencia.
                    </p>
                </details>
                
            </article>
            <article id="movilidad" className='articleItem'>
                <details>
                    <summary>Movilidad</summary>
                    <p>
                        Movete con libertad, agilidad y sin límites.
                    </p>
                </details>
                
            </article>
            <article id="control" className='articleItem'>
                <details>
                    <summary>Control</summary>
                    <p>
                        Convertí cada movimiento en una demostración de dominio absoluto.
                    </p>
                </details>
                
            </article>
            <article id="equilibrio" className='articleItem'>
                <details>
                    <summary>Equilibrio</summary>
                    <p>
                        Encontrá la estabilidad que transforma tu rendimiento.
                    </p>
                </details>
                
            </article>
            <article id="evolucion" className='articleItem'>
                <details>
                    <summary>Evolución</summary>
                    <p>
                        Cada repetición te acerca a una mejor versión de vos mismo.
                    </p>
                    </details>
            </article>


            </section>
        </div>
    )

}

export default Calistenia;