import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./game/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="game" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
