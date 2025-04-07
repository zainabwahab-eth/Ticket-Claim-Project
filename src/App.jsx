import React, { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Landing from "./components/Landing";
import NotEligible from "./components/NotEligible";
import Form from "./components/Form";
import Header from "./components/Header";
import Checking from "./components/Checking";
import admin from "./components/Checking";

export const WalletContext = createContext();
function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isEligible, setIsEligible] = useState(null);
  const [isChecking, setIsChecking] = useState(null);

  return (
    <>
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
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />

            {/* <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            /> */}

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
          </Routes>
        </div>
      </WalletContext.Provider>
    </>
  );
}

export default App;
