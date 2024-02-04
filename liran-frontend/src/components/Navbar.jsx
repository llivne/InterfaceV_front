import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { getIconForAppbar } from "../helpers.js";

const drawerWidth = 250;
// now hardcoded but probably should be extracted from backend dynamically
const menuItems = [
  "Topics",
  "Devices",
  "Manufactors",
  "Storages",
  "Ext Brokers",
  "Passwords",
  "System Preferences",
  "Engines",
  "Logout",
];

export default function Navbar({ navHeader }) {
  return (
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
          <Typography variant="h4">{navHeader}</Typography>
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
                to={`${submenuName.at(0).toLowerCase()}${submenuName.slice(1)}`}
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
  );
}
