import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TodoList';
import '@mantine/core/styles.css';
import TaskPage from './components/TodoTask';
import Cookies from 'js-cookie';

function App() {
  const token = Cookies.get('token');

  return (
    <Router>
      <Routes>
      <Route path="/" element={token ?  <Navigate to="/mylists" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mylists" element={token ? <TaskList /> : <Navigate to="/login" />} />
        <Route
          path="/mylists/:listId"
          element={token ? <TaskPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
