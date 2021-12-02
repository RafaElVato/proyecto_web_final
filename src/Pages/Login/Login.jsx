import { useState } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { Navigate } from "react-router-dom";
import LoginPic from "../../Assets/LoginPic.png";

export default function Login() {
    const { login, token } = useUserContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const OnChange = (e, save) => {
        save(e.target.value);
    }

    const OnSubmitHandler =  async (e) => {
        e.preventDefault();
        const logged = await login(username, password);

        setError(!logged);
        setUsername("");
        setPassword("");
    }

    if (token) {
        console.log("Se loggea")
        return <Navigate replace to="/redirect" />
    }

    return (
        <div className="login-container flex flex-row justify-center items-center min-h-screen  bg-gradient-to-r from-red-500 to-yellow-400 ">
            <div className="form px-32">
                <form onSubmit={OnSubmitHandler} className="flex flex-col justify-center items-center min-h-screen">
                    <h1 className="text-white text-5xl font-bold py-5">¡Ingresa!</h1>
                    <input className="rounded m-3 p-3" type="text" value={username} onChange={(e) => OnChange(e, setUsername)} placeholder='Ingrese su usuario'/>
                    <input className="rounded m-3 p-3" type="password" value={password} onChange={(e) => OnChange(e, setPassword)} placeholder='Ingrese su contraseña'/>
                    <button  className="mt-6 h-auto w-1/2 md:w-min text-xl p-2 bg-purple-500 hover:bg-purple-600 text-white 
                        focus:outline-none focus:shadow-outline rounded-lg shadow px-7" >Login</button>
                    {error && <p className="text-xl font-medium text-red-900 text-center mt-6 animate-pulse">Usuario o contraseña incorrectos</p>}
                </form>
            </div>
            <div className="login-img">
                <img src={LoginPic} alt="login" />
            </div>
        </div>

    );
}
