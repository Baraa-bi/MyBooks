// resolvers/index.js
import bookTypeDefs from "./book";
import userTypeDefs from "./user";

export default `
  ${bookTypeDefs}
  ${userTypeDefs} 
`;
