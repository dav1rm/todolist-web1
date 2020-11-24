import styled from "styled-components";

export const Container = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 20px 35px;

  > h1 {
    color: #43444f;
    @media (max-width: 600px) {
      font-size: 26px;
    }
  }

  > button {
    border: 0;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 500;
    background-color: #9586e2;
    color: #fff;
    border-radius: 4px;
    transition: all ease-in 0.2s;

    @media (max-width: 600px) {
      font-size: 14px;
    }

    &:hover {
      background-color: #574a9a;
      color: #fff;
    }
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  > h2 {
    color: #43444f;
    font-weight: 500;
  }

  > button {
    border: 0;
    background: transparent;
    transition: all ease-in 0.2s;
    color: #1d1d1b;

    &:hover {
      color: #574a9a;
    }
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;

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
      border-color: #9586e2;
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
    background-color: #9586e2;
    color: #fff;
    border-radius: 4px;
    transition: all ease-in 0.2s;

    &:hover {
      background-color: #574a9a;
      color: #fff;
    }
  }
`;

export const Columns = styled.section`
  display: flex;
  flex: 1;
  padding: 0px 35px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const TodoColumn = styled.article`
  display: flex;
  flex: 1;
  border-radius: 4px;
  flex-direction: column;
  background-color: #f7f5ff;
  border-top-width: 4px;
  border-top-style: solid;
  border-top-color: #9586e2;

  & + article {
    margin-left: 20px;
  }

  @media (max-width: 800px) {
    & + article {
      margin-left: 0px;
    }

    margin-bottom: 20px;
  }
`;

export const TodoHeader = styled.header`
  padding: 10px;

  h3 {
    font-weight: 400;
    text-transform: uppercase;
  }
`;

export const TodoContent = styled.ul`
  padding: 0 10px;

  > li {
    display: flex;
    flex-direction: column;
    list-style: none;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #cecece;
    margin-bottom: 10px;

    > strong {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 10px;
    }

    > p {
      color: #43444f;
      margin-bottom: 15px;
    }

    > span.user {
      font-weight: 500;
      color: #574a9a;
    }

    span {
      color: #6f6c7b;
      font-size: 14px;
    }

    > div.footer > button {
      border: 0;
      background: transparent;

      color: #9586e2;
      transition: all ease-in 0.2s;

      &:hover {
        color: #574a9a;
      }

      & + button {
        margin-left: 5px;
      }
    }
  }
`;
