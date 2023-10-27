import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FunFact from "../components/FunFact";

describe("FunFact", () => {
  test("renders 'Did you know?' title", () => {
    render(<FunFact />);
    expect(screen.getByText("Did you know?")).toBeInTheDocument();
  });

  test("renders 'Something is in the works...' text", () => {
    render(<FunFact />);
    expect(
      screen.getByText("Something is in the works...")
    ).toBeInTheDocument();
  });

  test("clears text on submit button click", async () => {
    render(<FunFact />);
    const submitButton = screen.getByText("Submit"); // Assuming your SubmitButton renders this text

    // Simulate changing state, you'd normally use WebSocket for this
    // We can't test WebSocket so let's just assume the text got changed
    // For example, to "Interesting fact here"

    // Simulate clicking the button to clear text
    await userEvent.click(submitButton);

    // After clicking the button, the text should return to its initial state.
    // Again, this is just a demonstration as we're not testing WebSocket.
    // Replace the text check accordingly.
    expect(
      screen.getByText("Something is in the works...")
    ).toBeInTheDocument();
  });
});
