import React, { useState, useEffect } from 'react';
import { Bar, Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { FileDown, RefreshCw } from 'lucide-react';
import { saveAs } from 'file-saver';
import { useDarkMode } from '../../../contexts/DarkModeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

type Period = 'day' | 'week' | 'month';

interface Trend {
  label: string;
  revenue: number;
  orderCount: number;
}

interface Best {
  productName: string;
  totalRevenue: number;
  totalQuantitySold: number;
}

interface LowAlert {
  name: string;
  quantity: number;
  lowStockThreshold: number;
}

const SalesAnalytics: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [period, setPeriod] = useState<Period>('week');
  const [trends, setTrends] = useState<Trend[]>([]);
  const [bestSelling, setBestSelling] = useState<Best[]>([]);
  const [lowStock, setLowStock] = useState<LowAlert[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------- data fetch ---------- */
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const [ tRes, bRes, lRes ] = await Promise.all([
        fetch(`/api/analytics/sales-trends?period=${period}`, { headers:{ Authorization:`Bearer ${token}` }}).then(r=>r.json()),
        fetch(`/api/analytics/best-selling?period=${period==='day'?1:period==='week'?7:30}`, { headers:{ Authorization:`Bearer ${token}` }}).then(r=>r.json()),
        fetch('/api/analytics/low-stock-alerts',           { headers:{ Authorization:`Bearer ${token}` }}).then(r=>r.json())
      ]);
      if (tRes.success) setTrends(tRes.salesTrends);
      if (bRes.success) setBestSelling(bRes.bestSelling);
      if (lRes.success) setLowStock(lRes.alerts);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchData(); }, [period]);

  /* ---------- export helpers ---------- */
  const exportData = async (type:'csv'|'pdf') => {
    const token = localStorage.getItem('token') || '';
    const res = await fetch(`/api/analytics/export?period=${period}&type=${type}`, {
      headers:{ Authorization:`Bearer ${token}` }
    });
    const blob = await res.blob();
    saveAs(blob, `sales-${period}.${type}`);
  };

  /* ---------- chart config ---------- */
  const colors = {
    text   : isDarkMode ? '#ffffff' : '#111827',
    grid   : isDarkMode ? '#374151' : '#e5e7eb',
    bar    : '#3b82f6',
    line   : '#10b981'
  };

  const revenueChart = {
    labels : trends.map(t=>t.label),
    datasets : [
      {
        type: 'bar' as const,
        label: 'Revenue (₹)',
        data: trends.map(t=>t.revenue),
        backgroundColor: colors.bar,
        borderRadius: 4
      },
      {
        type: 'line' as const,
        label: 'Orders',
        data: trends.map(t=>t.orderCount),
        borderColor: colors.line,
        backgroundColor: colors.line,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions:any = {
    responsive:true,
    scales:{
      x:{ ticks:{ color:colors.text }, grid:{ color:colors.grid } },
      y:{ ticks:{ color:colors.text }, grid:{ color:colors.grid } },
      y1:{ position:'right', ticks:{ color:colors.text }, grid:{ drawOnChartArea:false } }
    },
    plugins:{
      legend:{ labels:{ color:colors.text } }
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>
          Sales Analytics
        </h2>
        <div className="flex space-x-2">
          <button onClick={fetchData}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={()=>exportData('csv')}
                  className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-1">
            <FileDown className="h-4 w-4" /> <span className="hidden sm:inline">CSV</span>
          </button>
          <button onClick={()=>exportData('pdf')}
                  className="p-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white flex items-center space-x-1">
            <FileDown className="h-4 w-4" /> <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex space-x-2">
        {(['day','week','month'] as Period[]).map(p=>(
          <button key={p}
            onClick={()=>setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period===p
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}>
            {p.charAt(0).toUpperCase()+p.slice(1)}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className={`p-6 rounded-xl border ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <Chart type="bar" data={revenueChart} options={chartOptions} />
        )}
      </div>

      {/* Top Selling Items */}
      <div className={`p-6 rounded-xl border space-y-4 ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Top-selling Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${isDarkMode?'border-gray-600':'border-gray-200'}`}>
                <th className="py-2 text-left">Item</th>
                <th className="py-2 text-right">Qty Sold</th>
                <th className="py-2 text-right">Revenue (₹)</th>
              </tr>
            </thead>
            <tbody>
              {bestSelling.map(b=>(
                <tr key={b.productName} className={`border-b ${isDarkMode?'border-gray-700':'border-gray-100'}`}>
                  <td className="py-2">{b.productName}</td>
                  <td className="py-2 text-right">{b.totalQuantitySold}</td>
                  <td className="py-2 text-right">{b.totalRevenue.toLocaleString()}</td>
                </tr>
              ))}
              {bestSelling.length===0 && (
                <tr><td colSpan={3} className="py-4 text-center opacity-60">No data</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className={`p-6 rounded-xl border space-y-4 ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Low-stock Alerts</h3>
        {lowStock.length===0 ? (
          <p className="text-sm opacity-60">All good – no low-stock products.</p>
        ) : (
          <ul className="space-y-2">
            {lowStock.map(l=>(
              <li key={l.name} className="flex justify-between text-sm">
                <span>{l.name}</span>
                <span className="text-red-500">{l.quantity} left (≤ {l.lowStockThreshold})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SalesAnalytics;
