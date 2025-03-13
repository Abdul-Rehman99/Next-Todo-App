'use client'; // Mark this as a Client Component

import React, { useState, useEffect } from 'react';
import { Check, X, Edit, Trash2, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TodoDetailView = ({
  addTodo,
  updateTodo,
  deleteTodo,
  startNewTask,
  isCreatingNew,
  error,
  setError,
  isEditing,
  selectedTodo,
  title,
  description,
  setTitle,
  setDescription,
  setIsCreatingNew,
  setIsEditing,
  setShowDetail,
}) => {
  // Quill editor modules config
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);

  // Update isMobile state when screen resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Start editing a task
  const startEditing = () => {
    setIsCreatingNew(false);
    setIsEditing(true);
    setError(null);
    setTitle(selectedTodo.title);
    setDescription(selectedTodo.description);
  };

  // Cancel editing or creating a new task
  const handleCancel = () => {
    setIsCreatingNew(false);
    setIsEditing(false);
    setError(null);
  };

  // Save a task (create or update)
  const handleSave = () => {
    if (!title.trim()) {
      setError('Title is required!');
      return;
    }

    if (isCreatingNew) {
      addTodo(title, description);
      setIsCreatingNew(false);
    } else {
      updateTodo(selectedTodo._id, { title, description });
      setIsEditing(false);
    }

    if (isMobile) {
      setShowDetail(false);
    }
  };

  return (
    <>
      {/* Back Button for Mobile */}
      {isMobile && (
        <div className="fixed top-16 left-4 z-50">
          <button
            onClick={() => setShowDetail(false)}
            className="flex items-center py-3 text-gray-800 hover:text-gray-600"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full sm:w-2/3 bg-white rounded-lg shadow p-4 m-4">
        {isCreatingNew || isEditing ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {isCreatingNew ? 'Create New Task' : 'Edit Task'}
            </h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="What needs to be done?"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Task Description
              </label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={modules}
                placeholder="Add details about your task..."
                className="bg-white"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                {isCreatingNew ? 'Add Task' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 flex items-center"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : selectedTodo ? (
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-800 font-semibold text-center sm:text-left">
                {selectedTodo.title}
              </h2>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={startEditing}
                  className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this task?')) {
                      deleteTodo(selectedTodo._id);
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border min-h-48 ql-editor">
              {selectedTodo.description ? (
                <div dangerouslySetInnerHTML={{ __html: selectedTodo.description }} />
              ) : (
                <p className="text-gray-500 italic">No description provided</p>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Created: {new Date(selectedTodo.createdAt).toLocaleString()}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="mb-4">Select a task or create a new one</p>
              <button
                onClick={startNewTask}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Create New Task
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoDetailView;