// src/graphql/queries.ts

import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query GetAllBooks($page: Int!, $pageSize: Int!) {
    books(page: $page, pageSize: $pageSize) {
      totalItems
      totalPages
      currentPage
      books {
        id
        title
        author
        image
        country
        language
        pages
        link
        publicationYear
        createdAt
        updatedAt
      }
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!, $page: Int!, $pageSize: Int!) {
    searchBooks(query: $query, page: $page, pageSize: $pageSize) {
      totalItems
      totalPages
      currentPage
      books {
        id
        title
        author
        image
        country
        language
        pages
        link
        publicationYear
        createdAt
        updatedAt
      }
    }
  }
`;