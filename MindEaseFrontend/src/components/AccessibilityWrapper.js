import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccessibilityWrapper = ({
  children,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  ...props
}) => {
  return (
    <View
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      {...props}
    >
      {children}
    </View>
  );
};

export default AccessibilityWrapper;
