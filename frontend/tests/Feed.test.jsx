import { render, screen, act } from "@testing-library/react";
import { Feed } from "../src/components/feed/Feed.jsx";
import { getPeeps } from "../src/services/peeps.service.js";
import { vi } from "vitest";
vi.mock(`../src/services/peeps.service`);

describe("Feed tests", () => {
  it("should render all the peeps", async () => {
    // Arrange
    getPeeps.mockReturnValue(
      Promise.resolve({
        peepData: [
          {
            _id: "5c9e51c24c6ee53ff09d5d03",
            userId: `1c9e51c24c6ee53ff09d5d03`,
            content: "Peep peep from Mario",
            name: `Mario Mario`,
            username: `Mario1`,
            date: "2016-02-06T20:20:13Z",
          },
          {
            _id: `5c9e51c24c6ee53ff09d5d02`,
            userId: `1c9e51c24c6ee53ff09d5d02`,
            content: "Peep peep from Barbie",
            name: `Barbie Doll`,
            username: `Barbie1`,
            date: "2015-09-10T08:43:00Z",
          },
        ],
      }),
    );
    await act(() => {
      render(<Feed />);
    });
    // Act
    // Assert
    const peep1 = screen.getByText(/Peep peep from Mario/i);
    const peep2 = screen.getByText(/Peep peep from Barbie/i);
    expect(peep1).toBeInTheDocument();
    expect(peep2).toBeInTheDocument();
  });
});
