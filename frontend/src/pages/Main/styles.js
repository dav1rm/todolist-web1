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

  > button {
    border: 0;
    padding: 15px 20px;
    font-size: 18px;
    font-weight: 700;
    background-color: #574a9a;
    color: #fff;
    border-radius: 4px;
    transition: all ease-in 0.2s;

    &:hover {
      box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Columns = styled.section`
  display: flex;
  flex: 1;
  padding: 0px 35px;
`;

export const TodoColumn = styled.article`
  display: flex;
  flex: 1;
  /* width: 30%; */
  border-radius: 4px;
  /* padding: 10px; */
  flex-direction: column;
  /* border: 1px solid #ccc; */
  background-color: #f7f5ff;
  border-top-width: 4px;
  border-top-style: solid;
  border-top-color: #9586e2;

  & + article {
    margin-left: 20px;
  }
`;

export const TodoHeader = styled.header`
  padding: 10px;
  /* border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #ccc; */

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
  }
`;
