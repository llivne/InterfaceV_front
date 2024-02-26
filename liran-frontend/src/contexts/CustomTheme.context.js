import React from "react";
import { createTheme } from "@mui/material";

export const CustomThemeContext = React.createContext();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  palette: {
    mainPalette: {
      main: "#58B2EF",
      light: "#3B3486",
      dark: "#3B3486",
      contrastText: "#ffffff",
    },
  },
});

export default function CustomThemeProvider({ children }) {
  return (
    <CustomThemeContext.Provider value={{ theme }}>
      {children}
    </CustomThemeContext.Provider>
  );
}
