// src/App.tsx

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Book, BookCardMode } from "../../types";
import BookCard from "../../components/BookCard";
import { Screens } from "../../config/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../../colors";
import SearchBar from "./SearchBar";
import Placeholder from "../../components/Placeholder";
import AnimatedLottieView from "lottie-react-native";
import debounce from "lodash/debounce";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import {
  useAppContextActions,
  useAppContextValue,
} from "../../lib/contexts/AppContext";
import FloatingButton from "../../components/FloatingButton";
import useAuth from "../../lib/hooks/useAuth";
import useBookList from "../../lib/hooks/useBookList";

enum LIST_MODE {
  LIST = "LIST",
  GRID = "GRID",
}

interface Props {
  navigation: any;
}

const BookCardModeValue = {
  [LIST_MODE.LIST]: BookCardMode.HORIZONTAL,
  [LIST_MODE.GRID]: BookCardMode.VERTICAL,
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const { apiToken } = useAppContextValue();
  const { signOut } = useAuth();
  const { setModalInfo } = useAppContextActions();
  const [listMode, setListMode] = useState(LIST_MODE.GRID);
  const { books, loadMoreBooks, setSearchQuery, loading } = useBookList();

  const onHeaderRightPress = useCallback(() => {
    if (apiToken)
      return setModalInfo({
        buttonTitle: "Dismiss",
        onPress: () => {
          signOut();
          setModalInfo(null);
        },
        title: "You have been Signed out successfully",
        animation: require("../../../assets/animations/success.json"),
      });
    navigation.navigate(Screens.AUTH);
  }, [apiToken]);

  const headerRight = useCallback(() => {
    return (
      <Animated.View entering={ZoomIn} exiting={ZoomOut}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.headerIcon}
          onPress={onHeaderRightPress}
        >
          <Ionicons
            size={20}
            color={"white"}
            name={apiToken ? "ios-exit-sharp" : "person-circle"}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }, [apiToken]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Library", headerRight });
  }, [headerRight]);

  const onBookCardPress = useCallback((book: Book) => {
    navigation.navigate(Screens.BOOK_DETAILS, { book });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Book }) => {
      return (
        <BookCard
          book={item}
          onPress={onBookCardPress}
          mode={BookCardModeValue[listMode]}
        />
      );
    },
    [listMode, onBookCardPress]
  );

  const renderListEmptyComponent = () =>
    !loading && !books?.length ? (
      <Placeholder
        title="No Books found"
        image={require("../../../assets/images/empty-list.png")}
      />
    ) : null;

  const onRightIconPress = () => {
    setListMode((listMode) => {
      return listMode === LIST_MODE.GRID ? LIST_MODE.LIST : LIST_MODE.GRID;
    });
  };

  const renderListFooterComponent = () => {
    if (loading)
      return (
        <AnimatedLottieView
          loop
          autoPlay
          style={styles.lottie}
          source={require("../../../assets/animations/loader.json")}
        />
      );
    return null;
  };

  const debouncedSearchBooks = debounce(setSearchQuery, 500);

  const renderListHeaderComponent = (
    <SearchBar
      searchValue={searchText}
      onRightIconPress={onRightIconPress}
      onSearchValueChange={(q) => {
        debouncedSearchBooks(q);
        setSearchText(q);
      }}
      rightIcon={listMode === LIST_MODE.GRID ? "list" : "grid"}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        key={listMode}
        refreshing={loading}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreBooks}
        keyExtractor={(item: Book) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentStyle}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={renderListHeaderComponent}
        ListFooterComponent={renderListFooterComponent}
        numColumns={listMode === LIST_MODE.GRID ? 3 : 1}
      />
      {!!apiToken && (
        <FloatingButton
          onPress={() => navigation.navigate(Screens.MANAGE_BOOK)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentStyle: {
    flexGrow: 1,
  },
  lottie: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginVertical: 10,
  },
  headerIcon: {
    padding: 5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
});

export default HomeScreen;
