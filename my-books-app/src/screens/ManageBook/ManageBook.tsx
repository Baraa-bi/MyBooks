import { CommonActions, useRoute } from "@react-navigation/native";
import BookForm from "./BookForm";
import { Book, BookFormFields } from "../../types";
import { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Screens } from "../../config/constants";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  CREATE_BOOK_MUTATION,
  UPDATE_BOOK_MUTATION,
} from "../../graphql/mutations/book";
import { GET_ALL_BOOKS } from "../../graphql/queries/book";

export default function ManageBook({ navigation }: any) {
  const client = useApolloClient();
  const { params }: any = useRoute();

  const bookData: Book = params?.book ?? {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.book ? "Update Book" : "Create New Book",
    });
  }, []);

  const [updateBook] = useMutation(UPDATE_BOOK_MUTATION, {
    onCompleted: ({ updateBook }) => {
      navigation.navigate(Screens.BOOK_DETAILS, { book: updateBook });
    },
  });

  const [createBook] = useMutation(CREATE_BOOK_MUTATION, {
    onCompleted: ({ createBook }) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: Screens.HOME },
            {
              name: Screens.BOOK_DETAILS,
              params: { book: createBook },
            },
          ],
        })
      );
    },
    refetchQueries: [GET_ALL_BOOKS],
  });

  const onSubmit = async (bookFields: BookFormFields) => {
    const book = {
      id: bookFields.id,
      title: bookFields.title,
      author: bookFields.author,
      image: bookFields.image,
      publicationYear: bookFields.publicationYear,
    };
    if (book.id)
      return updateBook({
        variables: { book },
        update: (cache, { data }) => {
          cache.modify({
            id: cache.identify(data.updateBook),
            fields: {
              title: () => book.title,
              author: () => book.author,
              image: () => book.image,
              publicationYear: () => book.publicationYear,
            },
          });
        },
      });
    return createBook({ variables: { book } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BookForm onFormSubmit={onSubmit} bookData={bookData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
