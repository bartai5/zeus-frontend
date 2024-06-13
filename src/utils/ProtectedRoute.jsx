import { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./Constants";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requireAdmin }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const authorization = async () => {
      try {
        await auth();
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    authorization();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await AxiosInstance.get("/api/token/refresh", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        await auth();
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExp = decoded.exp;
    const currentTime = Date.now() / 1000;
    if (tokenExp < currentTime) {
      await refreshToken();
    } else {
      const user = JSON.parse(localStorage.getItem("userDetails"));
      if (user && user.is_staff) {
        setIsAdmin(true);
      }
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
