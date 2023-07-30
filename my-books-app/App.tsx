import React from "react";
import Modal from "./src/components/Modal";
import AppNavigator from "./src/navigation";
import Loading from "./src/components/Loading";
import AppApolloProvider from "./src/graphql/AppApolloProvider";
import { AppContextProvider } from "./src/lib/contexts/AppContext";

export default function App() {
  return (
    <AppContextProvider>
      <AppApolloProvider>
        <AppNavigator />
        <Modal />
        <Loading />
      </AppApolloProvider>
    </AppContextProvider>
  );
}
