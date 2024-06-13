import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from "./pages/home/Home";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import PropertyDescription from "./pages/property-description/PropertyDescription";
import AccountMgmt from "./pages/account-mgmt/AccountManagement";
import Dashboard from "./pages/dashboard/Dashboard";
import UserListingCreate from "./pages/user listing/UserListingCreate";

function App() {
  const Logout = () => {
    localStorage.clear();
    return <Navigate to="/login" />;
  };

  const RegisterAndLogout = () => {
    localStorage.clear();
    return <Register />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property/:slug"
          element={
            <ProtectedRoute>
              <PropertyDescription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id/"
          element={
            <ProtectedRoute>
              <AccountMgmt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-listing"
          element={
            <ProtectedRoute>
              <UserListingCreate />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
