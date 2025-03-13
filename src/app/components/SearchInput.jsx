'use client'; // Mark this as a Client Component

import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchInput({ searchQuery, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      {isOpen && (
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-2 focus:outline-none transition-all w-48"
        />
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-white rounded-md hover:bg-gray-200 transition"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Search className="w-6 h-6 text-gray-900" />}
      </button>
    </div>
  );
}