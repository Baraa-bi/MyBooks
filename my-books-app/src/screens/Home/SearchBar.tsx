import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../../colors";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";

export default function SearchBar({
  searchValue,
  onSearchValueChange,
  rightIcon,
  onRightIconPress,
}: {
  searchValue: string;
  onSearchValueChange: (_: string) => void;
  rightIcon: any;
  onRightIconPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={searchValue}
          style={styles.input}
          placeholder="Search for books or authors..."
          onChangeText={onSearchValueChange}
        />
      </View>
      <Animated.View entering={ZoomIn} exiting={ZoomOut}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.rightItem}
          onPress={onRightIconPress}
        >
          <Ionicons size={24} color={"white"} name={rightIcon} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 10,
    paddingBottom: 20,
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: colors.foreground,
    borderRadius: 7,
    padding: 15,
    marginRight: 10,
  },
  rightItem: {
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  input: {
    color: colors.text,
  },
});
