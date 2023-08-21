import { render, screen } from "@testing-library/react";
import { Peep } from "../src/components/peep/Peep.jsx";

describe("Peep tests", () => {
  it("should render the peep", () => {
    // Arrange
    const mockPeep = {
      userId: `5c9e51c24c6ee53ff09d5d03`,
      content: "Peep peep from Mario",
      name: `Mario Mario`,
      username: `Mario1`,
      date: "2016-02-06T20:20:13Z",
    };
    // Act
    render(<Peep peep={mockPeep} />);
    //Assert
    expect(screen.queryByText(/Peep peep from Mario/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mario1/i)).toBeInTheDocument();
    expect(screen.queryByText(/content/i)).not.toBeInTheDocument();
  });
});
