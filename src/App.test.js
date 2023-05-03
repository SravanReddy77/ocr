import { render, screen } from '@testing-library/react';
import App from './App';
import Recognition from './Recognition';
import PreprocessImage from './Preprocess';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('check image file type', () => {

render(<Recognition />)

})

test ('check css', () => {

  render(<App />)

})

test('check index', () => {

  render(<index />)
  
})

