import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { IoIosClose, IoMdCreate, IoMdTrash } from "react-icons/io";

import api from "../../services/api";
import {
  Container,
  Header,
  ModalHeader,
  ModalForm,
  Columns,
  TodoColumn,
  TodoHeader,
  TodoContent,
} from "./styles";

function Main() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api
      .get("/todos")
      .then((respose) => {
        setTodos(respose.data);
      })
      .catch((err) => {
        setError("Falha ao obter todos");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !owner || !endDate) {
      setError("Campos obrigatórios!");
      return;
    }
    let response = null;

    if (id) {
      response = await api.put(`/todos/${id}`, {
        status,
        title,
        description,
        owner,
        endDate,
      });

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );

      setTodos(updatedTodos);
    } else {
      response = await api.post("/todos", {
        title,
        description,
        owner,
        endDate,
      });

      setTodos((prev) => [...prev, response.data]);
    }

    setTitle("");
    setDescription("");
    setOwner("");
    setEndDate("");
    setIsOpen(false);
  };

  const handleDeleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  function openModal(todo) {
    setIsOpen(true);

    setStatus(todo.status);
    setId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setOwner(todo.owner);
    setEndDate(todo.endDate);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(67, 68, 79, 0.6)",
    },
  };

  function closeModal() {
    setIsOpen(false);
    setId("");
    setStatus("");
    setTitle("");
    setDescription("");
    setOwner("");
    setEndDate("");
  }

  return (
    <>
      <Container>
        <Header>
          <h1>Minha Lista de Tarefas</h1>

          <button type="button" onClick={() => setIsOpen(true)}>
            Nova Tarefa
          </button>
        </Header>

        {!!error && <span>{error}</span>}

        <Columns>
          <TodoColumn>
            <TodoHeader>
              <h3>Pedentes</h3>
            </TodoHeader>
            <TodoContent>
              {todos.map((todo) => {
                if (todo.status === "CREATED") {
                  return (
                    <li key={todo.id}>
                      <strong>{todo.title}</strong>
                      <p>{todo.description}</p>
                      <span>{todo.owner}</span>
                      <span>
                        Data prevista:{" "}
                        {new Date(todo.endDate).toLocaleDateString()}
                      </span>
                      <div className="footer">
                        <button type="button" onClick={() => openModal(todo)}>
                          <IoMdCreate size={22} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <IoMdTrash size={22} />
                        </button>
                      </div>
                    </li>
                  );
                }
              })}
            </TodoContent>
          </TodoColumn>
          <TodoColumn>
            <TodoHeader>
              <h3>Em Andamento</h3>
            </TodoHeader>
            <TodoContent>
              {todos.map((todo) => {
                if (todo.status === "INPROGRESS") {
                  return (
                    <li key={todo.id}>
                      <strong>{todo.title}</strong>
                      <p>{todo.description}</p>
                      <span>{todo.owner}</span>
                      <span>
                        Data prevista:{" "}
                        {new Date(todo.endDate).toLocaleDateString()}
                      </span>
                      <div className="footer">
                        <button type="button" onClick={() => openModal(todo)}>
                          <IoMdCreate size={22} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <IoMdTrash size={22} />
                        </button>
                      </div>
                    </li>
                  );
                }
              })}
            </TodoContent>
          </TodoColumn>
          <TodoColumn>
            <TodoHeader>
              <h3>Finalizadas</h3>
            </TodoHeader>
            <TodoContent>
              {todos.map((todo) => {
                if (todo.status === "FINALIZED") {
                  return (
                    <li key={todo.id}>
                      <strong>{todo.title}</strong>
                      <p>{todo.description}</p>
                      <span className="user">{todo.owner}</span>
                      <span>
                        Data prevista:{" "}
                        {new Date(todo.endDate).toLocaleDateString()}
                      </span>
                      <div className="footer">
                        <button type="button" onClick={() => openModal(todo)}>
                          <IoMdCreate size={22} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <IoMdTrash size={22} />
                        </button>
                      </div>
                    </li>
                  );
                }
              })}
            </TodoContent>
          </TodoColumn>
        </Columns>
      </Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ModalHeader>
          <h2>{id ? "Editar Tarefa" : "Adicionar Nova Tarefa"}</h2>
          <button onClick={closeModal}>
            <IoIosClose size={36} />
          </button>
        </ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          {!!id && (
            <>
              <label className="label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option>Selecione...</option>
                <option value="CREATED">Pendente</option>
                <option value="INPROGRESS">Em Andamento</option>
                <option value="FINALIZED">Finalizado</option>
              </select>
            </>
          )}
          <label className="label" htmlFor="title">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o Título..."
          />
          <label className="label" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            placeholder="Digite a descrição..."
            onChange={(e) => setDescription(e.target.value)}
          >
            {description}
          </textarea>
          <label className="label" htmlFor="owner">
            Responsável pela tarefa
          </label>
          <input
            type="text"
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Digite o nome do responsável..."
          />
          <label className="label" htmlFor="date">
            Data prevista
          </label>
          <input
            type="date"
            id="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Digite a data prevista para cumprir..."
          />
          <button type="submit">{id ? "Salvar" : "Cadastrar"}</button>
        </ModalForm>
      </Modal>
    </>
  );
}

export default Main;
