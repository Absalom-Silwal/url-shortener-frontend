import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import URLForm from './components/URLForm';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import AnalyticsSection from './components/AnalyticsSection';
import client from '../api/client';

const defaultConfig = {
  hero_heading: "Shorten your long URLs instantly",
  hero_subtext: "Fast, simple, and reliable — transform unwieldy links into clean, shareable URLs in one click.",
  background_color: "#f9fafb",
  surface_color: "#ffffff",
  text_color: "#1f2937",
  primary_action: "#2563eb",
  secondary_action: "#6b7280",
  font_family: "DM Sans",
  font_size: 16
};

const mockHistory = [
  { id: 1, short: "sho.rt/abc123", original: "https://www.example.com/very/long/path/to/some/resource/page?query=value&other=param", clicks: 142, created: "2024-01-15" },
  { id: 2, short: "sho.rt/xyz789", original: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit", clicks: 89, created: "2024-01-18" },
  { id: 3, short: "sho.rt/qwe456", original: "https://github.com/user/repository/tree/main/src/components/feature", clicks: 234, created: "2024-01-20" },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState(mockHistory);


  const config = defaultConfig;
  const isDark = darkMode;

  useEffect(() => {
    const bg = isDark ? "#111827" : config.background_color;
    document.body.style.backgroundColor = bg;
    document.body.style.color = isDark ? "#f3f4f6" : config.text_color;
  }, [isDark, config]);

  const handleShorten = async () => {
    if (!url || !url.match(/^https?:\/\/.+\..+/)) {
      setError("Please enter a valid URL (e.g. https://example.com)");
      return;
    }
    setLoading(true);
    setError("");
    

    const response = await client.post('/shorten', {url});
    const {long_url,short_url,short_code} = response.data
    setResult(short_url)
    setLoading(false)
    };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(String(id));
    setTimeout(() => setCopied(null), 1500);
  };

  const toggleDark = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-full w-full ${isDark ? 'dark' : ''}`}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        toggleDark={toggleDark} 
        config={config} 
        isDark={isDark} 
      />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {activeTab === 'home' ? (
          <>
            {/* Hero */}
            <section className="text-center mb-12 fade-up">
              <h1 style={{ fontSize: `${config.font_size * 2.25}px`, color: isDark ? '#f3f4f6' : config.text_color }} className="font-bold leading-tight mb-4">
                {config.hero_heading}
              </h1>
              <p style={{ fontSize: `${config.font_size * 1.1}px`, color: isDark ? '#9ca3af' : config.secondary_action }} className="mx-auto leading-relaxed max-w-[540px]">
                {config.hero_subtext}
              </p>
            </section>

            <URLForm 
              url={url} 
              setUrl={setUrl} 
              alias={alias} 
              setAlias={setAlias} 
              error={error} 
              setError={setError} 
              loading={loading} 
              onShorten={handleShorten} 
              config={config} 
              isDark={isDark} 
            />

            <ResultCard 
              result={result} 
              copied={copied} 
              onCopy={handleCopy} 
              config={config} 
              isDark={isDark} 
            />

            {/* <HistoryList 
              history={history} 
              copied={copied} 
              onCopy={handleCopy} 
              config={config} 
              isDark={isDark} 
            /> */}
          </>
        ) : (
          <AnalyticsSection config={config} isDark={isDark} />
        )}
      </main>
    </div>
  );
}

export default App;
