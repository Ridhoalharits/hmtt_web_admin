import "@testing-library/dom";
import { getNews } from "@/app/home/actions";
import { createClient } from "@/utils/supabase/server";

jest.mock("@/utils/supabase/server", () => ({
  createClient: () => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() =>
          Promise.resolve({
            data: [
              { id: 1, title: "News 1", isActive: true },
              { id: 2, title: "News 2", isActive: true },
            ],
            error: null,
          })
        ),
      })),
    })),
  }),
}));

const mockData = [
  { id: 1, title: "News 1", isActive: true },
  { id: 2, title: "News 2", isActive: true },
];
describe("getNews", () => {
  it("should return the correct length of the data", async () => {
    const data = await getNews();
    expect(data).toHaveLength(mockData.length);
  });
});
