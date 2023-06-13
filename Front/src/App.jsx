import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import AddJob from "./pages/AddJob";
// import "./app.css";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Home />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/jobs"
          element={
            <div>
              {" "}
              <Header /> <Jobs />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              {" "}
              <Header /> <About />
            </div>
          }
        />
        <Route
          path="/addjob"
          element={
            <div>
              {" "}
              <Header /> <AddJob />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
