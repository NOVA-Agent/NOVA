import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, LineStyle, CrosshairMode } from 'lightweight-charts';

// Mock data
const mockData = [
  { time: '2023-01-01', open: 100, high: 105, low: 98, close: 103, volume: 1000 },
  { time: '2023-01-02', open: 103, high: 108, low: 102, close: 107, volume: 1200 },
  { time: '2023-01-03', open: 107, high: 110, low: 105, close: 106, volume: 800 },
  // ... more data
];

export const TradingView: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 600,
      layout: {
        background: { color: '#1E1E1E' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#2B2B2B' },
        horzLines: { color: '#2B2B2B' },
      },
      timeScale: {
        borderColor: '#2B2B2B',
      },
      rightPriceScale: {
        borderColor: '#2B2B2B',
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // Separate from main chart
    });

    volumeSeriesRef.current = volumeSeries;

    // Set data
    candlestickSeries.setData(mockData);
    volumeSeries.setData(mockData.map(d => ({ time: d.time, value: d.volume })));

    // Fit content
    chart.timeScale().fitContent();

    // Adapt to window size
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  return <div ref={chartContainerRef} />;
}; 