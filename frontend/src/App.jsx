import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  // Update token whenever location changes (i.e., after login)
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

