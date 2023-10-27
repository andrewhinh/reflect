import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RandomGif from "../components/RandomGif";

describe("RandomGif", () => {
  test("renders 'Loading...' initially", async () => {
    render(<RandomGif />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders image after fetching", async () => {
    render(<RandomGif />);
    await screen.findByAltText("Random Gif");
  });

  test("changes tag on input change", async () => {
    render(<RandomGif />);
    const tagInput = screen.getByLabelText("Tag");
    await userEvent.clear(tagInput);
    await userEvent.type(tagInput, "cat");
    expect(tagInput.value).toBe("cat");
  });

  test("changes rating on button click", async () => {
    render(<RandomGif />);
    const ratingButton = screen.getByRole("button", { name: "PG" });
    await userEvent.click(ratingButton);
    expect(screen.getAllByText("PG").length).toBe(2); // 1 for button, 1 for display
  });

  test("submit button fetches new gif", async () => {
    render(<RandomGif />);
    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);
    await screen.findByAltText("Random Gif");
  });
});
