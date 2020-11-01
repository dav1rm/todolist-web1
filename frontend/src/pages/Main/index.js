import React, { useState, useEffect } from "react";
import api from "../../services/api";

function Main() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);

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

    if (!title || !description || !owner || !date) {
      setError("Campos obrigatórios!");
      return;
    }

    const response = await api.post("/todos", {
      title,
      description,
      owner,
      date,
    });

    setTodos((prev) => [...prev, response.data]);

    setTitle("");
    setDescription("");
    setOwner("");
    setDate("");
  };

  const handleDeleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main>
      <header>
        <h1>Minha Lista de Tarefas</h1>

        {!!error && <span>{error}</span>}

        <form onSubmit={handleSubmit}>
          <h4>Adicionar Nova tarefa</h4>
          <label className="label" htmlFor="title">
            Título
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
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
              name="description"
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
              name="owner"
              placeholder="Digite o nome do responsável..."
            />
          </label>
          <label className="label" htmlFor="date">
            Data prevista
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
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
                    <span>Data prevista: {todo.date}</span>
                    <button type="button">Cumprir</button>
                    <button type="button">Editar</button>
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
                    <span>Data prevista: {todo.date}</span>
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
                    <span>Data prevista: {todo.date}</span>
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
  );
}

export default Main;
