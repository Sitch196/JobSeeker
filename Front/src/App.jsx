import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: 'Roboto';
  
  }
  `;

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

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

        {isLoggedIn ? (
          <Route
            path="/me"
            element={
              <div>
                <Header />
                <Profile onLogout={handleLogout} />
                <Footer />
              </div>
            }
          />
        ) : (
          <Route path="/me" element={<Navigate to="/login" replace={true} />} />
        )}

        {isLoggedIn ? (
          <Route
            path="/addjob"
            element={
              <div>
                {" "}
                <Header /> <AddJob onLogout={handleLogout} /> <Footer />
              </div>
            }
          />
        ) : (
          <Route
            path="/addjob"
            element={<Navigate to="/login" replace={true} />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
