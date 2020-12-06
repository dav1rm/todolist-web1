import styled from 'styled-components';

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  > h2 {
    color: #43444f;
    font-size: 18px;
    font-weight: 500;
  }

  > button {
    border: 0;
    background: transparent;
    transition: color 0.25s linear, background-color 0.25s linear;
    color: #1d1d1b;

    &:hover {
      color: #0075bc;
    }
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;

  > .error {
    margin-bottom: 10px;
    color: #ff5b5b;
  }

  > label {
    margin-bottom: 5px;
    color: #43444f;
  }

  > input,
  select,
  textarea {
    font-size: 16px;
    background-color: #fff;
    color: #1d1d1b;
    padding: 10px 15px;
    border: 1px solid #cecece;
    border-radius: 2px;
    margin-bottom: 10px;

    &:focus {
      border-color: #1e84ef;
    }
  }

  > textarea {
    resize: none;
  }

  > button {
    border: 0;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
    background-color: #e9f3fe;
    color: #1e84ef;
    transition: color 0.25s linear, background-color 0.25s linear;

    &:hover {
      background-color: #1e84ef;
      color: #fff;
    }
  }
`;
