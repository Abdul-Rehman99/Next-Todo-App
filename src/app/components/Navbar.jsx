'use client'; // Mark this as a Client Component

import Image from 'next/image'; // Use Next.js Image component for optimized images
// import logo from '../assets/todo_logo.svg'; // Update the import path

const Navbar = ({ isMobile }) => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 h-16">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center">
          <div className="flex items-center">
            <Image src={'/todo_logo.svg'} alt="todo-logo" width={40} height={40} /> {/* Use Next.js Image component */}
            <span className="ml-2 text-2xl font-bold text-gray-800">TODO</span>
          </div>
        </div>
      </nav>
      {isMobile ? <div className="sm:h-12 mb-8"></div> : ''}
    </div>
  );
};

export default Navbar;