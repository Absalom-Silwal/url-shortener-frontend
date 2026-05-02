import React, { useEffect, useState } from 'react';
import { MousePointerClick, Link, TrendingUp } from 'lucide-react';
import client from '../../api/client';

const AnalyticsSection = ({ config, isDark }) => {
  const { surface_color, text_color, secondary_action, primary_action, font_size } = config;
  
  const surface = isDark ? "#1f2937" : surface_color;
  const text = isDark ? "#f3f4f6" : text_color;
  const textMuted = isDark ? "#ffff" : surface_color;
  const primary = primary_action;
  const baseSize = font_size;
  const [stats,setStats] = useState([])
  const [chartData,setChartData] = useState({})

 

  const fetchAnalytics = async()=>{
      const response = await client.get('/analytics');
      const {totalLinks,totalClicks,avgClicks,clicksThisWeek} = response.data.analytics
      setStats([
        { label: "Total Clicks", value: totalClicks, icon: MousePointerClick, color: "#2563eb" },
        { label: "Links Created", value: totalLinks, icon: Link, color: "#10b981" },
        { label: "Avg. Clicks/Link", value: avgClicks, icon: TrendingUp, color: "#f59e0b" },
      ])
      setChartData(clicksThisWeek)
    };

  useEffect(()=>{
    fetchAnalytics()
  },[]);
  const maxVal = Math.max(...Object.values(chartData));
  return (
    <section className="fade-up">
      <h1 style={{ fontSize: `${baseSize * 1.75}px`, color: text }} className="font-bold mb-8">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((st, i) => (
          <div key={i} style={{ background: surface }} className={`rounded-2xl p-5 border ${isDark ? 'border-gray-700' : 'border-gray-100'} shadow-sm`}>
            <div className="flex items-center gap-3 mb-2">
              <div style={{ background: `${st.color}15` }} className="w-10 h-10 rounded-xl flex items-center justify-center">
                <st.icon style={{ color: st.color, width: '20px', height: '20px' }} />
              </div>
              <span style={{ color: text, fontSize: `${baseSize * 0.8}px` }} className="font-medium">{st.label}</span>
            </div>
            <p style={{ fontSize: `${baseSize * 1.75}px`, color: text }} className="font-bold">{st.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: surface }} className={`rounded-2xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-100'} shadow-sm`}>
        <h3 style={{ fontSize: `${baseSize * 1.1}px`, color: text }} className="font-semibold mb-6">Clicks This Week</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {Object.keys(chartData).map((day) => (
            <div key={day} 
              style={{ height: `${(chartData[day] / maxVal) * 100}%`, background: primary }} 
              className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full max-w-[40px] rounded-lg opacity-80 hover:opacity-100 transition-opacity"
              ></div>
              <span style={{ color: textMuted, fontSize: `${baseSize * 0.7}px` }}>{day.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
