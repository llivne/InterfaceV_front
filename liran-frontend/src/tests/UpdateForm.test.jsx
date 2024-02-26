import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UpdateForm from "../components/forms/UpdateForm";
import CustomThemeProvider from "../contexts/CustomTheme.context";

describe("UpdateForm Component", () => {
  const mockedColumns = [
    {
      field: "topic",
      headerName: "Topic",
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

  it("renders form header", () => {
    const { getByText } = render(
      <CustomThemeProvider>
        <UpdateForm
          columns={[]}
          handleClose={() => {}}
          formHeader="Update Form Header"
          updateData={() => {}}
          rowEdited={{ row: {} }}
        />
      </CustomThemeProvider>
    );
    const formHeaderElement = getByText("Update Form Header");
    expect(formHeaderElement).toBeInTheDocument();
  });

  it("renders input fields for each column", () => {
    const columns = [
      { field: "name", headerName: "Name", type: "text", validation: {} },
      { field: "age", headerName: "Age", type: "number", validation: {} },
    ];
    const { getByLabelText } = render(
      <CustomThemeProvider>
        <UpdateForm
          columns={columns}
          handleClose={() => {}}
          formHeader="Update Form"
          updateData={() => {}}
          rowEdited={{ row: { name: "", age: "" } }}
        />
      </CustomThemeProvider>
    );
    const nameInput = getByLabelText("Name");
    const ageInput = getByLabelText("Age");
    expect(nameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
  });

  it("Save button is not disabled initially", () => {
    const { getByText } = render(
      <CustomThemeProvider>
        <UpdateForm
          columns={[]}
          handleClose={() => {}}
          formHeader="Update Form"
          updateData={() => {}}
          rowEdited={{ row: {} }}
        />
      </CustomThemeProvider>
    );
    const saveButton = getByText("Save");
    expect(saveButton).not.toBeDisabled();
  });

  it("renders the form with input fields", () => {
    const { getByLabelText } = render(
      <CustomThemeProvider>
        <UpdateForm
          columns={mockedColumns}
          handleClose={() => {}}
          formHeader="Update Form"
          updateData={() => {}}
          rowEdited={{
            row: {
              topic: "John Doe",
              age: 30,
            },
          }}
        />
      </CustomThemeProvider>
    );

    expect(screen.getByText("Topic")).toBeInTheDocument();
    expect(getByLabelText("Age")).toBeInTheDocument();
  });

  it("displays error message for invalid age input", () => {
    const { getByLabelText, getByText } = render(
      <CustomThemeProvider>
        <UpdateForm
          columns={mockedColumns}
          handleClose={() => {}}
          formHeader="Update Form"
          updateData={() => {}}
          rowEdited={{
            row: {
              topic: "John Doe",
              age: 30,
            },
          }}
        />
      </CustomThemeProvider>
    );

    fireEvent.change(getByLabelText("Age"), { target: { value: "15" } });
    expect(getByText("Can't be less than 18")).toBeInTheDocument();
  });

  it("handleSave function is called on Save button click", () => {
    const handleSaveMock = jest.fn();
    const { getByText } = render(
      <CustomThemeProvider>
        <UpdateForm
          columns={[]}
          handleClose={() => {}}
          formHeader="Update Form"
          updateData={handleSaveMock}
          rowEdited={{ row: {} }}
        />
      </CustomThemeProvider>
    );
    const saveButton = getByText("Save");

    fireEvent.click(saveButton);

    expect(handleSaveMock).toHaveBeenCalledTimes(1);
  });
});
