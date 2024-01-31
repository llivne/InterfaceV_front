import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainPage from "../components/MainPage";
import ActionButtons from "../components/helper_components/ActionButtons";

// Mocking the helpers
jest.mock("../helpers", () => ({
  getData: jest.fn(),
  createData: jest.fn(),
  updateData: jest.fn(),
  deleteData: jest.fn(),
}));

const createDataGridMock = ({
  rows = [
    {
      id: 1,
      topicName: "A",
      batchingTime: 5,
      batchingNumber: 35,
    },
    { id: 2, topicName: "B", batchingTime: 25, batchingNumber: 42 },
    { id: 3, topicName: "C", batchingTime: 5, batchingNumber: 45 },
    { id: 4, topicName: "D", batchingTime: 5, batchingNumber: 16 },
    { id: 5, topicName: "E", batchingTime: 5, batchingNumber: null },
    { id: 6, topicName: "F", batchingTime: null, batchingNumber: 150 },
    { id: 7, topicName: "G", batchingTime: 5, batchingNumber: 44 },
  ],
  columns = [
    {
      field: "id",
      headerName: "ID Number",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
    },
    {
      field: "topicName",
      headerName: "Topic name",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
      renderCell: (params) => <strong>{params.value}</strong>,
    },
    {
      field: "batchingTime",
      headerName: "Batching Time (sec)",
      type: "number",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
      restrictions: { min: 1, max: 100, viki: 78 },
    },
    {
      field: "batchingNumber",
      headerName: "Batching Number",
      type: "number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong style={{ fontWeight: "bold" }}>
          {params.colDef.headerName}
        </strong>
      ),
    },
  ],
  onSelectionModelChange,
}) => {
  return (
    <div data-testid="data-mockgrid">
      {/* Rendering rows and columns for testing purposes */}
      {rows.map((row) => (
        <div key={row.id} data-testid={`row-${row.id}`}>
          {columns.map((col) => (
            <div key={col.field}>{row[col.field]}</div>
          ))}
        </div>
      ))}
      {/* Triggering onSelectionModelChange for testing purposes */}
      <button
        onClick={() => onSelectionModelChange({ selectionModel: [1, 2] })}
      >
        Trigger Change
      </button>
    </div>
  );
};

jest.mock("@mui/x-data-grid", () => ({
  __esModule: true,
  ...jest.requireActual("@mui/x-data-grid"), // Use the actual implementation for other exports
  DataGrid: jest.fn(() => createDataGridMock),
}));

describe("MainPage component", () => {
  // Test 1: Renders loading spinner when data is loading
  it("renders loading spinner when data is loading", () => {
    render(<MainPage path="example" columns={[]} />);
    expect(
      screen.getByText("Loading...", { exact: false })
    ).toBeInTheDocument();
  });

  // Test 2: Renders DataGrid when data is loaded
  it("renders DataGrid when data is loaded", async () => {
    render(<MainPage path="example" columns={[]} />);
    // Simulate data loading
    await waitFor(() => {
      expect(
        screen.getByText("Add New ", { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText("Delete Selected ", { exact: false })
      ).toBeInTheDocument();
    });
  });

  // Test 3: Opens create modal on button click
  it("opens create modal on button click", async () => {
    render(<MainPage path="example" columns={[]} />);

    // Await for data to "load" & trigger button click to open create modal
    await waitFor(() => {
      fireEvent.click(screen.getByText(/Add/i));
    });

    // Check if create modal is rendered
    expect(
      screen.getByText("Create New ", { exact: false })
    ).toBeInTheDocument();
  });

  // Test 4: Calls updateData on row update
  // it("calls updateData on row update", async () => {
  //   const updateDataMock = jest.fn();

  //   render(
  //     <MainPage
  //       path="example"
  //       columns={["id", "name", "time", "number", ActionButtons]}
  //     />
  //   );
  //   // Wait for DataGrid to render
  //   await waitFor(() =>
  //     expect(screen.getByTestId("mocked-data-grid")).toBeInTheDocument()
  //   );
  //   // Trigger row update
  //   await waitFor(() => {
  //     fireEvent.click(screen.getByRole("update"));
  //     // fireEvent.click(screen.getByText(/Update/i));
  //   });
  //   // Check if updateData is called
  //   expect(updateDataMock).toHaveBeenCalledWith(
  //     "http://localhost:5000/example",
  //     expect.any(Object)
  //   );
  // });

  // Test 5: Calls deleteData on button click
  // it("calls deleteData on button click", async () => {
  //   render(<MainPage path="example" columns={[]} />);
  //   // Wait for DataGrid to render
  //   await waitFor(() =>
  //     expect(screen.getByTestId("data-grid")).toBeInTheDocument()
  //   );
  //   // Trigger delete button click
  //   fireEvent.click(screen.getByText(/Delete Selected Example/i));
  //   // Check if deleteData is called
  //   expect(deleteData).toHaveBeenCalled();
  // });
});
