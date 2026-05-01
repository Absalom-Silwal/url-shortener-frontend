import React from 'react';
import { CheckCircle, Copy, Check, ExternalLink } from 'lucide-react';

const ResultCard = ({ result, copied, onCopy, config, isDark }) => {
  const { surface_color, primary_action, font_size } = config;
  
  const surface = isDark ? "#1f2937" : surface_color;
  const primary = primary_action;
  const baseSize = font_size;

  if (!result) return null;

  return (
    <section className="max-w-2xl mx-auto mb-12 fade-up">
      <div style={{ background: surface, borderLeft: `4px solid ${primary}` }} className={`rounded-2xl shadow-md p-6 border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle style={{ color: '#10b981', width: '20px', height: '20px' }} />
          <span style={{ color: '#10b981', fontSize: `${baseSize * 0.875}px` }} className="font-semibold">URL shortened successfully!</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
          <a href={result} target="_blank" rel="noopener noreferrer" style={{ color: primary, fontSize: `${baseSize * 1.1}px` }} className="font-bold hover:underline break-all">
            {result}
          </a>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => onCopy(result, 'result')} 
              style={{ borderColor: primary, color: primary }}
              className={`px-4 py-2 rounded-lg border-2 font-medium text-sm hover:bg-blue-50 ${isDark ? 'hover:bg-blue-900/20' : ''} transition-colors flex items-center gap-1.5`}
            >
              {copied === 'result' ? <Check style={{ width: '14px', height: '14px' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
              {copied === 'result' ? 'Copied!' : 'Copy'}
            </button>
            <a 
              href={result} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ background: primary }}
              className="px-4 py-2 rounded-lg text-white font-medium text-sm hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <ExternalLink style={{ width: '14px', height: '14px' }} />
              Open
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultCard;
