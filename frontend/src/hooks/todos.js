import React, { createContext, useCallback, useState, useContext } from 'react';
import produce from 'immer';
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

        const todos = response.data;
        const created = todos.filter((todo) => todo.status === 'CREATED');
        const inProgress = todos.filter((todo) => todo.status === 'INPROGRESS');
        const ended = todos.filter((todo) => todo.status === 'FINALIZED');

        setTodos([
          {
            title: `Pendentes - ${created.length}`,
            status: 'CREATED',
            todos: created,
          },
          {
            title: `Em Andamento - ${inProgress.length}`,
            status: 'INPROGRESS',
            todos: inProgress,
          },
          {
            title: `Finalizadas - ${ended.length}`,
            status: 'FINALIZED',
            todos: ended,
          },
        ]);
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

  const moveTodo = (fromList, toList, from, to) => {
    setTodos(
      produce(todos, (draft) => {
        const dragged = draft[fromList].todos[from];

        draft[fromList].todos.splice(from, 1);
        draft[toList].todos.splice(to, 0, dragged);

        // Atualiza list na api (backend)
        api
          .put(`/todos/${dragged.id}`, {
            ...dragged,
            status: draft[toList].status,
          })
          .then((response) => {
            const updatedTodos = todos.map((todo) =>
              todo.id === dragged.id ? response.data : todo
            );
            setTodos(updatedTodos);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      })
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        loadTodos,
        storeTodo,
        updateTodo,
        removeTodo,
        moveTodo,
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
