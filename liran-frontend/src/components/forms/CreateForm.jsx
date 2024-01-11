import React, { useEffect, useState } from "react";
import { Typography, TextField, Box, Fab } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";
import { ThemeProvider } from "@mui/material/styles";

export default function CreateForm({
  theme,
  columns,
  handleClose,
  formHeader,
  createData,
}) {
  const [error, setError] = useState("");
  const [newItem, setNewItem] = useState(null);

  useEffect(() => {
    columns.map((col) => {
      if (col.field === "id" || col.field === "actions") {
        return;
      } else {
        setNewItem((prevState) => ({ ...prevState, [col.field]: "" }));
      }
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updateState = (prevState) => {
      return { ...prevState, [name]: value };
    };

    if (event.target?.type === "number" && value < 0) {
      setError("You can't enter a negative value");
      return;
    }
    setError("");

    setNewItem(updateState);
  };
  const handleSave = (event) => {
    event.preventDefault();
    console.log("NEW ITEM", newItem);
    createData(newItem);
    handleClose();
  };

  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: "30px" }}>
        {formHeader}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {newItem &&
          React.Children.toArray(
            columns.map((col) => {
              if (col.field === "id" || col.field === "actions") {
                return <></>;
              } else {
                const fieldKey = col.field;
                const fieldType = col?.type === "number" ? "number" : "text";
                return (
                  <TextField
                    error={!!error && fieldType === "number"}
                    helperText={error}
                    onChange={handleChange}
                    sx={{ minWidth: "500px" }}
                    id={fieldKey}
                    value={newItem[fieldKey]}
                    name={fieldKey}
                    type={fieldType}
                    label={col.headerName}
                    autoComplete="off"
                    required
                  />
                );
              }
            })
          )}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Fab
              onClick={handleSave}
              variant="extended"
              color="actions"
              sx={{ width: "20%", borderRadius: "5px", margin: "10px" }}
            >
              Save
            </Fab>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Fab
              onClick={handleClose}
              variant="extended"
              color="actions"
              sx={{ width: "20%", borderRadius: "5px", margin: "10px" }}
            >
              Cancel
            </Fab>
          </ThemeProvider>
        </div>
      </Box>
    </>
  );
}
