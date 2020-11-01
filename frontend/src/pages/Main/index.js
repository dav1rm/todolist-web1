import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import api from "../../services/api";

function Main() {
  const [id, setId] = useState("");
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

  const handleSubmit = async (e, edit = false) => {
    e.preventDefault();

    if (!title || !description || !owner || !endDate) {
      setError("Campos obrigatórios!");
      return;
    }
    let response = null;

    if (edit) {
      response = await api.put(`/todos/${id}`, {
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
  };

  function closeModal() {
    setIsOpen(false);
    setId("");
    setTitle("");
    setDescription("");
    setOwner("");
    setEndDate("");
  }

  return (
    <>
      <main>
        <header>
          <h1>Minha Lista de Tarefas</h1>

          {!!error && <span>{error}</span>}

          <form onSubmit={(e) => handleSubmit(e)}>
            <h4>Adicionar Nova tarefa</h4>
            <label className="label" htmlFor="title">
              Título
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o Título..."
              />
            </label>
            <label className="label" htmlFor="description">
              Descrição
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição..."
              />
            </label>
            <label className="label" htmlFor="owner">
              Responsável pela tarefa
              <input
                type="text"
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Digite o nome do responsável..."
              />
            </label>
            <label className="label" htmlFor="date">
              Data prevista
              <input
                type="date"
                id="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Digite a data prevista para cumprir..."
              />
            </label>
            <button type="submit">Adicionar</button>
          </form>
        </header>
        <section>
          <article>
            <header>
              <h3>Tarefas Pedentes</h3>
            </header>
            <ul>
              {todos.map((todo) => {
                if (todo.status === "CREATED") {
                  return (
                    <li key={todo.id}>
                      <span>{todo.title}</span>
                      <span>{todo.owner}</span>
                      <span>Data prevista: {todo.endDate}</span>
                      <button type="button">Cumprir</button>
                      <button type="button" onClick={() => openModal(todo)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Excluir
                      </button>
                    </li>
                  );
                }
              })}
              {/* <li>
              <span>Estudar javascript</span>
              <span>Davi Rodrigues</span>
              <span>Data prevista: 20/04/20</span>
              <button type="button">Cumprir</button>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </li>
            <li>
              <span>Ler um livro</span>
              <span>Davi Rodrigues</span>
              <span>Data prevista: 20/04/20</span>
              <button type="button">Cumprir</button>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </li> */}
            </ul>
          </article>
          <article>
            <header>
              <h3>Tarefas Em Andamento</h3>
            </header>
            <ul>
              {todos.map((todo) => {
                if (todo.status === "INPROGRESS") {
                  return (
                    <li key={todo.id}>
                      <span>{todo.title}</span>
                      <span>{todo.owner}</span>
                      <span>Data prevista: {todo.endDate}</span>
                      <button type="button">Cumprir</button>
                      <button type="button">Editar</button>
                      <button type="button">Excluir</button>
                    </li>
                  );
                }
              })}
            </ul>
          </article>
          <article>
            <header>
              <h3>Tarefas Cumpridas</h3>
            </header>
            <ul>
              {todos.map((todo) => {
                if (todo.status === "FINALIZED") {
                  return (
                    <li key={todo.id}>
                      <span>{todo.title}</span>
                      <span>{todo.owner}</span>
                      <span>Data prevista: {todo.endDate}</span>
                      <button type="button">Cumprir</button>
                      <button type="button">Editar</button>
                      <button type="button">Excluir</button>
                    </li>
                  );
                }
              })}
            </ul>
          </article>
        </section>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form onSubmit={(e) => handleSubmit(e, true)}>
          <h4>Adicionar Nova tarefa</h4>
          <label className="label" htmlFor="title">
            Título
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o Título..."
            />
          </label>
          <label className="label" htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição..."
            />
          </label>
          <label className="label" htmlFor="owner">
            Responsável pela tarefa
            <input
              type="text"
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Digite o nome do responsável..."
            />
          </label>
          <label className="label" htmlFor="date">
            Data prevista
            <input
              type="date"
              id="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Digite a data prevista para cumprir..."
            />
          </label>
          <button type="submit">Salvar</button>
        </form>
      </Modal>
    </>
  );
}

export default Main;
