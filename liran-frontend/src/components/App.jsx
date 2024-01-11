import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  CssBaseline,
  AppBar,
  Typography,
} from "@mui/material";

//👇🏻 React-Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getIconForAppbar } from "../helpers.js";
import StartPage from "./StartPage";
import Topics from "./individual_pages/Topics.jsx";
import Devices from "./individual_pages/Devices.jsx";
import Manufactors from "./individual_pages/Manufacturers.jsx";

import "../styles/App.css";

const drawerWidth = 250;
const menuItems = [
  "Topics",
  "Devices",
  "Manufactors",
  "Storages",
  "Ext Brokers",
  "Passwords",
  "System Preferences",
  "Engines",
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // authentication to be implemented
  const [toolbarText, setToolbarText] = useState("");

  return (
    <div className="App">
      {!isAuthenticated ? (
        <StartPage />
      ) : (
        <>
          <div>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
              }}
            >
              <Toolbar sx={{ backgroundColor: "#3B3486", height: "4.5rem" }}>
                <Typography variant="h4">{toolbarText}</Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Toolbar />

              <List>
                {menuItems.map((submenuName, index) => (
                  <>
                    <ListItem
                      key={Math.random() * Math.random()}
                      component={Link}
                      disablePadding
                      to={`${submenuName
                        .at(0)
                        .toLowerCase()}${submenuName.slice(1)}`}
                    >
                      <ListItemButton>
                        <ListItemIcon>{getIconForAppbar(index)}</ListItemIcon>
                        <ListItemText
                          primary={submenuName}
                          sx={{ color: "#3B3486", marginLeft: "-10px" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </>
                ))}
              </List>
            </Drawer>
          </div>
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
            </Routes>
            <ToastContainer />{" "}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
