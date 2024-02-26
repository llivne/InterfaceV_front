import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreateForm from "../components/forms/CreateForm";
import CustomThemeProvider from "../contexts/CustomTheme.context";

describe("CreateForm Component", () => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      type: "text",
      validation: { required: true },
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      validation: { min: 18, max: 100 },
    },
  ];

  it("renders the form with input fields", () => {
    const { getByLabelText } = render(
      <CustomThemeProvider>
        <CreateForm
          columns={columns}
          handleClose={() => {}}
          formHeader="Create Form"
          createData={() => {}}
        />
      </CustomThemeProvider>
    );

    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Age")).toBeInTheDocument();
  });

  it("disables save button if required field is empty", () => {
    const { getByRole } = render(
      <CustomThemeProvider>
        <CreateForm
          columns={columns}
          handleClose={() => {}}
          formHeader="Create Form"
          createData={() => {}}
        />
      </CustomThemeProvider>
    );

    const saveButton = getByRole("button", { name: "Save" });
    expect(saveButton).toBeDisabled();
  });

  it("enables save button if all required fields are filled", () => {
    const { getByLabelText, getByRole } = render(
      <CustomThemeProvider>
        <CreateForm
          columns={columns}
          handleClose={() => {}}
          formHeader="Create Form"
          createData={() => {}}
        />
      </CustomThemeProvider>
    );

    fireEvent.change(getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(getByLabelText("Age"), { target: { value: "25" } });

    const saveButton = getByRole("button", { name: "Save" });
    expect(saveButton).toBeEnabled();
  });

  //   it("displays error message for required field if left empty", () => {
  //     const { getByLabelText, getByText } = render(
  //       <CustomThemeProvider>
  //         <CreateForm
  //           columns={columns}
  //           handleClose={() => {}}
  //           formHeader="Create Form"
  //           createData={() => {}}
  //         />{" "}
  //       </CustomThemeProvider>
  //     );

  //     fireEvent.change(getByLabelText("Name"), { target: { value: "" } });

  //     expect(getByText("Required field")).toBeInTheDocument();
  //   });

  it("displays error message for invalid age input", () => {
    const { getByLabelText, getByText } = render(
      <CustomThemeProvider>
        <CreateForm
          columns={columns}
          handleClose={() => {}}
          formHeader="Create Form"
          createData={() => {}}
        />
      </CustomThemeProvider>
    );

    fireEvent.change(getByLabelText("Age"), { target: { value: "15" } });

    expect(getByText("Can't be less than 18")).toBeInTheDocument();
  });

  it("submits form data when Save button is clicked", () => {
    const createDataMock = jest.fn();
    const handleCloseMock = jest.fn();

    const { getByLabelText, getByRole } = render(
      <CustomThemeProvider>
        <CreateForm
          columns={columns}
          handleClose={handleCloseMock}
          formHeader="Create Form"
          createData={createDataMock}
        />
      </CustomThemeProvider>
    );

    fireEvent.change(getByLabelText("Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByLabelText("Age"), { target: { value: "30" } });

    const saveButton = getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    expect(createDataMock).toHaveBeenCalledWith({
      name: "Jane Doe",
      age: "30",
    });
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
