import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Panel.css'

function Panel(){
    //const baseUrl = "http://127.0.0.1:5000/"
    const baseUrl = "https://elementalgym.onrender.com/"
    const navigate = useNavigate()
    if(!sessionStorage.getItem("access_token")){
        navigate("/home")
    }

    async function logOut(){
        alert("saliendo")
        try{
            const token = sessionStorage.getItem("access_token")
            await fetch(baseUrl+"api/auth/super-admin/logout",{
                method:"POST",
                headers:{
        
                    "Authorization":`Bearer ${token}`
                }
            });
            sessionStorage.clear()
            navigate("/")
        }

        catch(e){}
        


    }

    return(<div id="principalPanelAdmin">
        <h1>Panel Administrador</h1>
        
        <section id="PanelAdminForm">
            <Link to="/panelsocios" className='linkAdmin'>Socios</Link>
            <Link to="/panelsocios/mensualidades" className='linkAdmin'>Mensualidades</Link>
            <Link to="/panelsocios" className='linkAdmin'>Promociones</Link>
            <Link to="/panelsocios" className='linkAdmin'>Profesores</Link>
        </section>
        <button onClick={logOut}>Salir</button>
    </div>)
}

export default Panel;