export default `
type User {
  id: ID!
  email: String!
  username: String! 
}

input UserInput {
  email: String!
  username: String!
  password: String! 
}

type AuthPayload {
  token: String!
  user: User!
}
 
type Mutation {
  register(user: UserInput!): AuthPayload!
  login(username: String!, password: String!): AuthPayload!
}
`