import React from 'react';
import { AlertCircle } from 'lucide-react';

const URLForm = ({ url, setUrl, alias, setAlias, error, setError, loading, onShorten, config, isDark }) => {
  const { surface_color, text_color, primary_action, font_size } = config;
  
  const surface = isDark ? "#1f2937" : surface_color;
  const text = isDark ? "#f3f4f6" : text_color;
  const primary = primary_action;
  const baseSize = font_size;

  const handleSubmit = (e) => {
    e.preventDefault();
    onShorten();
  };

  return (
    <section className="fade-up-delay max-w-2xl mx-auto mb-10">
      <form onSubmit={handleSubmit} style={{ background: surface }} className={`rounded-2xl shadow-lg p-6 sm:p-8 border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="url" 
            value={url} 
            onChange={(e) => { setUrl(e.target.value); if(error) setError(''); }}
            placeholder="Paste your long URL here..."
            style={{ fontSize: `${baseSize}px`, background: isDark ? '#374151' : '#f3f4f6', color: text }}
            className="flex-1 px-5 py-3.5 rounded-xl border-0 outline-none focus:ring-2 focus:ring-blue-400 transition-shadow placeholder-gray-400" 
          />
          <button 
            type="submit"
            style={{ background: primary, fontSize: `${baseSize}px` }}
            className="px-7 py-3.5 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all whitespace-nowrap disabled:opacity-60"
            disabled={loading}
          >
            {loading ? <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Shorten'}
          </button>
        </div>
        {/* <input 
          value={alias} 
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Custom alias (optional)"
          style={{ fontSize: `${baseSize * 0.875}px`, background: isDark ? '#374151' : '#f3f4f6', color: text }}
          className="w-full mt-3 px-5 py-2.5 rounded-xl border-0 outline-none focus:ring-2 focus:ring-blue-400 transition-shadow placeholder-gray-400" 
        /> */}
        {error && (
          <p className="mt-3 text-red-500 text-sm flex items-center gap-1.5">
            <AlertCircle style={{ width: '14px', height: '14px' }} />
            {error}
          </p>
        )}
      </form>
    </section>
  );
};

export default URLForm;
