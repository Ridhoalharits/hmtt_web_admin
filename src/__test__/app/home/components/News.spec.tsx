import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import News from "@/app/home/components/News";
import { ScanEye } from "lucide-react";

describe("Testing News Component", () => {
  it("should success input", () => {
    render(<News />);
    const openDialog = screen.getByRole("button", { name: "Add News" });
    fireEvent.click(openDialog);
    const input = screen.getByPlaceholderText("title");
    fireEvent.change(input, { target: { value: "New Title" } });

    expect(input).toHaveValue("New Title");
  });

  it("should open dialog", () => {
    render(<News />);
    const openDialog = screen.getByRole("button", { name: "Add News" });
    fireEvent.click(openDialog);
    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
  });
  it("should not open dialog", () => {
    render(<News />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("check mock should be 1", async () => {
    // Step 1: Mock the function
    const deliverLetter = jest.fn();

    // Step 2: Simulate calling the mock function
    deliverLetter("Alice");
    deliverLetter.mockResolvedValueOnce({ data: 20 });

    // Step 3: Verify what happened
    expect(deliverLetter).toHaveBeenCalledWith("Alice");
    expect(deliverLetter).toHaveBeenCalledTimes(1);
  });
});
