import { render } from "@testing-library/react";
import Footer from "../components/Footer";

test("should render footer correctly", () => {
  const { getByText, getByAltText } = render(<Footer />);

  expect(getByText("Made by Andrew Hinh")).toBeInTheDocument();
  expect(getByAltText("Repository Link")).toBeInTheDocument();
  expect(getByAltText("Giphy Logo")).toBeInTheDocument();
});
