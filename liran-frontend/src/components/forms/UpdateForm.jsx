import React, { useState } from "react";
import { Typography, TextField, Box, Fab } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CustomThemeContext } from "../../contexts/CustomTheme.context";

export default function UpdateForm({
  columns,
  handleClose,
  formHeader,
  updateData,
  rowEdited,
}) {
  const { theme } = React.useContext(CustomThemeContext);

  const [updatedItem, setUpdatedItem] = useState(rowEdited.row);
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(false);

  const [validationRules, setValidationRules] = useState(() => {
    let result = {};

    for (const [fieldName, _] of Object.entries(rowEdited.row)) {
      const columnValidRules = columns.find(
        (col) => col.field === fieldName
      ).validation;

      result = {
        ...result,
        [fieldName]: { ...columnValidRules, error: false, errorMessage: "" },
      };
    }

    return result;
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    const updateState = (prevState) => {
      return { ...prevState, [name]: value };
    };
    setUpdatedItem(updateState);

    validate(name, value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateData(updatedItem);

    handleClose();
  };

  function validate(name, value) {
    const isRequired = validationRules[name].required;
    const hasMin = validationRules[name].min;
    const hasMax = validationRules[name].max !== null;
    const hasViki = validationRules[name].viki;

    if (isRequired && value === "") {
      validationRules[name].error = true;
      validationRules[name].errorMessage = `Required field`;
      setIsSaveBtnDisabled(true);
      return;
    }

    if (hasMin) {
      if (+value < validationRules[name].min) {
        validationRules[name].error = true;
        validationRules[
          name
        ].errorMessage = `Can't be less than ${validationRules[name].min}`;
        setIsSaveBtnDisabled(true);
        return;
      } else {
        validationRules[name].error = false;
        validationRules[name].errorMessage = ``;
        setIsSaveBtnDisabled(false);
      }
    }

    if (hasMax) {
      if (+value > validationRules[name].max) {
        validationRules[name].error = true;
        validationRules[
          name
        ].errorMessage = `Can't be more than ${validationRules[name].max}`;
        setIsSaveBtnDisabled(true);
        return;
      } else {
        validationRules[name].error = false;
        validationRules[name].errorMessage = ``;
        setIsSaveBtnDisabled(false);
      }
    }

    if (hasViki) {
      if (+value % validationRules[name].viki === 0) {
        validationRules[name].error = true;
        validationRules[
          name
        ].errorMessage = `${name} can't be divided by ${validationRules[name].viki} without remainder`;
        setIsSaveBtnDisabled(true);
        return;
      } else {
        validationRules[name].error = false;
        validationRules[name].errorMessage = ``;
        setIsSaveBtnDisabled(false);
      }
    }
  }

  const createInputField = (col, fieldKey, fieldType) => {
    const isRequired = col.validation.required;

    return (
      <TextField
        sx={{ minWidth: "500px" }}
        onChange={handleChange}
        id={fieldKey}
        value={updatedItem[fieldKey]}
        name={fieldKey}
        type={fieldType}
        label={col.headerName}
        autoComplete="off"
        required={isRequired}
        error={validationRules[col.field]?.error}
        helperText={validationRules[col.field]?.errorMessage}
      />
    );
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
        {updatedItem &&
          React.Children.toArray(
            columns.map((col, idx) => {
              if (col.field === "id" || col.field === "actions") {
                return <></>;
              } else {
                const fieldKey = col.field;
                const fieldType = col?.type === "number" ? "number" : "text";
                return createInputField(col, fieldKey, fieldType);
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
              color="mainPalette"
              sx={{ width: "20%", borderRadius: "5px", margin: "10px" }}
              disabled={isSaveBtnDisabled}
            >
              Save
            </Fab>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Fab
              onClick={() => handleClose()}
              variant="extended"
              color="mainPalette"
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
