import styled, { css } from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 10px;

  cursor: grab;

  ${(props) =>
    props.isDragging &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      box-shadow: none;
      padding: 13px;
      background: transparent;
      cursor: grabbing;

      header,
      div,
      footer {
        opacity: 0;
      }
    `};
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > strong {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 10px;
  }

  > div {
    align-items: flex-start;
    display: flex;
    width: 50px;

    > button {
      border: 0;
      background: transparent;

      color: #6f6c7b;
      transition: color 0.25s linear, background-color 0.25s linear;

      &:hover {
        color: #0075bc;
      }

      & + button {
        margin-left: 5px;
      }
    }
  }
`;

export const Content = styled.div`
  padding: 10px 0px;

  > p {
    color: #43444f;
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  span {
    color: #6f6c7b;
    font-size: 12px;
  }

  > span.user {
    font-weight: 500;
    color: #0075bc;
  }
`;
