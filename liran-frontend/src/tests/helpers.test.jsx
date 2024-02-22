import axios from "axios";
import {
  loginFunc,
  getIconForAppbar,
  getData,
  createData,
  updateData,
  deleteData,
} from "../helpers.js";

// Mock axios
jest.mock("axios");

describe("loginFunc", () => {
  it("fetches data from API and returns result", async () => {
    const mockData = { userId: 1, username: "testUser" };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await loginFunc("http://localhost:5000/login");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/login",
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
    expect(result).toEqual(mockData);
  });

  it("handles errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("Login failed"));

    const result = await loginFunc("http://localhost:5000/login");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/login",
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
    expect(result).toBeUndefined();
  });
});

describe("getIconForAppbar", () => {
  it("returns the correct icon for each place", () => {
    expect(getIconForAppbar(0)).toMatchSnapshot();
    expect(getIconForAppbar(1)).toMatchSnapshot();
    expect(getIconForAppbar(2)).toMatchSnapshot();
    expect(getIconForAppbar(3)).toMatchSnapshot();
    expect(getIconForAppbar(4)).toMatchSnapshot();
    expect(getIconForAppbar(5)).toMatchSnapshot();
    expect(getIconForAppbar(6)).toMatchSnapshot();
    expect(getIconForAppbar(7)).toMatchSnapshot();
    expect(getIconForAppbar(8)).toMatchSnapshot();
    expect(getIconForAppbar(9)).toMatchSnapshot();
  });
});

describe("getData", () => {
  it("fetches data from API and returns result", async () => {
    const mockData = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getData("http://localhost:5000/data");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/data",
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
    expect(result).toEqual(mockData);
  });

  it("handles errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

    await expect(getData("http://localhost:5000/data")).rejects.toThrow(
      "Failed to fetch data"
    );

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/data",
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
  });

  it("posts data to API", async () => {
    const newItem = { id: 1, name: "New Item" };
    axios.post.mockResolvedValueOnce();

    await createData("http://localhost:5000/data", newItem);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/data",
      { new_item: newItem },
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
  });

  it("handles errors gracefully", async () => {
    const newItem = { id: 1, name: "New Item" };
    axios.post.mockRejectedValueOnce(new Error("Failed to create item"));

    await expect(
      createData("http://localhost:5000/data", newItem)
    ).rejects.toThrow("Failed to create item");

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/data",
      { new_item: newItem },
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
  });

  it("updates data on API", async () => {
    const updatedItem = { id: 1, name: "Updated Item" };
    axios.patch.mockResolvedValueOnce();

    await updateData("http://localhost:5000/data/1", updatedItem);

    expect(axios.patch).toHaveBeenCalledWith(
      "http://localhost:5000/data/1",
      { updated_item: updatedItem },
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
  });

  it("handles errors gracefully", async () => {
    const updatedItem = { id: 1, name: "Updated Item" };
    axios.patch.mockRejectedValueOnce(new Error("Failed to update item"));

    await expect(
      updateData("http://localhost:5000/data/1", updatedItem)
    ).rejects.toThrow("Failed to update item");

    expect(axios.patch).toHaveBeenCalledWith(
      "http://localhost:5000/data/1",
      { updated_item: updatedItem },
      { withCredentials: true },
      expect.objectContaining({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      })
    );
  });

  it("deletes data on API", async () => {
    axios.delete.mockResolvedValueOnce();

    await deleteData("http://localhost:5000/data/1");

    expect(axios.delete).toHaveBeenCalledWith("http://localhost:5000/data/1", {
      withCredentials: true,
    });
  });

  it("handles errors gracefully", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Failed to delete item"));

    await expect(deleteData("http://localhost:5000/data/1")).rejects.toThrow(
      "Failed to delete item"
    );

    expect(axios.delete).toHaveBeenCalledWith("http://localhost:5000/data/1", {
      withCredentials: true,
    });
  });
});
