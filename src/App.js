import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import NoteState from "./Context/Notes/NoteState";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";
import AlertState from "./Context/Alert/AlertState";

function App() {
  return (
    <>
      <NoteState>
        <AlertState>

          <Navbar title="iNotebook" />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>

        </AlertState>
      </NoteState>
    </>
  );
}

export default App;
