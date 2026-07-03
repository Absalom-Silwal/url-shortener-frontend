import React from 'react';
import { Link, BarChart2, Copy, Check } from 'lucide-react';

const HistoryList = ({ history, copied, onCopy, config, isDark }) => {
  const { surface_color, text_color, secondary_action, primary_action, font_size } = config;
  
  const surface = isDark ? "#1f2937" : surface_color;
  const text = isDark ? "#f3f4f6" : text_color;
  const textMuted = isDark ? "#9ca3af" : secondary_action;
  const primary = primary_action;
  const baseSize = font_size;

  return (
    <section className="fade-up-delay">
      <h2 style={{ fontSize: `${baseSize * 1.35}px`, color: text }} className="font-bold mb-5">Recent Links</h2>
      {history.length === 0 ? (
        <div style={{ background: surface }} className={`rounded-2xl p-12 text-center border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
          <Link style={{ color: textMuted, width: '48px', height: '48px', margin: '0 auto 16px' }} />
          <p style={{ color: textMuted, fontSize: `${baseSize}px` }}>No links shortened yet. Paste a URL above to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map(item => (
            <div key={item.id} style={{ background: surface }} className={`rounded-2xl p-4 sm:p-5 border ${isDark ? 'border-gray-700' : 'border-gray-100'} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <a href="#" style={{ color: primary, fontSize: `${baseSize}px` }} className="font-semibold hover:underline">{item.short_code}</a>
                  <p style={{ color: textMuted, fontSize: `${baseSize * 0.8}px` }} className="truncate mt-0.5">{item.long_url}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span style={{ color: textMuted, fontSize: `${baseSize * 0.8}px` }} className="flex items-center gap-1">
                    <BarChart2 style={{ width: '14px', height: '14px' }} />
                    {item.clicks}
                  </span>
                  <span style={{ color: textMuted, fontSize: `${baseSize * 0.75}px` }}>{item.created}</span>
                  <button 
                    onClick={() => onCopy(item.short, item.id)} 
                    style={{ color: primary }}
                    className={`p-2 rounded-lg hover:bg-blue-50 ${isDark ? 'hover:bg-blue-900/20' : ''} transition-colors`}
                  >
                    {copied === String(item.id) ? <Check style={{ width: '16px', height: '16px' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HistoryList;
