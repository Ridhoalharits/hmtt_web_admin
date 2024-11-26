import Lab from "@/app/lab/edit/page";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useEffect } from "react";

describe("Lab Page", () => {
  it("Show heading", async () => {
    render(<Lab />);

    await waitFor(() => {
      const header = screen.getByRole("button", { name: /Save/i });
      expect(header).toBeInTheDocument();
    });
  });

  it("button disabled", async () => {
    render(<Lab />);

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /Save/i });
      expect(button).toBeInTheDocument();
    });
  });
});
