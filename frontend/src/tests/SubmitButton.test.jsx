import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmitButton from "../components/SubmitButton";

describe("SubmitButton", () => {
  it("should call the onClick function when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<SubmitButton onClick={onClick} />);

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the onClick function when it isn't clicked", async () => {
    const onClick = vi.fn();
    render(<SubmitButton onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
