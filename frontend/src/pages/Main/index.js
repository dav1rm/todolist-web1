import React, { useState, useMemo, useEffect } from 'react';

import { useTodo } from '../../hooks/todos';
import ConfirmModal from '../../components/ConfirmModal';
import FormModal from '../../components/FormModal';
import TodoCard from './components/TodoCard';

import {
  Container,
  Header,
  Columns,
  TodoColumn,
  TodoHeader,
  TodoContent,
} from './styles';

function Main() {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [editTodo, setEditTodo] = useState(null);

  const { todos, loadTodos } = useTodo();

  useEffect(() => {
    loadTodos();
  }, []);

  const filtered = useMemo(() => {
    const created = todos.filter((todo) => todo.status === 'CREATED');
    const inProgress = todos.filter((todo) => todo.status === 'INPROGRESS');
    const ended = todos.filter((todo) => todo.status === 'FINALIZED');

    return [
      { title: `Pendentes - ${created.length}`, todos: created },
      { title: `Em Andamento - ${inProgress.length}`, todos: inProgress },
      { title: `Finalizadas - ${ended.length}`, todos: ended },
    ];
  }, [todos]);

  console.log(todos);
  const handleOpenModal = (type, todo) => {
    if (type === 'form') {
      setFormVisible(true);
      setEditTodo(todo);
    } else if (type === 'confirm') {
      setConfirmVisible(true);
      setDeleteTodo(todo);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <h1>Minha Lista de Tarefas</h1>

          <button type="button" onClick={() => handleOpenModal('form')}>
            Nova Tarefa
          </button>
        </Header>

        <Columns>
          {filtered.map((column) => (
            <TodoColumn key={column.title}>
              <TodoHeader>
                <h3>{column.title}</h3>
              </TodoHeader>
              <TodoContent>
                {column.todos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    handleEdit={() => handleOpenModal('form', todo)}
                    handleDelete={() => handleOpenModal('confirm', todo)}
                  />
                ))}
              </TodoContent>
            </TodoColumn>
          ))}
        </Columns>
      </Container>

      <ConfirmModal
        visible={confirmVisible}
        todo={deleteTodo}
        closeModal={() => {
          setDeleteTodo(null);
          setConfirmVisible(false);
        }}
      />
      <FormModal
        visible={formVisible}
        data={editTodo}
        closeModal={() => {
          console.log('edit', editTodo);
          setEditTodo(null);
          setFormVisible(false);
        }}
      />
    </>
  );
}

export default Main;
