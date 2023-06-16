import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import AddJob from "./pages/AddJob";
import JobDetails from "./pages/JobDetails";
import Footer from "./components/footer/footer";
import Profile from "./pages/Profile";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: 'Roboto';
  
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
              <Footer />
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
              <Header /> <Jobs /> <Footer />
            </div>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={
            <div>
              {" "}
              <Header /> <JobDetails />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              {" "}
              <Header /> <About /> <Footer />
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
        <Route
          path="/me"
          element={
            <div>
              {" "}
              <Header /> <Profile /> <Footer />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
