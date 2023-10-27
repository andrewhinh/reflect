import { render, screen } from "@testing-library/react";
import HomePage from "../components/HomePage";

describe("HomePage", () => {
  test("renders RandomGif component", () => {
    render(<HomePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders FunFact component", () => {
    render(<HomePage />);
    expect(screen.getByText("Did you know?")).toBeInTheDocument();
    expect(
      screen.getByText("Something is in the works...")
    ).toBeInTheDocument();
  });
});
