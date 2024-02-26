import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainPage from "../components/MainPage";
import AuthProvider from "../contexts/Auth.context";
import CustomThemeProvider from "../contexts/CustomTheme.context";

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
    { id: 2, topicName: "B", batchingTime: 25, batchingNumber: null },
    { id: 3, topicName: "C", batchingTime: null, batchingNumber: 45 },
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
  DataGrid: jest.fn(() => createDataGridMock),
}));

describe("MainPage component", () => {
  it("renders loading spinner when data is loading", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CustomThemeProvider>
            <MainPage path="example" columns={[]} />
          </CustomThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(
      screen.getByText("Loading...", { exact: false })
    ).toBeInTheDocument();
  });

  it("renders DataGrid when data is loaded", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CustomThemeProvider>
            <MainPage path="example" columns={[]} />
          </CustomThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    );
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

  it("opens create modal on button click", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CustomThemeProvider>
            <MainPage path="example" columns={[]} />
          </CustomThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Await for data to "load" & trigger button click to open create modal
    await waitFor(() => {
      fireEvent.click(screen.getByText(/Add/i));
    });

    // Check if create modal is rendered
    expect(
      screen.getByText("Create New ", { exact: false })
    ).toBeInTheDocument();
  });
});
