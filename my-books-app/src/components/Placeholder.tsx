import React from "react";
import AppText from "./AppText";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image"; 

interface Props {
  title: string;
  text?: string;
  animation?: any;
  image?: any;
}

export default function Placeholder(props: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          contentFit="contain"
          style={styles.lottie}
          source={props.image}
          tintColor={"#e11d48"}
        />
      </View>
      <AppText style={styles.title}>{props.title}</AppText>
      <AppText style={styles.text}>{props?.text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  lottie: {
    width: 200,
    height: 150,
    marginBottom: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    textTransform: "capitalize",
    textAlign: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 35,
  },
});
