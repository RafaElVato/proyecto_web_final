import { FcCancel } from "react-icons/all";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

const navigate = useNavigate();

const onClick = (e) => {
  navigate("/login");
}
return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-black">

      <FcCancel className="text-8xl m-5"/>
     
      <h2 className="text-6xl font-roboto text-center mb-6 text-white">404</h2>
      <h3 className="text-xl font-roboto text-center text-white">Esta página no se encuentra</h3>
      <p className="text-lg font-roboto text-center text-white">
        Debes regresar a la página de inicio
      </p>
      <button
        className="font-roboto bg-white m-4 py-2 px-4 rounded text-black hover:bg-gray-200"
        onClick={(e) => onClick(e)}
      >
        Ir al login
      </button>
    </div>
  );
}


export default NotFound;