
import './Panelsocios.css'
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function Panelsocios() {

    // Variable con la URL base
    const baseUrl = "https://elementalgym.onrender.com/";
    //const baseUrl = "http://127.0.0.1:5000/"

    // Estados que controlan el modal y la lista de socios
    const [modalAbierto, setModalAbierto] = useState(false);
    const [socios, setSocios] = useState([]);
    const [mostrar, setMostrar] = useState(false);

    // Accede al token guardado en la sesión
    const token = sessionStorage.getItem("access_token");

    /* Función asíncrona que envía la petición
    con los datos para registrar al socio */
    async function registrarSocio(socio) {

        const respuesta = await fetch(baseUrl + "api/socios", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: socio
        });

        const resultado = await respuesta.json();

        return {
            ok: respuesta.ok,
            datos: resultado
        };
    }

    // Función para listar socios
    const getSocios = useCallback(async () => {
        try {
            const respuesta = await fetch(baseUrl + "api/socios", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!respuesta.ok) {
                throw new Error("Error al obtener los socios");
            }

            const resultado = await respuesta.json();

            setSocios(resultado.items);
            setMostrar(true);

        } catch (e) {
            console.log("Error: ", e);
        }
    }, [baseUrl, token]);

    // Ejecutamos la consulta al montar el componente
    useEffect(() => {
        getSocios();
    }, [getSocios]);

    // Función para registrar un socio desde el formulario
    async function handleSubmit(e) {
        e.preventDefault();

        const datos = new FormData(e.target);

        const socio = {
            nombre: datos.get("nombre"),
            apellido: datos.get("apellido"),
            dni: datos.get("dni"),
            telefono: datos.get("telefono"),
            categoria_id: parseInt(datos.get("categoria")),
            es_activo: e.target.activochk.checked
        };

        try {
            const resultado = await registrarSocio(JSON.stringify(socio));

            const spanConfirmado = document.getElementById("confirmado");
            const spanError = document.getElementById("error");

            if (resultado.ok) {
                spanConfirmado.classList.add("confirmado");
                spanError.setAttribute("style", "display: none");

                // Actualizamos la lista de socios
                await getSocios();

            } else {
                spanError.classList.add("error");
                spanConfirmado.setAttribute("style", "display: none");
            }

        } catch (e) {
            console.log("Error al registrar socio:", e);
        }
    }

    return (
        <div>
            <h1>Panel de Socios</h1>

            <div id="botonera">
                <button onClick={getSocios}>
                    Ver socios
                </button>

                <button onClick={() => setModalAbierto(true)}>
                    Registrar Socio
                </button>

                <Link to="/panel" className="linkAdmin">
                    Volver
                </Link>
            </div>

            {!mostrar && (
                <h1 id="sin_socios">
                    No hay socios para mostrar.
                </h1>
            )}

            {mostrar && (
                <table id="tablaSocios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Estado</th>
                            <th>Vencimiento</th>
                        </tr>
                    </thead>

                    <tbody>
                        {socios.map((socio) => (
                            <tr key={socio.id}>
                                <td>{socio.nombre}</td>
                                <td>{socio.apellido}</td>

                                <td className={socio.estado_mensualidad === 'vencido' ? "vencido":"activo"}>
                                    <Link to={`/panelsocios/${socio.id}/mensualidades`}
                                    className={socio.estado_mensualidad === 'vencido' ? "vencido":"activo"}>
                                        {socio.estado_mensualidad}
                                    </Link>
                                </td>

                                <td>
                                    {socio.fecha_vencimiento_mensualidad
                                        ? new Date(socio.fecha_vencimiento_mensualidad).toLocaleDateString(
                                            'es-AR',
                                            { timeZone: 'UTC' }
                                        )
                                        : "Sin fecha"
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {modalAbierto && (
                <div className="modalFondo">
                    <div className="modal">
                        <button
                            type="button"
                            onClick={() => setModalAbierto(false)}
                            id='x'
                        >
                            X
                        </button>

                        <h2>Nuevo socio</h2>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    name="nombre"
                                />

                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    name="apellido"
                                />

                                <input
                                    type="text"
                                    placeholder="DNI"
                                    name="dni"
                                />

                                <input
                                    type="text"
                                    placeholder="Teléfono"
                                    name="telefono"
                                />

                                <select
                                    name="categoria"
                                    id="categoria"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Selecciona una categoría
                                    </option>

                                    <option value="1">Adultos</option>
                                    <option value="2">Kids</option>
                                    <option value="3">Especial</option>
                                </select>
                            </fieldset>

                            <fieldset id="fieldCheck">
                                <label htmlFor="activochk">
                                    Activo
                                </label>

                                <input
                                    type="checkbox"
                                    name="activochk"
                                    id="activochk"
                                />
                            </fieldset>

                            <button
                                type="button"
                                onClick={() => setModalAbierto(false)}
                                id="cancelar"
                            >
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
    );
}

export default Panelsocios;
