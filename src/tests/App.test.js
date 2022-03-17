import { render, screen } from '@testing-library/react';
import App from '../App';

test('render searchbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/search/i);
  expect(linkElement).toBeInTheDocument();
});

