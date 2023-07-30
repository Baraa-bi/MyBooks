import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Book, BookCardMode } from "../types";
import { colors } from "../../colors";
import React from "react";

interface Props {
  book: Book;
  mode: BookCardMode;
  onPress: (book: Book) => void;
}

const VerticalBookCard = ({ book }: { book: Book }) => {
  return (
    <View style={vStyles.bookItem}>
      <Image
        transition={1000}
        contentFit="cover"
        source={book.image}
        style={vStyles.image}
      />
      <Text numberOfLines={1} style={vStyles.bookTitle}>
        {book.title}
      </Text>
      <Text numberOfLines={1} style={vStyles.bookAuthor}>
        {book.author}
      </Text>
      <Text style={vStyles.bookYear}>{book.publicationYear}</Text>
    </View>
  );
};

const HorizontalBookCard = ({ book }: { book: Book }) => {
  return (
    <View style={hStyles.bookItem}>
      <Image
        transition={1000}
        source={book.image}
        contentFit="contain"
        style={hStyles.image}
      />
      <View style={hStyles.subContainer}>
        <View>
          <Text numberOfLines={1} style={hStyles.bookTitle}>
            {book.title}
          </Text>
          <Text numberOfLines={1} style={hStyles.bookAuthor}>
            {book.author}
          </Text>
        </View>
        <Text style={hStyles.bookYear}>Year: {book.publicationYear}</Text>
      </View>
    </View>
  );
};

const BookCardItem = {
  HORIZONTAL: HorizontalBookCard,
  VERTICAL: VerticalBookCard,
};

export default React.memo(function BookCard({ onPress, book, mode }: Props) {
  const BookCardComponent = BookCardItem[mode];
  const onCardPress = () => onPress(book);
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      activeOpacity={0.8}
      onPress={onCardPress}
    >
      <BookCardComponent book={book} />
    </TouchableOpacity>
  );
});

const vStyles = StyleSheet.create({
  bookItem: {
    margin: 10,
    flex: 1,
  },
  bookTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 14,
    marginTop: 4,
    color: "#bdbdbd",
  },
  bookYear: {
    fontSize: 12,
    color: "#bdbdbd",
  },
  image: {
    height: 180,
    borderRadius: 5,
    marginBottom: 10,
  },
});

const hStyles = StyleSheet.create({
  bookItem: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 14,
    backgroundColor: colors.foreground,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  bookTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 14,
    marginTop: 4,
    color: "#bdbdbd",
  },
  bookYear: {
    fontSize: 14,
    color: "#bdbdbd",
  },
  image: {
    flex: 0.4,
    marginRight: 10,
    height: 110,
    borderRadius: 5,
    backgroundColor: "#1f2937",
  },
  subContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});
