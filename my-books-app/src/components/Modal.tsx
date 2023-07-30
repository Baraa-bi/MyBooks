import AnimatedLottieView from "lottie-react-native";
import React from "react";
import {
  useAppContextActions,
  useAppContextValue,
} from "../lib/contexts/AppContext";
import RnModal from "react-native-modal";
import { StyleSheet, View } from "react-native";
import AppButton from "./AppButton";
import AppText from "./AppText";
import { colors } from "../../colors";

const Modal = () => {
  const { modalInfo } = useAppContextValue();
  const { setModalInfo } = useAppContextActions();
  if (modalInfo)
    return (
      <RnModal
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        onDismiss={() => setModalInfo(null)}
        isVisible={!!modalInfo}
      >
        <View style={styles.container}>
          <View>
            <AnimatedLottieView
              autoPlay
              loop={false}
              style={styles.lottie}
              source={modalInfo.animation}
            />
          </View>
          <AppText style={styles.title}>{modalInfo?.title}</AppText>
          {!!modalInfo?.text && (
            <AppText style={styles.text}>{modalInfo?.text}</AppText>
          )}
          <AppButton
            onPress={modalInfo.onPress}
            title={modalInfo?.buttonTitle}
          />
        </View>
      </RnModal>
    );
  return null;
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    backgroundColor: colors.foreground,
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
  },
  lottie: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 25,
    textTransform: "capitalize",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 35,
  },
});
