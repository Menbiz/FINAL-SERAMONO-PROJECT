import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherSubmissions from './pages/teacher/TeacherSubmissions';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';

// PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children, role }) => {
  const { currentRole } = useSelector(state => state.user);
  return currentRole === role ? children : <Navigate to="/" />;
};

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      <Routes>
        {/* Routes for unauthenticated users */}
        {currentRole === null && (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/choose" element={<ChooseUser visitor="normal" />} />
            <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />
            <Route path="/adminlogin" element={<LoginPage role="Admin" />} />
            <Route path="/studentlogin" element={<LoginPage role="Student" />} />
            <Route path="/teacherlogin" element={<LoginPage role="Teacher" />} />
            <Route path="/adminregister" element={<AdminRegisterPage />} />
            {/* Redirect all unknown routes to Homepage */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Routes for authenticated Admin */}
        <Route path="/admin/*" element={
          <PrivateRoute role="Admin">
            <AdminDashboard />
          </PrivateRoute>
        } />

        {/* Routes for authenticated Student */}
        <Route path="/student/*" element={
          <PrivateRoute role="Student">
            <StudentDashboard />
          </PrivateRoute>
        } />

        {/* Routes for authenticated Teacher */}
        <Route path="/teacher/dashboard" element={
          <PrivateRoute role="Teacher">
            <TeacherDashboard />
          </PrivateRoute>
        } />
        <Route path="/teacher/submissions" element={
          <PrivateRoute role="Teacher">
            <TeacherSubmissions />
          </PrivateRoute>
        } />

        {/* Redirect all unknown routes to Homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
