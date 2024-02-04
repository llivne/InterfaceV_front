import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/Auth.context";
import LoadingSpinner from "../helper_components/LoadingSpinner";

export default function Logout() {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  useEffect(() => {
    auth.logout();
    navigate("/topics", { replace: true });
  }, []);

  return <LoadingSpinner />;
}
