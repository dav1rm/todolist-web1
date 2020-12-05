import styled from 'styled-components';

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

  @media (max-width: 800px) {
    height: 90px;
    padding: 10px;
  }

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
    background-color: #1e84ef;
    color: #fff;
    border-radius: 4px;
    transition: all ease-in 0.2s;

    @media (max-width: 600px) {
      font-size: 14px;
    }

    &:hover {
      background-color: #e9f3fe;
      color: #1e84ef;
    }
  }
`;

export const Columns = styled.section`
  display: flex;
  flex: 1;
  padding: 0px 35px 15px;

  @media (max-width: 800px) {
    padding: 0px 10px;
    flex-direction: column;
  }
`;

export const TodoColumn = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;

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
  padding: 15px;
  margin-bottom: 20px;
  background-color: #4a94f8;
  border-radius: 8px;

  h3 {
    color: #fff;
    font-weight: 500;
    font-size: 18px;
  }
`;

export const TodoContent = styled.ul``;
