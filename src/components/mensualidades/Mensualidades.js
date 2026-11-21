
import './mensualidades.css'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function Mensualidades() {
    const [mensualidades, setMensualidades] = useState(false);
    const [registros, setRegistros] = useState([]);

    const baseUrl = "http://127.0.0.1:5000/"
    //const baseUrl = "https://elementalgym.onrender.com/";
    const token = sessionStorage.getItem("access_token");

    const { id } = useParams();

    const [mostrar, setMostrar] = useState(false);
    const [metodoPago, setMetodoPago] = useState("1");

    // Consulta de mensualidades
    const getMensualidades = useCallback(async (socio) => {
        try {
            const respuesta = await fetch(
                baseUrl + `api/socios/${socio}/mensualidades`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!respuesta.ok) {
                throw new Error("Error al obtener las mensualidades");
            }

            const resultado = await respuesta.json();

            setMensualidades(true);
            setRegistros(resultado.mensualidades);

        } catch (e) {
            console.log("Error: ", e);
        }
    }, [baseUrl, token]);

    // Ejecutamos la consulta al montar el componente
    // y cuando cambian sus dependencias
    useEffect(() => {
        getMensualidades(id);
    }, [id, getMensualidades]);

    // Registro de una nueva mensualidad
    async function registrarMensualidad(e) {
        e.preventDefault();

        const datos = {
            metodo_pago_id: parseInt(metodoPago),
            fecha_pago: new Date().toISOString(),
            fecha_inicio: new Date().toISOString()
        };
        console.log(datos)
        try {
            const respuesta = await fetch(
                baseUrl + `api/socios/${id}/mensualidades`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                }
            );

            const resultado = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    resultado.message || "Error al registrar mensualidad"
                );
            }

            console.log("Mensualidad registrada:", resultado);

            // Actualizamos la tabla
            await getMensualidades(id);

            // Cerramos el formulario
            setMostrar(false);

        } catch (e) {
            console.log("Error:", e);
        }
    }

    return (
        <div>
            <h1>Mensualidades</h1>

            <div id="botonera">
                <button onClick={() => setMostrar(true)}>
                    Registrar Pago
                </button>

                <Link to="/panelSocios" className="linkAdmin">
                    Volver
                </Link>
            </div>

            {mostrar && (
                <form id="formularioPago" onSubmit={registrarMensualidad}>
                    <h1>Socio: {id}</h1>

                    <select
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                    >
                        <option value="1">Efectivo</option>
                        <option value="2">Transferencia</option>
                        <option value="3">Otros</option>
                    </select>

                    <div id="botones">
                        <button type="submit">
                            Registrar
                        </button>

                        <button
                            type="button"
                            onClick={() => setMostrar(false)}
                        >
                            Salir
                        </button>
                    </div>
                </form>
            )}

            {mensualidades && (
                <table id='tablaMensualidades'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            
                            <th>Fecha de Finalización</th>
                            <th>Fecha Pago</th>
                            <th>Método de pago</th>
                        </tr>
                    </thead>

                    <tbody>
                        {registros.map((registro) => (
                            <tr key={registro.id}>
                                <td>{registro.id}</td>

                               

                                <td>
                                    {new Date(
                                        new Date(registro.fecha_pago).setMonth(
                                            new Date(registro.fecha_pago).getMonth() + 1
                                        )
                                    ).toLocaleDateString("es-AR", {
                                        timeZone: "UTC"
                                    })}
                                </td>

                                <td>
                                    {new Date(registro.fecha_pago).toLocaleDateString("es-AR", {
                                        timeZone: "UTC"
                                    })}
                                </td>

                                <td>
                                    {registro.metodo_pago.descripcion_metodo}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Mensualidades;
