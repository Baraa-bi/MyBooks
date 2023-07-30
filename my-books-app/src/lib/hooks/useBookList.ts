import { useState, useEffect, useRef } from "react";

// Assuming you have a GraphQL client set up, import the necessary functions
import { useApolloClient, useQuery } from "@apollo/client";
import { Book } from "../../types";
import { GET_ALL_BOOKS, SEARCH_BOOKS } from "../../graphql/queries/book";
import { PAGE_SIZE } from "../../config/constants";

const useBookList = () => {
  const client = useApolloClient();
  const prevPageRef = useRef<number>(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Array<Book>>([]);

  const fetchBooks = (query: string, page: number) => {
    setLoading(true);
    client
      .query({
        query: query ? SEARCH_BOOKS : GET_ALL_BOOKS,
        variables: { query, page, pageSize: PAGE_SIZE },
      })
      .then(({ data }) => {
        const bookData = query ? data.searchBooks : data.books;
        setBooks((prevBooks) => [...prevBooks, ...bookData.books]);
        setTotalPages(bookData.totalPages);
      })
      .finally(() => setLoading(false));
  };

  const loadMoreBooks = () => {
    if (books?.length) {
      if (currentPage < totalPages) {
        if (prevPageRef.current !== currentPage || currentPage === 1) {
          prevPageRef.current = currentPage;
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    }
  };

  useEffect(() => {
    setBooks([]);
    setCurrentPage(1);
    fetchBooks(searchQuery, 1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > 1) fetchBooks(searchQuery, currentPage);
  }, [currentPage]);

  return { loading, searchQuery, setSearchQuery, books, loadMoreBooks };
};

export default useBookList;
