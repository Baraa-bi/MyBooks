// src/screens/AuthScreen.js
import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation } from "@apollo/client";
import { Screens } from "../../config/constants";
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
} from "../../graphql/mutations/auth";
import { storeApiToken } from "../../lib/helpers/helpers";
import { colors } from "../../../colors";
import AuthForm from "./AuthForm";
import AppText from "../../components/AppText";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInDown,
  SlideInUp,
} from "react-native-reanimated";
import useAuth from "../../lib/hooks/useAuth";

export interface User {
  username: string;
  email: string;
  password: string;
}

export default function Auth({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const { updateApiToken } = useAuth();
  const handleAuth = async (user: User) => {
    try {
      if (isLogin) {
        const { data } = await login({
          variables: { username: user.username, password: user.password },
        });
        updateApiToken(data.login.token);
      } else {
        const { data } = await register({
          variables: { user },
        });
        updateApiToken(data.register.token);
      }
      navigation.navigate(Screens.HOME);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isLogin ? "Login" : "Register",
    });
  }, [isLogin]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.container}
        >
          <View style={{ flex: 1 }} />
          <Animated.View 
            layout={Layout.springify()}
            style={styles.content}
          >
            <AuthForm onFormSubmit={handleAuth} isLogin={isLogin} />
          </Animated.View>
          <View style={styles.subContainer}>
            <AppText>
              {isLogin
                ? `Don't have an account? `
                : `Already have an account? `}
            </AppText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsLogin((l) => !l)}
            >
              <AppText style={styles.text}>
                {isLogin ? `Register Now` : `Login`}
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 25,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  input: {
    height: 45,
    borderColor: colors.foreground,
    borderWidth: 1,
    borderRadius: 5,
    color: colors.text,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.primary,
  },
});
