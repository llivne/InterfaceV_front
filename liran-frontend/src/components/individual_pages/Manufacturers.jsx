import React, { useEffect } from "react";
import MainPage from "../MainPage";

export default function Manufactors({ setToolbarText }) {
  useEffect(() => {
    setToolbarText("Manufactors");
  }, []);

  return <h1>This is Manufacturs page</h1>;
}
