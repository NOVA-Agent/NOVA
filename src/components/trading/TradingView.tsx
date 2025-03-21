import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, LineStyle } from 'lightweight-charts';

// 模拟数据
const initialData = [
  { time: '2023-11-27', open: 72.15, high: 75.62, low: 71.32, close: 74.90 },
  { time: '2023-11-28', open: 74.90, high: 78.31, low: 74.57, close: 76.42 },
  { time: '2023-11-29', open: 76.42, high: 79.89, low: 75.85, close: 78.73 },
  { time: '2023-11-30', open: 78.73, high: 81.18, low: 77.95, close: 80.54 },
  { time: '2023-12-01', open: 80.54, high: 82.76, low: 79.25, close: 82.15 },
  { time: '2023-12-04', open: 82.15, high: 84.35, low: 81.40, close: 83.78 },
  { time: '2023-12-05', open: 83.78, high: 86.12, low: 83.10, close: 85.92 },
  { time: '2023-12-06', open: 85.92, high: 88.25, low: 85.15, close: 87.31 },
  { time: '2023-12-07', open: 87.31, high: 89.87, low: 86.54, close: 89.31 },
  { time: '2023-12-08', open: 89.31, high: 91.25, low: 88.63, close: 90.52 },
  { time: '2023-12-11', open: 90.52, high: 92.36, low: 89.78, close: 91.85 },
  { time: '2023-12-12', open: 91.85, high: 93.17, low: 90.25, close: 92.46 },
  { time: '2023-12-13', open: 92.46, high: 94.68, low: 91.57, close: 93.85 },
  { time: '2023-12-14', open: 93.85, high: 95.12, low: 92.63, close: 94.21 },
  { time: '2023-12-15', open: 94.21, high: 96.35, low: 93.78, close: 95.87 },
  { time: '2023-12-18', open: 95.87, high: 97.25, low: 94.65, close: 96.54 },
  { time: '2023-12-19', open: 96.54, high: 98.18, low: 95.36, close: 97.32 },
  { time: '2023-12-20', open: 97.32, high: 99.45, low: 96.47, close: 98.91 },
  { time: '2023-12-21', open: 98.91, high: 101.23, low: 98.15, close: 100.85 },
  { time: '2023-12-22', open: 100.85, high: 102.75, low: 99.63, close: 102.45 },
];

const volumeData = initialData.map(item => ({
  time: item.time,
  value: Math.random() * 1000000 + 500000,
}));

const TradingView: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
  const candlestickSeries = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeries = useRef<ISeriesApi<"Histogram"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 创建图表实例
    chart.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#080c14' }, // dark-400
        textColor: '#9ca3af', // gray-400
      },
      grid: {
        vertLines: { color: 'rgba(12, 16, 26, 0.6)', style: LineStyle.Dotted }, // dark-300
        horzLines: { color: 'rgba(12, 16, 26, 0.6)', style: LineStyle.Dotted }, // dark-300
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#0c101a', // dark-300
      },
      rightPriceScale: {
        borderColor: '#0c101a', // dark-300
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(80, 17, 255, 0.4)', // primary-500 with opacity
          width: 1,
          style: 3,
        },
        horzLine: {
          color: 'rgba(80, 17, 255, 0.4)', // primary-500 with opacity
          width: 1,
          style: 3,
        },
      },
    });

    // 添加K线图序列
    candlestickSeries.current = chart.current.addCandlestickSeries({
      upColor: '#10b981', // success
      downColor: '#ef4444', // error
      borderUpColor: '#10b981', // success
      borderDownColor: '#ef4444', // error
      wickUpColor: '#10b981', // success
      wickDownColor: '#ef4444', // error
    });

    // 添加成交量序列
    volumeSeries.current = chart.current.addHistogramSeries({
      color: '#5011ff', // primary-500
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // 与主图表分开
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // 设置数据
    candlestickSeries.current.setData(initialData);
    volumeSeries.current.setData(volumeData);

    // 适合内容
    chart.current.timeScale().fitContent();

    // 自适应窗口大小
    const handleResize = () => {
      if (chart.current && chartContainerRef.current) {
        chart.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart.current) {
        chart.current.remove();
        chart.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div ref={chartContainerRef} className="h-full w-full" />
    </div>
  );
};

export default TradingView; 