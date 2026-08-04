import { useNavigate } from 'react-router-dom';
import './Login.css'



function Login(){
    const navigate = useNavigate()    



    const handleSubmmit = async (e) =>{

        e.preventDefault();

        const datos={
            email:e.target.usuario.value,
            password:e.target.password.value
        }
        alert(JSON.stringify(datos))
        try{
            const respuesta = await fetch("http://127.0.0.1:5000/api/auth/super-admin/bootstrap",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const resultado = await respuesta.json();
            
            if (resultado.access_token){
                sessionStorage.setItem("access_token",resultado.access_token)
                navigate("/panel")
            }else{
                alert("Login Inválido")
            }

            //console.log(sessionStorage.getItem("access_token")+" este es el tokencito")
            
        }
        catch(e){
            console.error("Error al conectar el servidor",e);
        }
    }


    return(
        <div>
            Panel Admin
            <form onSubmit={handleSubmmit}>
                
                <input type="text" name="usuario" placeholder="Usuario" ></input>
                
                <input type="password" name="password" placeholder="Contraseña"></input>
                <input type="submit" name="iniciar"></input>                
            </form>
        </div>
    )

}

export default Login;