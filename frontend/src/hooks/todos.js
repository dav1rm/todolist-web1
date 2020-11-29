import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

const TodoContext = createContext({});

const TodoProvider = ({ children }) => {
  // States
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = useCallback(() => {
    setLoading(true);

    api
      .get(`todos`)
      .then((response) => {
        setLoading(false);

        setTodos(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const storeTodo = useCallback((data) => {
    setLoading(true);
    api
      .post('todos', data)
      .then((response) => {
        setTodos((prev) => [...prev, response.data]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const updateTodo = useCallback(
    (id, data) => {
      setLoading(true);
      api
        .put(`/todos/${id}`, data)
        .then((response) => {
          const updatedTodos = todos.map((todo) =>
            todo.id === id ? response.data : todo
          );
          console.log('kkk', updatedTodos);
          setTodos(updatedTodos);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [todos]
  );

  const removeTodo = useCallback((id) => {
    setLoading(true);
    api
      .delete(`/todos/${id}`)
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        loadTodos,
        storeTodo,
        updateTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

function useTodo() {
  const context = useContext(TodoContext);

  return context;
}

export { TodoProvider, useTodo };
