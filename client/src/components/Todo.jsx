import React from "react";
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";

const FETCH_TODOS = gql`
  query {
    todos {
      id
      text
      completed
      createdAt
      updatedAt
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodos($text: String!) {
    createTodo(text: $text) {
      text
    }
  }
`;

export function TodosList() {
  const { data, loading } = useQuery(FETCH_TODOS);

  if (loading) return <p>Loading...</p>;

  return data?.todos.map(({ id, text }) => (
    <div key={id}>
      <p>{text}</p>
    </div>
  ));
}

export function CreateTodoForm() {
  let text;
  const [createTodo] = useMutation(CREATE_TODO);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo({
            variables: {
              text: text.value,
            },
          });
          text.value = "";
          window.location.reload(); // Todo: Remove need this.
        }}
        style={{ marginTop: "2em", marginBottom: "2em" }}
      >
        <label>Todo: </label>
        <input
          ref={(node) => {
            text = node;
          }}
          style={{ marginRight: "1em" }}
        />
        <button type="submit" style={{ cursor: "pointer" }}>
          Add Todo
        </button>
      </form>
    </div>
  );
}
