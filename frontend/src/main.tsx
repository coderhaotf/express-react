import React from "react";
import ReactDOM from "react-dom/client";
import { Index } from "./pages/index";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider, AuthRoute } from "./Auth";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Private } from "./pages/private";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/private"
            element={
              <AuthRoute>
                <Private />
              </AuthRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
