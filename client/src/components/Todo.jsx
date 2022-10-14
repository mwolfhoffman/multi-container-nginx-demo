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

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      success
    }
  }
`;

const EDIT_TODO = gql`
  mutation editTodo($id: Int!, $text: String!) {
    editTodo(id: $id, text: $text) {
      success
    }
  }
`;

export function TodosList() {
  const { data, loading, refetch: refetchTodos } = useQuery(FETCH_TODOS);
  const [
    deleteTodo,
    { data: _deletedData, loading: deletedLoading, error: _deletedError },
  ] = useMutation(DELETE_TODO);

  const [
    editTodo,
    { data: _editdData, loading: editdLoading, error: _editdError },
  ] = useMutation(EDIT_TODO);

  const removeTodo = async (id) => {
    const { data } = await deleteTodo({ variables: { id } });
    if (data.deleteTodo.success) {
      refetchTodos();
    }
  };

  const edit = async (id, text) => {
    const updatedText = prompt("Please Update:", text);
    if (updatedText) {
      const { data } = await editTodo({ variables: { id, text:updatedText } });
      if (data.editTodo.success) {
        refetchTodos();
      }
    }
  };

  if (loading || deletedLoading) return <p>Loading...</p>;

  return (
    <table>
      {data?.todos.map(({ id, text }) => (
        <tr key={id}>
          <td>{text}</td>
          <td onClick={(e) => edit(id, text)}>&#128394;</td>
          <td onClick={(e) => removeTodo(id)}>&#10060;</td>
        </tr>
      ))}
    </table>
  );
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
