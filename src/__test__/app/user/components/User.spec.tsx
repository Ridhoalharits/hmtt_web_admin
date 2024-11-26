import User, { handleUserAction } from "@/app/user/components/User";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Testing the component", () => {
  it("render the name properly", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: true };
    render(<User user={user} />);
    const name = screen.getByText(user.name);
    expect(name).toBeInTheDocument();
  });

  it("render the id properly", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: true };
    render(<User user={user} />);
    const id = screen.getByText(user.id);
    expect(id).toBeInTheDocument();
  });

  it("render the button if user is admin", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: true };
    render(<User user={user} />);
    const buttonedit = screen.getByRole("button", { name: "Edit Button" });
    expect(buttonedit).toHaveTextContent("Edit Button");
  });
  it("render the button if user is admin", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: false };
    render(<User user={user} />);
    const buttonedit = screen.queryByRole("button", { name: "Edit Button" });
    expect(buttonedit).not.toBeInTheDocument();
  });
  it("button should be disabled cause checkbox not checked", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: false };
    render(<User user={user} />);
    const buttonedit = screen.queryByRole("button", { name: "Submit" });
    expect(buttonedit).toBeDisabled();
  });

  it("not checked", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: false };
    render(<User user={user} />);
    const buttonedit = screen.queryByRole("checkbox");
    expect(buttonedit).toBeInTheDocument();
    expect(buttonedit).not.toBeChecked();
  });

  it("button should be disabled cause checkbox not checked", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: false };
    render(<User user={user} />);
    const buttonedit = screen.queryByRole("button", { name: "Submit" });
    expect(buttonedit).toBeDisabled();
  });

  it("button enabled", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: false };
    render(<User user={user} />);
    const checkbox = screen.getByRole("checkbox", { name: "I understand" });
    fireEvent.click(checkbox);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeEnabled();
  });
  it("should return success if submit", () => {
    const user: User = { id: 1, name: "Ridho", isAdmin: false };
    render(<User user={user} />);
    const checkbox = screen.getByRole("checkbox", { name: "I understand" });
    fireEvent.click(checkbox);
    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);
    expect(handleUserAction(user.name, "submitted")).toBe(
      `${user.name} performed submitted`
    );
  });
  it("should return success if submit", () => {
    const user: User = { id: 1, name: null, isAdmin: false };
    render(<User user={user} />);
    const checkbox = screen.getByRole("checkbox", { name: "I understand" });
    fireEvent.click(checkbox);
    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);
    expect(handleUserAction(user.name, "submitted")).toBe(404);
  });
});
