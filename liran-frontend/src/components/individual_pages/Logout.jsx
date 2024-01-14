import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../helper_components/LoadingSpinner";

export default function Logout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(false);
    navigate("/topics", { replace: true });
  }, []);

  return <LoadingSpinner />;
}
