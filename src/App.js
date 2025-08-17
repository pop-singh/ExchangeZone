import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import "./App.css";
import ContextAllPost from "./contextStore/AllPostContext";
import ContextAuth from "./contextStore/AuthContext";
import ContextPost from "./contextStore/PostContext";
import MainRoutes from "./Routes/MainRoutes";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContextAuth>
        <ContextAllPost>
          <ContextPost>
            <MainRoutes />
          </ContextPost>
        </ContextAllPost>
      </ContextAuth>
    </ThemeProvider>
  );
}

export default App;
