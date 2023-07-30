import { ReactNode, useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAppContextActions } from "../lib/contexts/AppContext";
import { API_BASE_URL } from "../config/constants";
import { getApiToken } from "../lib/helpers/helpers";

const cache = new InMemoryCache({
  typePolicies: {
    Book: {
      keyFields: ["id"],
    },
    Query: {
      fields: {
        books: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export default function AppApolloProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { setModalInfo, setIsLoading } = useAppContextActions();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      return setModalInfo({
        title: "Oh oh",
        text: graphQLErrors.map((e) => e.message).toString(),
        animation: require("../../assets/animations/error.json"),
        buttonTitle: "Dismiss",
        onPress: () => setModalInfo(null),
      });
    if (networkError)
      return setModalInfo({
        title: "Opps network error",
        text: "No internet connection, kindly check your connection and try agian",
        animation: require("../../assets/animations/network-error.json"),
        buttonTitle: "Thanks",
        onPress: () => setModalInfo(null),
      });
  });

  const httpLink = new HttpLink({ uri: API_BASE_URL });

  const authLink = setContext(async (_: any, { headers }) => {
    const token = await getApiToken();
    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
    };
  });

  const loadingLink = new ApolloLink((operation, forward) => {
    if (
      operation.operationName === "GetAllBooks" ||
      operation.operationName === "SearchBooks"
    )
      return forward(operation).map((res) => res);
    setIsLoading(true);
    return forward(operation).map((response) => {
      setIsLoading(false);
      return response;
    });
  });

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        cache,
        link: from([loadingLink, authLink, errorLink, httpLink]),
        defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
      }),
    []
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
