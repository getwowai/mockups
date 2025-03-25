import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="w-full px-4 md:px-6 py-3 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        {/* Add other header content here */}
      </div>
    </header>
  );
};

export default Header; 