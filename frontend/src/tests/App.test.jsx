import { render } from "@testing-library/react";
import App from "../App";
import { it } from "vitest";

describe("App component", () => {
  it("renders matching", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
