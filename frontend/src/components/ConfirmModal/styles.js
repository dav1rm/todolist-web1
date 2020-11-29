import styled from 'styled-components';

export const Header = styled.header`
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    margin-bottom: 5px;
    color: #43444f;
  }

  > button {
    border: 0;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 500;
    background-color: #80bf18;
    color: #fff;
    border-radius: 4px;
    transition: color 0.25s linear, background-color 0.25s linear;

    &:hover {
      background-color: #1bb81c;
      color: #fff;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  > label {
    margin-bottom: 5px;
    color: #43444f;
  }

  > button {
    border: 0;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 4px;
  }

  > button.primary {
    flex: 0.48;
    background-color: #faedec;
    color: #ce4a4a;

    transition: color 0.25s linear, background-color 0.25s linear;

    &:hover {
      background-color: #ce4a4a;
      color: #fff;
    }
  }

  > button.secondary {
    flex: 0.48;
    background-color: #e9f3fe;
    color: #1e84ef;

    transition: color 0.25s linear, background-color 0.25s linear;

    &:hover {
      background-color: #1e84ef;
      color: #fff;
    }
  }
`;
