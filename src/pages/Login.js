import { useNavigate } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';



function Login(){
    const navigate = useNavigate()    
    const [mostrarPass,setMostrarPass] = useState(false)
    const handleSubmmit = async (e) =>{
        //const baseUrl = "https://elementalgym.onrender.com/"
        const baseUrl = "http://127.0.0.1:5000/"
        e.preventDefault();

        const datos={
            email:e.target.usuario.value,
            password:e.target.password.value
        }        
        try{
            const respuesta = await fetch(baseUrl+"api/auth/super-admin/login",
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
        }
        catch(e){
            console.error("Error al conectar el servidor",e);
        }
    }
       function activarBoton(){

    const boton = document.getElementById("iniciar");
    const usuario = document.getElementById("usuario");
    const password = document.getElementById("password");

    if (
        usuario.value.trim().length > 0 &&
        password.value.trim().length > 0
    ) {
        boton.disabled = false;
    } else {
        boton.disabled = true;
    }
}
        function validateUser(){            
            const userText = document.getElementById("usuario")
            const user = document.getElementsByName("user")[0];
            if (userText.value.trim().length===0) {
                user.classList.add('warning')
            }else{
                user.classList.remove('warning')                
                return true                
            }
        }
        function validatePass(){
                const pass = document.getElementById("password")
                const contra = document.getElementsByName("contra")[0]
                if(pass.value.trim().length===0){
                    contra.classList.add("warning")
                }else{
                    contra.classList.remove("warning")                    
                    return true
                }
        }

    return(
        <div>
                       
            <form onSubmit={handleSubmmit} id="loginForm">
                <fieldset>
                    <legend>Ingresá tus Datos</legend>
                <input type="text" id="usuario" placeholder="Usuario" onBlur={validateUser}
                onChange={activarBoton}></input>
                <p name="user">Debes ingresar un nombre de usuario</p>                
                <input type={mostrarPass ? "text":"password"} id="password" placeholder="Contraseña" onBlur={validatePass}
                onChange={activarBoton}></input>
                <p name="contra">La contraseña no puede estar vacía</p>
                <label>
                    <input 
                    type="checkbox"
                    checked={mostrarPass}
                    onChange={(e)=>setMostrarPass(e.target.checked)}
                    />
                </label>
                <input type="submit" id="iniciar" disabled={true}></input>                
                </fieldset>    
            </form>
        </div>
    )

}

export default Login;