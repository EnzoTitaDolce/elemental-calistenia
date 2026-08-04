import './Panel.css'

function Panel(){

    function borrarToken(){
        if (sessionStorage.getItem("access_token")){
            sessionStorage.clear()
        }else{
            alert("No se encuentra el token o ya ha sido eliminado.")
        }
    }

    return(<div>
        Este es el Panel Admin
        <input type ="button" onClick={borrarToken} value="Borrar"></input>
    </div>)
}

export default Panel;