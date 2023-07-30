import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../colors";

export default function FloatingButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.button}
    >
      <Ionicons size={40} color={"white"} name={"add-sharp"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: colors.primary,
  },
});
