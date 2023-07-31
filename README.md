# MyBooks

 


MyBooks is a book management system that allows users to perform CRUD operations on books.

Note: you need to register first in order to create/update/delete books.


<img style="border-radius:5px;" src="https://github.com/Baraa-bi/MyBooks/assets/16765528/bdf4a326-dec4-4b11-b703-174c2dc78a27" height="500">

# Technologies used

NodeJS/Express/Prisma/GraphQL/Apollo Server/Prisma/MySQL/Jest.  
React Native /Expo/GraphQl/Jest

# Features

### Backend 


- Node.js server using Express.
- Prisma as the ORM connected to a remote MySQL database. 
- GraphQL APIs using Apollo Server to perform CRUD operations on books.
- Validation and error handling for the APIs.
- Authentication and authorization using a library like JWT or OAuth.
- Pagination or infinite scrolling for the book list.
- Search capabilities to the book list.
- Unit tests for the backend APIs using *Jest*.

### Mobile

- React-Native application using Expo.
- Apollo Client to communicate with the GraphQL backend.
- Display a list of books on the homepage with multiple modes (grid/list).
- Search capabilities to the book list.
- Ability to create/update/delete books with the required validations
- Ability to show the book details and navigate to the book website.
- Proper error handling for API errors or network errors.
- Proper loading state handling using the context API and Apolo client link.
- Authentication and authorization using a library like JWT or OAuth.
- Pagination or infinite scrolling for the book list.
- Integration tests for the mobile components.
- Multi-theme support Light/Dark themes.
- Layout animations & Lottie animations.
- Light/Dark theme supported

# Usage

- Clone the repo
- Navigate to the repo folder

## Backend

- ```yarn install```
- ```yarn start```

## Mobile
- Open a new terminal 
- ```cd my-books-app```
- ```yarn install```
- for ios ```yarn ios``` 
- for android ```yarn android```
