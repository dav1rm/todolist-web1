import React, { useRef } from 'react';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { useDrag, useDrop } from 'react-dnd';

import { useTodo } from '../../../../hooks/todos';
import { Container, Header, Content, Footer } from './styles';

function TodoCard({ todo, handleEdit, handleDelete, index, listIndex }) {
  const { title, description, endDate, owner } = todo;

  const { moveTodo } = useTodo();

  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex, id: title },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        targetIndex === draggedIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      moveTodo(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
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
