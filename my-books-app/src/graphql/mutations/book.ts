import { gql } from "@apollo/client";

export const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook($book: BookInput!) {
    updateBook(book: $book) {
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
`;

export const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($book: BookInput!) {
    createBook(book: $book) {
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
`;
