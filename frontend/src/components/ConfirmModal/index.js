import React from 'react';
import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';

import { useTodo } from '../../hooks/todos';
import { Header, Content, Footer } from './styles';

function ConfirmModal({ visible, todo, closeModal, listIndex }) {
  const { removeTodo } = useTodo();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(67, 68, 79, 0.6)',
    },
  };

  const handleDelete = () => {
    removeTodo(todo?.id, listIndex);
    closeModal();
  };

  return (
    <Modal style={customStyles} isOpen={visible} onRequestClose={closeModal}>
      <Header>
        <h2>Confirmar Exclusão</h2>
        <button onClick={closeModal}>
          <IoIosClose size={36} />
        </button>
      </Header>
      <Content>
        <p>{`Tem certeza que deseja excluir essa tarefa "${todo?.title}"`}</p>
        <Footer>
          <button className="secondary" onClick={closeModal}>
            Não
          </button>
          <button className="primary" onClick={handleDelete}>
            Sim, Excluir
          </button>
        </Footer>
      </Content>
    </Modal>
  );
}

export default ConfirmModal;
