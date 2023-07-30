import { useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Book } from "../../types";
import { Image } from "expo-image";
import { colors } from "../../../colors";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import { Screens } from "../../config/constants";
import { DELETE_BOOK_MUTATION } from "../../graphql/mutations/book";
import { getApiToken } from "../../lib/helpers/helpers";

const BOOK_FIELDS = [
  "title",
  "author",
  "publicationYear",
  "country",
  "language",
];

export default function BookDetails({ navigation }: any) {
  const {
    params: { book },
  }: { params: { book: Book } } = useRoute<any>();

  const onReadBookPress = () => Linking.openURL(book.link);

  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    onCompleted: () => {
      navigation.goBack();
    },
  });

  const onDeleteBook = () => {
    deleteBook({
      variables: { id: book.id },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            books(existingBooks = [], { readField }) {
              return existingBooks.books?.filter(
                (bookRef: any) => book.id !== readField("id", bookRef)
              );
            },
          },
        });
      },
    });
  };

  const headerRight = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginHorizontal: 10 }}
        onPress={() => navigation.navigate(Screens.MANAGE_BOOK, { book })}
      >
        <Ionicons size={22} color={"#2563eb"} name={"md-pencil"} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onDeleteBook}>
        <Ionicons size={22} color={"#e11d48"} name={"trash-bin-sharp"} />
      </TouchableOpacity>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({ title: book.title });
    (async () => {
      const token = await getApiToken();
      navigation.setOptions({
        headerRight: token ? headerRight : null,
      });
    })();
  }, [book]);

  const renderBookItems = useMemo(() => {
    return BOOK_FIELDS.map((key, idx) => {
      const field = key as keyof Book;
      if (book[field])
        return (
          <View
            key={key}
            style={{
              ...styles.listItem,
              backgroundColor: idx % 2 ? colors.foreground : colors.background,
            }}
          >
            <AppText style={{ textTransform: "capitalize" }}>{field}</AppText>
            <AppText>{book[field]}</AppText>
          </View>
        );
    });
  }, [book]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            transition={1000}
            contentFit="contain"
            style={styles.image}
            source={book.image}
          />
        </View>
        <AppText style={styles.title}>{book.title}</AppText>
        <AppText style={styles.author}>{book.author}</AppText>
        <View style={styles.listContainer}>{renderBookItems}</View>
      </ScrollView>
      {!!book.link && (
        <View style={{ margin: 10 }}>
          <AppButton onPress={onReadBookPress} title="Read Book" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "600",
    color: colors.text,
  },
  author: {
    fontSize: 18,
    textAlign: "center",
    color: colors.primary,
    marginVertical: 10,
  },
  description: {
    lineHeight: 40,
    fontSize: 16,
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
    height: 350,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  listContainer: {
    borderWidth: 2,
    paddingVertical: 5,
    borderColor: colors.foreground,
    borderRadius: 10,
    marginVertical: 25,
  },
});
