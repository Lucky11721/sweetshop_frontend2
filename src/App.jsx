import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SweetManagement from "./pages/SweetManagement";

// 1. Defined OUTSIDE App
const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext); 
    return token ? children : <Navigate to="/login" />;
};

// 2. Defined OUTSIDE App
const AdminRoute = ({ children }) => {
    const { token, role } = useContext(AuthContext);
    return (token && role === 'ADMIN') ? children : <Navigate to="/dashboard" />;
};

function App() {
  // 3. NO useContext here! 
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          <Route path="/admin" element={
            <AdminRoute><SweetManagement /></AdminRoute>
          } />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;