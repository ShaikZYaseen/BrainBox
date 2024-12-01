import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home.tsx";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  return (
    <>
      <RecoilRoot>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
