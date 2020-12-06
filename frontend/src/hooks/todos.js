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
            title: `Pendentes`,
            status: 'CREATED',
            todos: created,
          },
          {
            title: `Em Andamento`,
            status: 'INPROGRESS',
            todos: inProgress,
          },
          {
            title: `Finalizadas`,
            status: 'FINALIZED',
            todos: ended,
          },
        ]);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const storeTodo = useCallback(
    async (data) => {
      setLoading(true);

      const response = await api.post('todos', data);

      setTodos(
        produce(todos, (draft) => {
          draft[0].todos.push(response.data);
        })
      );
    },
    [todos]
  );

  const updateTodo = useCallback(
    async (id, data, listIndex) => {
      setLoading(true);

      const todoListIndex = todos.findIndex(
        (list) => list.status === data.status
      );

      if (todoListIndex !== -1) {
        const response = await api.put(`/todos/${id}`, data);

        if (listIndex === todoListIndex) {
          setTodos(
            produce(todos, (draft) => {
              console.log(todoListIndex);
              const updatedTodos = draft[todoListIndex].todos.map((todo) =>
                todo.id === id ? response.data : todo
              );

              draft[todoListIndex].todos = updatedTodos;
            })
          );
        } else {
          setTodos(
            produce(todos, (draft) => {
              draft[listIndex].todos = draft[listIndex].todos.filter(
                (todo) => todo.id !== id
              );
              draft[todoListIndex].todos.unshift(response.data);
            })
          );
        }
      }
    },
    [todos]
  );

  const removeTodo = useCallback(
    (id, listIndex) => {
      console.log(id, listIndex);
      setLoading(true);
      setTodos(
        produce(todos, (draft) => {
          api
            .delete(`/todos/${id}`)
            .then(() => {
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });

          draft[listIndex].todos = draft[listIndex].todos.filter(
            (todo) => todo.id !== id
          );
        })
      );
    },
    [todos]
  );

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
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });

        draft[toList].todos = draft[toList].todos.map((todo) =>
          todo.id === dragged.id
            ? { ...todo, status: draft[toList].status }
            : todo
        );
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
