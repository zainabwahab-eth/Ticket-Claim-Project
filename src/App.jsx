import React, { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Landing from "./components/Landing";
import NotEligible from "./components/NotEligible";
import Form from "./components/Form";
import Checking from "./components/Checking";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { AuthProvider } from "./components/AuthContext";

export const WalletContext = createContext();

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  return (
    <>
      <AuthProvider>
        <WalletContext.Provider
          value={{
            walletAddress,
            setWalletAddress,
            isEligible,
            setIsEligible,
            isChecking,
            setIsChecking,
          }}
        >
          <div>
            {isChecking ? (
              <Checking isOpen={isChecking} />
            ) : (
              <Checking isOpen={isChecking} />
            )}

            <Routes>
              <Route path="/" element={<Landing />} />

              <Route path="/checking" element={<Checking />} />

              <Route path="/adminLogin" element={<AdminLogin />} />

              <Route
                path="/notEligible"
                element={
                  walletAddress ? (
                    !isEligible ? (
                      <NotEligible />
                    ) : (
                      <Navigate to="/form" />
                    )
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route
                path="/form"
                element={
                  walletAddress ? (
                    isEligible ? (
                      <Form />
                    ) : (
                      <Navigate to="/notEligible" />
                    )
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/adminDashboard"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
          </div>
        </WalletContext.Provider>
      </AuthProvider>
    </>
  );
}

export default App;
