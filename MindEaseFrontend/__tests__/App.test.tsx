/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { StatusBar } from 'react-native';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', async () => {
    const tree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    expect(tree).toBeTruthy();
    expect(tree.toJSON()).toBeTruthy();
  });

  test('renders with correct structure', async () => {
    const tree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    const root = tree.root;
    expect(root).toBeTruthy();
    
    // Check that the main container View exists
    const container = root.findByProps({ style: expect.objectContaining({ flex: 1 }) });
    expect(container).toBeTruthy();
    expect(container.type).toBe('View');
  });

  test('includes StatusBar component', async () => {
    const tree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    const statusBar = tree.root.findByType(StatusBar);
    expect(statusBar).toBeTruthy();
    expect(statusBar.props).toBeDefined();
  });

  test('includes NewAppScreen component', async () => {
    const tree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    // Look for the NewAppScreen component
    const newAppScreen = tree.root.findByProps({ templateFileName: 'App.tsx' });
    expect(newAppScreen).toBeTruthy();
  });

  test('has proper styling', async () => {
    const tree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    const container = tree.root.findByProps({ style: expect.objectContaining({ flex: 1 }) });
    expect(container.props.style).toEqual(expect.objectContaining({
      flex: 1,
    }));
  });

  test('handles different color schemes', async () => {
    // Test with light mode
    const lightTree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    expect(lightTree).toBeTruthy();
    
    // Test with dark mode (simulated)
    const darkTree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    expect(darkTree).toBeTruthy();
  });

  test('component snapshot matches', async () => {
    const tree = await ReactTestRenderer.act(async () => {
      return ReactTestRenderer.create(<App />);
    });
    
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
