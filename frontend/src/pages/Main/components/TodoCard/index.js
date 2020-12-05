import React from 'react';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { Container, Header, Content, Footer } from './styles';

function TodoCard({ todo, handleEdit, handleDelete }) {
  const { title, description, endDate, owner } = todo;

  return (
    <Container>
      <Header>
        <strong>{title}</strong>
        <div>
          <button type="button" onClick={handleEdit}>
            <IoMdCreate size={18} />
          </button>
          <button type="button" onClick={handleDelete}>
            <IoMdTrash size={18} />
          </button>
        </div>
      </Header>
      <Content>
        <p>{description}</p>
      </Content>
      <Footer>
        <span className="user">{owner}</span>
        <span>{new Date(endDate).toLocaleDateString()}</span>
      </Footer>
    </Container>
  );
}

export default TodoCard;
