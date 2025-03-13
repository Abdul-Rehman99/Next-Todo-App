'use client'; // Mark this as a Client Component

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './components/Navbar';
import TodoListBar from './components/TodoListBar';
import TodoDetailView from './components/TodoDetailView';

const App = () => {
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Update environment variable

  // Update isMobile state when screen resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch todos based on search query
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/todos?search=${searchQuery}`);
        setTodos(response.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };
    fetchTodos();
  }, [searchQuery]);

  // Add a new todo
  const addTodo = async (title, description) => {
    try {
      const newTodo = {
        title: title.trim(),
        description,
      };
      const response = await axios.post(`${BACKEND_URL}/api/todos`, newTodo);
      const updatedTodos = [response.data, ...todos];
      setTodos(updatedTodos);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  // Update a todo
  const updateTodo = async (id, updatedData) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/todos/${id}`, updatedData);
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setSelectedTodo(response.data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
      setSelectedTodo(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Start creating a new task
  const startNewTask = () => {
    setTitle("");
    setDescription("");
    setError(null);
    setIsEditing(false);
    setShowDetail(true);
    setIsCreatingNew(true);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar isMobile={isMobile} />
      <div className="flex flex-1 overflow-hidden pt-16">
        {!isMobile ? (
          // Show both components side by side on larger screens
          <>
            <TodoListBar
              todos={todos}
              setSelectedTodo={setSelectedTodo}
              startNewTask={startNewTask}
              setShowDetail={setShowDetail}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsCreatingNew={setIsCreatingNew}
              setIsEditing={setIsEditing}
              setDescription={setDescription}
              setTitle={setTitle}
              selectedTodo={selectedTodo}
              error={error}
            />
            <TodoDetailView
              setShowDetail={setShowDetail}
              setIsCreatingNew={setIsCreatingNew}
              isCreatingNew={isCreatingNew}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              title={title}
              description={description}
              setTitle={setTitle}
              setDescription={setDescription}
              selectedTodo={selectedTodo}
              addTodo={addTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              startNewTask={startNewTask}
              error={error}
              setError={setError}
            />
          </>
        ) : showDetail ? (
          // Show only TodoDetail on mobile
          <TodoDetailView
            setShowDetail={setShowDetail}
            setIsCreatingNew={setIsCreatingNew}
            isCreatingNew={isCreatingNew}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            selectedTodo={selectedTodo}
            addTodo={addTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            startNewTask={startNewTask}
            error={error}
            setError={setError}
          />
        ) : (
          // Show only TodoList on mobile
          <TodoListBar
            setShowDetail={setShowDetail}
            todos={todos}
            setIsCreatingNew={setIsCreatingNew}
            setIsEditing={setIsEditing}
            setDescription={setDescription}
            setTitle={setTitle}
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
            startNewTask={startNewTask}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default App;