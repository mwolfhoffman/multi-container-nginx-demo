import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { TodosList, CreateTodoForm } from "./components/Todo";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_BASE_PATH,
  headers: {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE OPTIONS",
    "Access-Control-Allow-Origin": "*",
    accept: "application/json, */*",
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <div
      style={{
        backgroundColor: "#00000008",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2>
        Anotha Todo List
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h2>

      <CreateTodoForm />
      <TodosList />
    </div>
  </ApolloProvider>
);

export default App;
