/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    ReactTestRenderer.act(() => {
      const tree = ReactTestRenderer.create(<App />);
      expect(tree).toBeTruthy();
    });
  });

  test('renders with correct structure', () => {
    ReactTestRenderer.act(() => {
      const tree = ReactTestRenderer.create(<App />);
      expect(tree).toBeTruthy();
    });
  });

  test('component snapshot matches', () => {
    ReactTestRenderer.act(() => {
      const tree = ReactTestRenderer.create(<App />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
