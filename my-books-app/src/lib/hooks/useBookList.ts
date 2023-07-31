import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Book } from "../../types";
import { GET_ALL_BOOKS, SEARCH_BOOKS } from "../../graphql/queries/book";
import { PAGE_SIZE } from "../../config/constants";

const useBookList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, fetchMore } = useQuery(
    searchQuery ? SEARCH_BOOKS : GET_ALL_BOOKS,
    {
      variables: { query: searchQuery, page: 1, pageSize: PAGE_SIZE },
      fetchPolicy: "cache-and-network",
    }
  );

  const loadMoreBooks = () => {
    if (data?.books?.currentPage < data?.books?.totalPages) {
      fetchMore({
        variables: {
          page: data?.books?.currentPage + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            books: {
              ...prev.books,
              currentPage: fetchMoreResult.books.currentPage,
              books: [...prev.books.books, ...fetchMoreResult.books.books],
            },
          };
        },
      });
    }
  };

  useEffect(() => {
    // Reset the current page when search query changes
    fetchMore({
      variables: {
        page: 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  }, [searchQuery]);

  console.log({ data });

  return {
    loading,
    searchQuery,
    setSearchQuery,
    books: searchQuery ? data?.searchBooks?.books : data?.books?.books,
    loadMoreBooks,
  };
};

export default useBookList;
