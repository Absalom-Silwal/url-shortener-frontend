import React from 'react';
import { Link2, Sun, Moon } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, darkMode, toggleDark, config, isDark }) => {
  const { surface_color, text_color, primary_action, secondary_action, font_size } = config;
  
  const surface = isDark ? "#1f2937" : surface_color;
  const text = isDark ? "#f3f4f6" : text_color;
  const textMuted = isDark ? "#9ca3af" : secondary_action;
  const primary = primary_action;
  const baseSize = font_size;

  return (
    <header style={{ background: surface }} className={`sticky top-0 z-50 shadow-sm border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <Link2 style={{ color: primary, width: '22px', height: '22px' }} />
          <span style={{ fontSize: `${baseSize * 1.25}px`, color: text }} className="font-bold">Shortly</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('home')} 
            style={{ color: activeTab === 'home' ? primary : textMuted, fontSize: `${baseSize * 0.875}px` }} 
            className={`font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} transition-colors`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            style={{ color: activeTab === 'analytics' ? primary : textMuted, fontSize: `${baseSize * 0.875}px` }} 
            className={`font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} transition-colors`}
          >
            Analytics
          </button>
          <button 
            onClick={toggleDark} 
            style={{ color: textMuted }} 
            className={`p-2 rounded-lg hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} transition-colors`}
          >
            {isDark ? <Sun style={{ width: '18px', height: '18px' }} /> : <Moon style={{ width: '18px', height: '18px' }} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
