import React, { useState, useEffect } from 'react';

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
  const [currentListIndex, setCurrentListIndex] = useState(null);

  const { todos, loadTodos } = useTodo();

  useEffect(() => {
    loadTodos();
  }, []);

  const handleOpenModal = (type, todo, listIndex) => {
    console.log(todo);
    setCurrentListIndex(listIndex);

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
          {todos.map((column, listIndex) => (
            <TodoColumn key={column.title}>
              <TodoHeader>
                <h3>{`${column.title} - ${column.todos.length}`}</h3>
              </TodoHeader>
              <TodoContent>
                {column.todos.map((todo, index) => (
                  <TodoCard
                    key={todo.id}
                    listIndex={listIndex}
                    index={index}
                    todo={todo}
                    handleEdit={() => handleOpenModal('form', todo, listIndex)}
                    handleDelete={() =>
                      handleOpenModal('confirm', todo, listIndex)
                    }
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
        listIndex={currentListIndex}
        closeModal={() => {
          setDeleteTodo(null);
          setConfirmVisible(false);
        }}
      />
      <FormModal
        visible={formVisible}
        data={editTodo}
        listIndex={currentListIndex}
        closeModal={() => {
          setEditTodo(null);
          setFormVisible(false);
        }}
      />
    </>
  );
}

export default Main;
