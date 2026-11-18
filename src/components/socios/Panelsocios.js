import './Panelsocios.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Panelsocios(){

    //Variable con la url base//
    const baseUrl = "https://elementalgym.onrender.com/"
    //const baseUrl = "http://127.0.0.1:5000/"

    //estados que controlan el modal y la lista de socios
    const [modalAbierto,setModalAbierto] = useState(false);
    const [socios,setSocios] = useState([]);
    const [mostrar,setMostrar] = useState(false)
    
    //Accede al token guardado en la sesión para incluirlo en la
    //cabecera de las peticiones
    const token = sessionStorage.getItem("access_token")

    /*función asíncrona que envía la petición con los datos
    para registrar al socio*/
    async function registrarSocio(socio){
        //guarda la respuesta de la petición
        const respuesta = await fetch(baseUrl+"api/socios",{
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body:socio
        })
        //traduce la respuesta de la petición a un json
        const resultado =  respuesta.json()
        return {
            ok:respuesta.ok,
            datos:resultado
        }
        
    }

    //ídem anterior para listar socios
    async function getSocios(){
        try{            
            const respuesta = await fetch(baseUrl+"api/socios",{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-Type":"application/json"                
                }
            })
            const resultado = await respuesta.json()
            console.log(token)
            setSocios(resultado.items)
            setMostrar(true)
            
        }
        catch(e){
            console.log("Error: ",e)
        }
    }
    useEffect(() =>{getSocios()},[])
    
    async function handleSubmit(e){
        e.preventDefault();

        const datos = new FormData(e.target);

        const socio ={
            nombre: datos.get("nombre"),
            apellido: datos.get("apellido"),
            dni:datos.get("dni"),
            telefono:datos.get("telefono"),
            categoria_id:parseInt(datos.get("categoria")),
            es_activo:e.target.activochk.checked
        }
        const resultado = await registrarSocio(JSON.stringify(socio));


        const spanConfirmado = document.getElementById("confirmado");
        const spanError = document.getElementById("error");
        if(resultado.ok){
            spanConfirmado.classList.add("confirmado")
            spanError.setAttribute("style", "display: none");
        }else{
            spanError.classList.add("error")
            spanConfirmado.setAttribute("style", "display: none");
        }
    }
    

    return(
        <div>
            <h1>Panel de Socios</h1>
            <div id="botonera">
                <button onClick={getSocios}>Ver socios</button>
                <button onClick={()=>setModalAbierto(true)}>Registrar Socio</button>
                {/* <button>Buscar Socio</button> */}
                <Link to="/panel" className="linkAdmin">Volver</Link>

            </div>
            {!mostrar && (                
                <h1 id="sin_socios">No hay socios para mostrar.</h1>
            )}
            {mostrar && (
                <table id="tablaSocios">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nombre</th>
                        <th>Apellido</th>
                        {/* <th>DNI</th>
                        <th>Teléfono</th>
                        <th>Categoría</th> */}
                        <th>Estado</th>
                        <th>Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {socios.map((socio)=>(
                        //genera la fila
                        <tr key={socio.id}>
                            {/* <td>{socio.id}</td> */}
                            <td>{socio.nombre}</td>
                            <td>{socio.apellido}</td>
                            {/* <td>{socio.dni}</td>
                            <td>{socio.telefono}</td>
                            <td>{socio.categoria.nombre_categoria}</td> */}
                            <td>
                                <Link to = {`/panelsocios/${socio.id}/mensualidades`}>
                                {socio.estado_mensualidad}
                                </Link>
                            </td>
                            <td>{new Date(socio.fecha_vencimiento_mensualidad).toLocaleDateString
                            ('es-AR',{timezone:'UTC'}) ?? "Sin fecha"}</td>
                        </tr>
                    ))}                    
                </tbody>
            </table>
                )
                }
            

            {modalAbierto && (
                <div className="modalFondo">
                    <div className="modal">
                        <button type="button" onClick={()=>setModalAbierto(false)} id='x'>X</button>
                        <h2>Nuevo socio</h2>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                            <input type="text" placeholder="Nombre" name="nombre"/>
                            <input type="text" placeholder="Apellido" name="apellido"/>
                            <input type="text" placeholder="DNI" name="dni"/>
                            <input type="text" placeholder="Teléfono" name="telefono"/>
                            <select name="categoria" id="categoria" defaultValue="">
                                <option value="" disabled>Selecciona una categoría</option>
                                <option value="1">Adultos</option>
                                <option value="2">Kids</option>
                                <option value="3">Especial</option>
                            </select>
                            </fieldset>
                            <fieldset id="fieldCheck">
                            <label htmlFor="activochk">Activo</label>
                            <input type="checkbox" name="activochk"/>
                            </fieldset>
                            <button type="button" onClick={() => setModalAbierto(false)} id="cancelar">
                                Cancelar
                            </button>

                            <button type="submit" id="enviar">
                                Guardar
                            </button>
                            <span id="confirmado">OK</span>
                            <span id="error">X</span>
                        </form>

                    </div>
                </div>
            )}
        </div>

    )
}

export default Panelsocios;