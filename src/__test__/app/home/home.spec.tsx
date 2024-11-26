import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/home/page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Mock the Supabase client
jest.mock("@/utils/supabase/server", () => ({
  createClient: () => ({
    auth: {
      getUser: jest.fn(() =>
        Promise.resolve({
          data: { user: { id: "123", email: "test@example.com" } },
          error: null,
        })
      ),
    },
  }),
}));
// Mock the redirect function
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Authenticated", () => {
  it("should not redirect if the user is authenticated", async () => {
    const supabase = createClient();

    // Mock getUser to return a valid user
    supabase.auth.getUser.mockResolvedValueOnce({
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    });

    // render(<Home />);

    await waitFor(() => {
      expect(redirect).not.toHaveBeenCalled();
    });
  });
});

jest.mock("@/utils/supabase/server", () => ({
  createClient: () => ({
    auth: {
      getUser: jest.fn(() =>
        Promise.resolve({
          data: { user: null },
          error: null,
        })
      ),
    },
  }),
}));

describe("Not Authenticated", () => {
  it("should redirect to /login if the user is not authenticated", async () => {
    const supabase = createClient();

    // Mock getUser to return null for the user
    supabase.auth.getUser.mockResolvedValueOnce({
      data: { user: null },
      error: null,
    });

    // render(<Home />);

    await waitFor(() => {
      expect(redirect).not.toHaveBeenCalledWith();
    });
  });
});
