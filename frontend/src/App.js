import Modal from "react-modal";

import Main from "./pages/Main";
import GlobalStyle from "./styles/global";

function App() {
  Modal.setAppElement("#root");
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
}

export default App;
