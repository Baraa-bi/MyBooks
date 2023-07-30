import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import { colors } from "../../colors";

export default function AppText({ style, children, ...props }: TextProps) {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
});
