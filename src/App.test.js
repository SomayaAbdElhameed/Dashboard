import { render } from '@testing-library/react';
import App from './App';

test('renders loading skeleton', () => {
  render(<App />);

  // API call is async, so initial render should show skeleton cards.
  const skeletonCards = document.querySelectorAll('.skeleton-card');
  expect(skeletonCards.length).toBeGreaterThan(0);
});



