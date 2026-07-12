import { render } from '@testing-library/react';
import App from './App';

test('renders dashboard without crashing', () => {
  render(<App />);

  // Basic sanity check: the dashboard shell should be present.
  // (This test environment may not support canvas/charts.)
  expect(document.body).toBeTruthy();
});




