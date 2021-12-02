import Login from './Pages/Login/Login';

import Admin from "./Pages/Admin/Admin";
import User from './Pages/User/User';
import NotFound from "./Pages/NotFound/NotFound";
import RedirectUser from './Pages/Redirect/Redirect';

import RequireAuth from "./Components/RequireAuth/RequireAuth";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/login" element={<Login />} />
       
        <Route path="/redirect" element={<RedirectUser />}/>
        
        <Route path="/admin"  element={<RequireAuth role="admin"><Admin /></RequireAuth>} />
        <Route path="/user"   element={<RequireAuth role="user"> <User /> </RequireAuth>} />
        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
