import React, { useEffect, useState } from "react";
import { Typography, TextField, Box, Fab } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

export default function UpdateForm({
  theme,
  columns,
  handleClose,
  formHeader,
  updateData,
  rowEdited,
}) {
  const [updatedItem, setUpdatedItem] = useState(rowEdited.row);
  const [validationState, setValidationState] = useState();
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(false);

  useEffect(() => {
    const initValidation = columns.map((col) => {
      const validationStateForField = {
        name: col["field"],
        isError: false,
        errorMsg: "",
      };
      return validationStateForField;
    });

    setValidationState(initValidation);
  }, []);

  const markAsFailedValidation = (validationObject, errorMsg) => {
    validationObject.isError = true;
    validationObject.errorMsg = errorMsg;
    setValidationState(validationState);
    setIsSaveBtnDisabled(true);
    return false;
  };

  const markAsPassedValidation = (validationObject) => {
    validationObject.isError = false;
    validationObject.errorMsg = "";
    setValidationState(validationState);
    setIsSaveBtnDisabled(false);
    return true;
  };

  const validate = (event) => {
    const validationObject = validationState.find((validationItem) => {
      return validationItem.name === event.name;
    });

    // event.type, event.name

    const isRequiredAndEmpty = event.required && event.value.length === 0;
    const isRequiredNotEmpty = event.required && event.value.length !== 0;

    const isNegativeNumber = event.type === "number" && Number(event.value) < 0;
    const isPositiveNumber =
      event.type === "number" && Number(event.value) >= 0;

    const min = Number(event.min);
    const max = Number(event.max);

    if (isRequiredAndEmpty) {
      return markAsFailedValidation(
        validationObject,
        "This field is mandatory"
      );
    }

    if (isNegativeNumber) {
      return markAsFailedValidation(
        validationObject,
        "Only positive numbers are allowed"
      );
    }

    if (min && Number(event.value) < min) {
      return markAsFailedValidation(
        validationObject,
        `The number can't be less than ${min}`
      );
    }

    if (max && Number(event.value) > max) {
      return markAsFailedValidation(
        validationObject,
        `The number can't be bigger than ${max}`
      );
    }

    if (isPositiveNumber) {
      return markAsPassedValidation(validationObject);
    }

    if (isRequiredNotEmpty) {
      return markAsPassedValidation(validationObject);
    }

    return true;
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    console.log(event.target.value);

    const updateState = (prevState) => {
      return { ...prevState, [name]: value };
    };
    setUpdatedItem(updateState);

    const isValidated = validate(event.target);
    if (!isValidated) return;
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateData(updatedItem);

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
        {updatedItem &&
          validationState &&
          React.Children.toArray(
            columns.map((col, idx) => {
              if (col.field === "id" || col.field === "actions") {
                return <></>;
              } else {
                const fieldKey = col.field;
                const fieldType = col?.type === "number" ? "number" : "text";
       
                return (
                  <TextField
                    error={validationState[idx].isError}
                    helperText={validationState[idx].errorMsg}
                    onChange={handleChange}
                    sx={{ minWidth: "500px" }}
                    id={fieldKey}
                    value={updatedItem[fieldKey]}
                    name={fieldKey}
                    type={fieldType}
                    inputProps={col.restrictions}
                    // custom={restrictions} // Ensure the input is not less than 0
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
              disabled={isSaveBtnDisabled}
            >
              Save
            </Fab>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Fab
              onClick={() => handleClose()}
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
