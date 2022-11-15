import { render, screen } from '@testing-library/react';
import Workout from './Workout';

test('renders learn react link', () => {
  render(<Workout />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
