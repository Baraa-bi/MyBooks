import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../../../colors";
import { Controller, useForm } from "react-hook-form";
import { BookFormFields } from "../../types";
import { Image } from "expo-image";
import AppButton from "../../components/AppButton";

const bookFormSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  image: Yup.string().required("Image is required").url("Invalid URL format"),
  publicationYear: Yup.number()
    .required("Publication year is required")
    .integer("Publication year must be an integer")
    .min(1000, "Invalid publication year"),
});

export default function BookForm({
  bookData,
  onFormSubmit,
}: {
  bookData: BookFormFields;
  onFormSubmit: (book: BookFormFields) => any;
}) {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: bookData,
    resolver: yupResolver(bookFormSchema),
  });

  const watchImage = watch("image");

  const onSubmit = handleSubmit((data: BookFormFields) => {
    onFormSubmit(data);
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            contentFit="contain"
            style={styles.image}
            source={watchImage ?? require("../../../assets/images/book.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            name={"title"}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                placeholder={"Book title"}
                style={styles.input}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        {errors.title && (
          <Text style={styles.error}>{errors.title?.message}</Text>
        )}
        <View style={styles.inputContainer}>
          <Controller
            name={"author"}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                placeholder={"Book author"}
                style={styles.input}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        {errors.author && (
          <Text style={styles.error}>{errors.author?.message}</Text>
        )}
        <View style={styles.inputContainer}>
          <Controller
            name={"image"}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                placeholder={"Book image"}
                style={styles.input}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        {errors.image && (
          <Text style={styles.error}>{errors.image?.message}</Text>
        )}
        <View style={styles.inputContainer}>
          <Controller
            name={"publicationYear"}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={`${value ?? ""}`}
                onBlur={onBlur}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={onChange}
                placeholder={"Publication Year"}
              />
            )}
          />
        </View>
        {errors.publicationYear && (
          <Text style={styles.error}>{errors.publicationYear?.message}</Text>
        )}
      </ScrollView>
        <AppButton
          onPress={onSubmit}
          buttonStyle={styles.button}
          title={bookData.id ? "Update Book" : "Create New Book"}
        />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
