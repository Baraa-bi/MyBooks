import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../../../colors";
import { Controller, useForm } from "react-hook-form";
import AppButton from "../../components/AppButton";
import { User } from "./Auth";
import { Image } from "expo-image";

const registerSchema = Yup.object({
  username: Yup.string().required("User Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Passowrd should be at least 6 characters"),
});

const loginSchema = Yup.object({
  username: Yup.string().required("UserName is required"),
  email: Yup.string().default(""),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Passowrd should be at least 6 characters"),
});

export default function AuthForm({
  isLogin,
  onFormSubmit,
}: {
  isLogin: boolean;
  onFormSubmit: (user: User) => any;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = handleSubmit((data: User) => {
    onFormSubmit(data);
  });

  return (
    <View style={styles.container}>
      <Image
        transition={1000}
        style={styles.logo}
        source={require("../../../assets/icon.png")}
      />

      <View style={styles.inputContainer}>
        <Controller
          name={"username"}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              placeholder={"Username"}
              style={styles.input}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.username && (
        <Text style={styles.error}>{errors.username?.message}</Text>
      )}
      {!isLogin && (
        <>
          <View style={styles.inputContainer}>
            <Controller
              name={"email"}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  placeholder={"Example@gmail.com"}
                  style={styles.input}
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
              )}
            />
          </View>
          {errors.email && (
            <Text style={styles.error}>{errors.email?.message}</Text>
          )}
        </>
      )}
      <View style={styles.inputContainer}>
        <Controller
          name={"password"}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              secureTextEntry
              style={styles.input}
              onChangeText={onChange}
              placeholder={"Password"}
            />
          )}
        />
      </View>
      {errors.password && (
        <Text style={styles.error}>{errors.password?.message}</Text>
      )}
      <AppButton
        onPress={onSubmit}
        buttonStyle={styles.button}
        title={isLogin ? "Login" : "Register Now"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  inputContainer: {
    backgroundColor: colors.foreground,
    marginVertical: 10,
    borderRadius: 10,
  },
  imageContainer: {
    padding: 35,
    margin: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.foreground,
  },
  image: {
    flex: 1,
    height: 250,
  },
  input: { 
    borderColor: colors.foreground,
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    color: colors.text,
    paddingHorizontal: 8,
  },
  error: {
    color: colors.primary,
    marginBottom: 10,
  },
  label: {
    color: colors.text,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  button: {
    marginTop: 10,
  },
});
