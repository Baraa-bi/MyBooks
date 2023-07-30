import React from "react";
import { colors } from "../../colors";
import Lottie from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import { useAppContextValue } from "../lib/contexts/AppContext";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Loading() {
  const { isLoading } = useAppContextValue();
  if (isLoading)
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.container}
      >
        <Lottie
          loop
          autoPlay
          style={styles.lottie}
          source={require("../../assets/animations/loader.json")}
        />
        <View style={styles.backdrop} />
      </Animated.View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  lottie: {
    width: 100,
  },
  text: {
    fontSize: 18,
    opacity: 0.7,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.foreground,
    opacity: 0.9,
    zIndex: -1,
  },
});
