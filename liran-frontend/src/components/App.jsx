import React, { useState, memo } from "react";
import { Routes, Route } from "react-router-dom";

//👇🏻 React-Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar.jsx";
import StartPage from "./StartPage";
import Topics from "./individual_pages/Topics.jsx";
import Devices from "./individual_pages/Devices.jsx";
import Manufactors from "./individual_pages/Manufacturers.jsx";
import Logout from "./individual_pages/Logout.jsx";

import { login } from "../helpers.js";
import "../styles/App.css";

export default memo(function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // authentication to be implemented
  const [toolbarText, setToolbarText] = useState("");

  return (
    <div className="App">
      {!isAuthenticated ? (
        <StartPage login={login} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          <Navbar navHeader={toolbarText}/>
          <div className="MainPage">
            <Routes>
              <Route
                path="/topics"
                element={<Topics setToolbarText={setToolbarText} />}
              />
              <Route
                path="/devices"
                element={<Devices setToolbarText={setToolbarText} />}
              />
              <Route
                path="/manufactors"
                element={<Manufactors setToolbarText={setToolbarText} />}
              />
              <Route
                path="/logout"
                element={<Logout setIsAuthenticated={setIsAuthenticated} />}
              />
            </Routes>
            <ToastContainer />{" "}
          </div>
        </>
      )}
    </div>
  );
});
