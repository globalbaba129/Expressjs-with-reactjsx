import "./App.css";
import Dashboard from "./admin/Dahboard";
import LoginForm from "./forms/login";
import Register from "./forms/register";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
