import "./App.css";
import "./mediaquery.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Home from "./components/Home";
import Login from "./auth/Login";
import ContextState from "./context/State";
import Signup from "./auth/Signup";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Notes from "./Dashboard/Notes";
import Profile from "./Dashboard/Profile";
function App() {
  const [state, setState] = useState({
    progress: 0,
    loader: true,
  });

  const progressBar = (progress) => {
    setState({ progress: progress });
  };
  useEffect(() => {
    setState({
      loader: false,
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
    
      <BrowserRouter basename="/e-notebook">
        <ContextState>
          <LoadingBar color="#29a19c" progress={state.progress} height="7px" />
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login progress={progressBar} />} />
            <Route path="/signup" element={<Signup progress={progressBar} />} />
            <Route
              path="/dashboard"
              element={<Dashboard progress={progressBar} />}
            />
            <Route path="/dashboard/notes" element={<Notes progress={progressBar} />} />
            <Route
              path="/dashboard/profile"
              element={<Profile progress={progressBar} />}
            />
          </Routes>
        </ContextState>
      </BrowserRouter>
    </>
  );
}

export default App;
