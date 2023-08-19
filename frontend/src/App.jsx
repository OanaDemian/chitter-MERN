import "./App.css";
import { useEffect, useState } from "react";
import authService from "./services/auth.service"
import { Routes, Route } from 'react-router-dom'; 
import { Feed } from "./components/feed/Feed.jsx";
import {Header} from "./components/header/Header.jsx"
import { Login } from "./components/auth/Login"
import { peeps } from "../src/assets/samplePeeps.js";
import { Register } from "./components/auth/Register";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      updateUserState()
    }, []);
  
  const updateUserState = () => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }

  const logOut = () => {
    authService.logout();
    setCurrentUser(undefined)
  }

  return(
    <div>
      <Header currentUser={currentUser} logOut={logOut} />
      <Routes>
        <Route index element={ <Feed peeps={peeps} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login updateUserState={updateUserState} />} />
      </Routes>
    </div>
      
  )
}

export default App;
