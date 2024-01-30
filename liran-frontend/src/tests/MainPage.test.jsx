import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import MainPage from "../components/MainPage";

// Mocking the helpers
jest.mock("../helpers", () => ({
  getData: jest.fn(),
  createData: jest.fn(),
  updateData: jest.fn(),
  deleteData: jest.fn(),
}));

// Mocking the DataGrid component
jest.mock("@mui/x-data-grid", () => ({
  DataGrid: jest.fn(({ rows, columns, onRowModesModelChange }) => {
    return (
      <div>
        <div data-testid="data-mockgrid">
          {/* Rendering rows and columns for testing purposes */}
          {rows.map((row) => (
            <div key={row.id} data-testid={`row-${row.id}`}>
              {columns.map((col) => (
                <div key={col.field}>{row[col.field]}</div>
              ))}
            </div>
          ))}
          {/* Triggering onRowModesModelChange for testing purposes */}
          <button onClick={() => onRowModesModelChange({ row: rows[0] })}>
            Trigger Change
          </button>
        </div>
      </div>
    );
  }),
  // ...any other exports used from DataGrid
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

  /*
  // Test 4: Calls updateData on row update
  it("calls updateData on row update", async () => {
    render(<MainPage path="example" columns={[]} />);
    // Wait for DataGrid to render
    await waitFor(() =>
      expect(screen.getByTestId("data-grid")).toBeInTheDocument()
    );
    // Trigger row update
    fireEvent.click(screen.getByText("Trigger Change"));
    // Check if updateData is called
    expect(updateData).toHaveBeenCalledWith(
      "http://localhost:5000/example",
      expect.any(Object)
    );
  });
  */

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
