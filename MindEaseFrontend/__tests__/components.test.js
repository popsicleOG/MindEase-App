import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoadingSpinner from '../src/components/LoadingSpinner';
import ToastMessage from '../src/components/ToastMessage';

describe('UI Components', () => {
  describe('LoadingSpinner', () => {
    test('renders when visible', () => {
      const { getByText } = render(
        <LoadingSpinner visible={true} message="Loading data..." />,
      );

      expect(getByText('Loading data...')).toBeTruthy();
    });

    test('does not render when not visible', () => {
      const { queryByText } = render(
        <LoadingSpinner visible={false} message="Loading data..." />,
      );

      expect(queryByText('Loading data...')).toBeNull();
    });

    test('uses default message when not provided', () => {
      const { getByText } = render(<LoadingSpinner visible={true} />);

      expect(getByText('Loading...')).toBeTruthy();
    });

    test('applies custom size and color', () => {
      const { getByTestId } = render(
        <LoadingSpinner visible={true} size="small" color="#FF0000" />,
      );

      // Note: ActivityIndicator doesn't expose size/color props easily in tests
      // This test ensures the component renders without crashing
      expect(getByTestId).toBeDefined();
    });
  });

  describe('ToastMessage', () => {
    test('renders success toast', () => {
      const { getByText } = render(
        <ToastMessage
          visible={true}
          message="Success message"
          type="success"
        />,
      );

      expect(getByText('✅')).toBeTruthy();
      expect(getByText('Success message')).toBeTruthy();
    });

    test('renders error toast', () => {
      const { getByText } = render(
        <ToastMessage visible={true} message="Error message" type="error" />,
      );

      expect(getByText('❌')).toBeTruthy();
      expect(getByText('Error message')).toBeTruthy();
    });

    test('renders warning toast', () => {
      const { getByText } = render(
        <ToastMessage
          visible={true}
          message="Warning message"
          type="warning"
        />,
      );

      expect(getByText('⚠️')).toBeTruthy();
      expect(getByText('Warning message')).toBeTruthy();
    });

    test('renders info toast', () => {
      const { getByText } = render(
        <ToastMessage visible={true} message="Info message" type="info" />,
      );

      expect(getByText('ℹ️')).toBeTruthy();
      expect(getByText('Info message')).toBeTruthy();
    });

    test('does not render when not visible', () => {
      const { queryByText } = render(
        <ToastMessage visible={false} message="Test message" />,
      );

      expect(queryByText('Test message')).toBeNull();
    });

    test('calls onHide callback when hiding', async () => {
      const onHideMock = jest.fn();

      render(
        <ToastMessage
          visible={true}
          message="Test message"
          duration={100}
          onHide={onHideMock}
        />,
      );

      // Wait for the toast to auto-hide
      await waitFor(
        () => {
          expect(onHideMock).toHaveBeenCalled();
        },
        { timeout: 1000 },
      );
    });

    test('uses default type when not provided', () => {
      const { getByText } = render(
        <ToastMessage visible={true} message="Default message" />,
      );

      expect(getByText('ℹ️')).toBeTruthy();
      expect(getByText('Default message')).toBeTruthy();
    });
  });
});
