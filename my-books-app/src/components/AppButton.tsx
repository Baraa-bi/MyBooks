import React from "react";
import { colors } from "../../colors";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
  buttonStyle?: Object;
}

export default function AppButton({ onPress, title, buttonStyle }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, buttonStyle]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "600",
    color: "white",
  },
});
