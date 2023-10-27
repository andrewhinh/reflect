import { render } from "@testing-library/react";
import Header from '../components/Header';

test('should render header correctly', () => {
  const { getByText } = render(<Header />);

  expect(getByText('Project')).toBeInTheDocument();
});
