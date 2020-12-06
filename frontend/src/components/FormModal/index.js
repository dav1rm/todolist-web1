import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';

import { useTodo } from '../../hooks/todos';
import { ModalHeader, ModalForm } from './styles';

function FormModal({ data, visible, closeModal, listIndex }) {
  // Hooks
  const { storeTodo, updateTodo } = useTodo();

  // States
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  // Helpers
  const id = data?.id;
  const modalTitle = id ? 'Editar Tarefa' : 'Adicionar Nova Tarefa';
  const buttonLabel = id ? 'Salvar' : 'Cadastrar';

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setTitle(data.title);
      setDescription(data.description);
      setOwner(data.owner);
      setEndDate(data.endDate);
    }
  }, [data]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: window.innerWidth > 700 ? 650 : window.innerWidth,
    },
    overlay: {
      backgroundColor: 'rgba(67, 68, 79, 0.6)',
    },
  };

  const clearForm = () => {
    setStatus('');
    setTitle('');
    setDescription('');
    setOwner('');
    setEndDate('');

    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !owner || !endDate) {
      setError('Campos obrigatórios!');
      return;
    }

    if (id) {
      updateTodo(id, { status, title, description, owner, endDate }, listIndex);
    } else {
      storeTodo({ title, description, owner, endDate });
    }

    clearForm();
  };

  return (
    <>
      <Modal isOpen={visible} onRequestClose={clearForm} style={customStyles}>
        <ModalHeader>
          <h2>{modalTitle}</h2>
          <button onClick={clearForm}>
            <IoIosClose size={36} />
          </button>
        </ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          {!!error && <span className="error">{error}</span>}

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
            rows={4}
            value={description}
          />
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
          <button type="submit">{buttonLabel}</button>
        </ModalForm>
      </Modal>
    </>
  );
}

export default FormModal;
