// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($user: UserInput!) {
    register(user: $user) {
      token
    }
  }
`;
