'use client'; // Mark this as a Client Component

import React, { useState } from "react";
import SearchInput from "./SearchInput"; // Update the import path
import { FilePen } from "lucide-react";

const TodoListBar = ({
  todos,
  searchQuery,
  setSearchQuery,
  startNewTask,
  setIsCreatingNew,
  setIsEditing,
  setTitle,
  setDescription,
  selectedTodo,
  setSelectedTodo,
  setShowDetail,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const selectTodo = (todo) => {
    setSelectedTodo(todo);
    setShowDetail(true);
    setIsCreatingNew(false);
    setIsEditing(false);
  };

  return (
    <div className="w-full sm:-mt-3 sm:w-1/3 flex bg-gray-100 flex-col overflow-hidden m-4 lg:mt-4">
      {/* Search bar */}
      <div className="pb-4 flex justify-between items-center">
        <button
          onClick={startNewTask}
          className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
        >
          <FilePen className="mr-2" size={16} />
          TODO
        </button>
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Todo List */}
      <div className="overflow-y-auto flex-1">
        {todos.length === 0 ? (
          <div className="p-4 text-center mt-20 text-gray-500">
            No tasks found
            <button
              onClick={startNewTask}
              className="block mx-auto mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Create New Task
            </button>
          </div>
        ) : (
          <ul className="py-3 space-y-4">
            {todos.map((todo, index) => (
              <li
                key={index}
                onClick={() => selectTodo(todo)}
                className={`p-4 border rounded-lg shadow bg-white relative cursor-pointer transition-all ${
                  selectedTodo?._id === todo?._id
                    ? "border-gray-900 border-2 shadow-md"
                    : "border-gray-300"
                }`}
              >
                <h3 className="text-lg font-bold">{todo.title}</h3>
                {todo.description ? (
                  <div
                    className="text-gray-600 mt-1 w-[75%]"
                    dangerouslySetInnerHTML={{ __html: todo.description }}
                  />
                ) : (
                  <p className="text-gray-500 italic">No description provided</p>
                )}
                <p className="text-sm text-gray-500 absolute bottom-2 right-2">
                  {formatDate(todo.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoListBar;