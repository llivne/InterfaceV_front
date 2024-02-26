import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateForm from "../components/forms/CreateForm";
import CustomThemeProvider from "../contexts/CustomTheme.context";

// Mock the createData function
const mockCreateData = jest.fn();

const columns = [
  {
    field: "id",
    headerName: "ID Number",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "topicName",
    headerName: "Topic name",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "batchingTime",
    headerName: "Batching Time (sec)",
    type: "number",
    width: 160,
    align: "center",
    headerAlign: "center",
  },
];

describe("CreateForm", () => {
  it("renders the form with correct fields", () => {
    render(
      <CustomThemeProvider>
        <CreateForm
          columns={columns}
          handleClose={() => {}}
          formHeader="Create Form Header"
          createData={mockCreateData}
        />
      </CustomThemeProvider>
    );

    // Check if form header is rendered
    expect(screen.getByText("Create Form Header")).toBeInTheDocument();

    // Check if form fields are rendered
    expect(screen.getByText("Topic name")).toBeInTheDocument();
    expect(screen.getByText("Batching Time (sec)")).toBeInTheDocument();
  });

  //   it("handles input changes and updates state", () => {
  //     const { getByLabelText } = render(
  //       <CreateForm
  //         theme={theme}
  //         columns={columns}
  //         handleClose={() => {}}
  //         formHeader="Create Form Header"
  //         createData={mockCreateData}
  //       />
  //     );

  //     // Simulate typing in input fields
  //     fireEvent.change(getByLabelText("Topic name"), {
  //       target: { value: "New Topic" },
  //     });
  //     fireEvent.change(screen.getByText("Batching Time (sec)"), {
  //       target: { value: "10" },
  //     });

  //     // Check if state is updated
  //     expect(screen.getByText("Topic name").value).toBe("New Topic");
  //     expect(screen.getByText("Batching Time (sec)").value).toBe("10");
  //   });

  //   it("calls createData with correct data when Save button is clicked", async () => {
  //     const { getByText, getByLabelText } = render(
  //       <CreateForm
  //         theme={theme}
  //         columns={columns}
  //         handleClose={() => {}}
  //         formHeader="Create Form Header"
  //         createData={mockCreateData}
  //       />
  //     );

  //     // Simulate typing in input fields
  //     fireEvent.change(screen.getByText("Topic name"), {
  //       target: { value: "New Topic" },
  //     });
  //     fireEvent.change(screen.getByText("Batching Time (sec)"), {
  //       target: { value: "10" },
  //     });

  //     // Click the Save button
  //     fireEvent.click(screen.getByText("Save"));

  //     // Wait for state update
  //     await act(async () => {});

  //     // Check if createData is called with correct data
  //     expect(mockCreateData).toHaveBeenCalledWith({
  //       topicName: "New Topic",
  //       batchingTime: "10",
  //     });
  //   });
});
