import React from "react";

function Main() {
  return (
    <main>
      <header>
        <h1>Minha Lista de Tarefas</h1>
        <div>
          <h4>Adicionar Nova tarefa</h4>
          <label className="label" htmlFor="title">
            Título
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Digite o Título..."
            />
          </label>
          <label className="label" htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Digite a descrição..."
            />
          </label>
          <label className="label" htmlFor="owner">
            Responsável pela tarefa
            <input
              type="text"
              id="owner"
              name="owner"
              placeholder="Digite o nome do responsável..."
            />
          </label>
          <label className="label" htmlFor="date">
            Data prevista
            <input
              type="text"
              id="date"
              name="date"
              placeholder="Digite a data prevista para cumprir..."
            />
          </label>
          <button type="button">Adicionar</button>
        </div>
      </header>
      <section>
        <article>
          <header>
            <h3>Tarefas Pedentes</h3>
          </header>
          <ul>
            <li>
              <span>Estudar CSS</span>
              <span>Davi Rodrigues</span>
              <span>Data prevista: 20/04/20</span>
              <button type="button">Cumprir</button>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </li>
            <li>
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
            </li>
          </ul>
        </article>
        <article>
          <header>
            <h3>Tarefas Em Andamento</h3>
          </header>
          <ul>
            <li>
              <span>Estudar CSS</span>
              <span>Davi Rodrigues</span>
              <span>Data prevista: 20/04/20</span>
              <button type="button">Cumprir</button>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </li>
          </ul>
        </article>
        <article>
          <header>
            <h3>Tarefas Cumpridas</h3>
          </header>
          <ul>
            <li>
              <span>Estudar HTM</span>
              <span>Davi Rodrigues</span>
              <span>Data prevista: 11/02/20</span>
              <button type="button">Desfazer</button>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default Main;
