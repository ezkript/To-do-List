import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TodoList';
import '@mantine/core/styles.css';
import TaskPage from './components/TodoTask';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mylists" element={<TaskList />} />
        <Route path="/mylists/:listId" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
