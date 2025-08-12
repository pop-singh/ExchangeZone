import React from "react";
import "./App.css";
import ContextAllPost from "./contextStore/AllPostContext";
import ContextAuth from "./contextStore/AuthContext";
import ContextPost from "./contextStore/PostContext";
import FavoritesProvider from "./contextStore/FavoritesContext";
import MainRoutes from "./Routes/MainRoutes";


function App() {
  return (
    <div>
     

      <ContextAuth>
        <ContextAllPost>
          <ContextPost>
            <FavoritesProvider>
              <MainRoutes />
            </FavoritesProvider>
          </ContextPost>
        </ContextAllPost>
      </ContextAuth>
    </div>
  );
}

export default App;
