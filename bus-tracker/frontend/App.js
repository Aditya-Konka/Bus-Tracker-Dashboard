import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import StudentPanel from "./pages/StudentPanel";
import LiveMap from "./pages/LiveMap";
import TicketScanner from "./pages/TicketScanner";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentPanel from "./pages/StudentPanel";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default route → redirect if not logged in */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scanner"
          element={
            <ProtectedRoute role="admin">
              <TicketScanner />
            </ProtectedRoute>
          }
        />

        {/* Student-only route */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentPanel />
            </ProtectedRoute>
          }
        />

        {/* Both roles can see Live Map */}
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <LiveMap />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route
  path="/student"
  element={
    <ProtectedRoute role="student">
      <StudentPanel />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminPanel />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
