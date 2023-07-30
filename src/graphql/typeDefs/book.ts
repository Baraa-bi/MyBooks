export default `
  type Book {
  id: String
  title: String
  author: String
  image: String 
  country     :    String
  language     :   String
  pages         :  Int
  link           : String
  publicationYear: Int
  createdAt: String
  updatedAt: String
} 

type Query { 
  books(page: Int!, pageSize: Int!): BookPagination!
  book(id: String!): Book 
  searchBooks(query: String!, page: Int!, pageSize: Int!): BookPagination!
}

type BookPagination {
  totalItems: Int!
  totalPages: Int!
  currentPage: Int!
  books: [Book]!
}

input BookInput {
  id: ID
  title: String!
  author: String!
  image: String! 
  publicationYear: Int! 
}


type Mutation {
  createBook(book: BookInput!):Book!
  updateBook(book: BookInput!): Book!
  deleteBook(id: String!): Book
}
`;
