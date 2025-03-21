import React, { useState, useEffect, useRef } from 'react';
import { useStrategyStore, CanvasComponent } from '@/store/useStrategyStore';

interface CanvasPosition {
  x: number;
  y: number;
}

interface DraggingState {
  isDragging: boolean;
  componentId: string | null;
  startPos: CanvasPosition;
  currentPos: CanvasPosition;
}

export default function StrategyCanvas() {
  const { components, updateComponentPosition, removeComponent } = useStrategyStore();
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [dragging, setDragging] = useState<DraggingState>({
    isDragging: false,
    componentId: null,
    startPos: { x: 0, y: 0 },
    currentPos: { x: 0, y: 0 },
  });
  const [canvasOffset, setCanvasOffset] = useState<CanvasPosition>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Initialize canvas offset
  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasOffset({ x: rect.left, y: rect.top });
    }
  }, []);

  // Handle keyboard delete events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedComponentId && (e.key === 'Delete' || e.key === 'Backspace')) {
        removeComponent(selectedComponentId);
        setSelectedComponentId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponentId, removeComponent]);

  // Start dragging component
  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (!component) return;

    setDragging({
      isDragging: true,
      componentId,
      startPos: { x: e.clientX, y: e.clientY },
      currentPos: { x: e.clientX, y: e.clientY },
    });
    setSelectedComponentId(componentId);
    e.stopPropagation();
  };

  // Update position during dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.isDragging || !dragging.componentId) return;

    setDragging(prev => ({
      ...prev,
      currentPos: { x: e.clientX, y: e.clientY },
    }));

    // Find the component being dragged
    const component = components.find(c => c.id === dragging.componentId);
    if (!component) return;

    // Calculate new position
    const deltaX = e.clientX - dragging.startPos.x;
    const deltaY = e.clientY - dragging.startPos.y;
    
    // Update component position
    updateComponentPosition(dragging.componentId, {
      x: component.position.x + deltaX,
      y: component.position.y + deltaY,
    });

    // Update starting position to current position to avoid cumulative offset
    setDragging(prev => ({
      ...prev,
      startPos: { x: e.clientX, y: e.clientY },
    }));
  };

  // Stop dragging
  const handleMouseUp = () => {
    setDragging({
      isDragging: false,
      componentId: null,
      startPos: { x: 0, y: 0 },
      currentPos: { x: 0, y: 0 },
    });
  };

  // Canvas click event - clear selected component
  const handleCanvasClick = () => {
    setSelectedComponentId(null);
  };

  // Draw connections between components
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    components.forEach(component => {
      component.connections.forEach(conn => {
        const target = components.find(c => c.id === conn.targetId);
        if (!target) return;
        
        // Simply draw a line from source component center to target component center
        const sourceX = component.position.x + 100; // Assuming component width is 200
        const sourceY = component.position.y + 50;  // Assuming component height is 100
        const targetX = target.position.x;
        const targetY = target.position.y + 50;
        
        connections.push(
          <svg key={conn.id} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <line
              x1={sourceX}
              y1={sourceY}
              x2={targetX}
              y2={targetY}
              stroke="#8884d8"
              strokeWidth={2}
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#8884d8" />
              </marker>
            </defs>
          </svg>
        );
      });
    });
    
    return connections;
  };

  // Render each component
  const renderComponents = () => {
    return components.map(component => (
      <div
        key={component.id}
        className={`absolute p-3 w-[200px] rounded-lg cursor-grab ${
          selectedComponentId === component.id
            ? 'border-2 border-purple-500 bg-gray-800'
            : 'border border-gray-700 bg-gray-900'
        }`}
        style={{
          left: `${component.position.x}px`,
          top: `${component.position.y}px`,
          zIndex: selectedComponentId === component.id ? 10 : 1,
        }}
        onMouseDown={(e) => handleMouseDown(e, component.id)}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedComponentId(component.id);
        }}
      >
        <div className="flex items-start gap-2">
          <div className="text-xl">{getIconForType(component.type)}</div>
          <div>
            <h3 className="font-medium text-white">{component.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{component.description}</p>
          </div>
        </div>
        
        {/* Component properties */}
        {Object.keys(component.properties).length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            {Object.entries(component.properties).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-xs mt-1">
                <span className="text-gray-400">{key}:</span>
                <span className="text-white">{renderPropertyValue(value)}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Connection points */}
        <div className="absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-purple-500 cursor-pointer" />
        <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-purple-500 cursor-pointer" />
      </div>
    ));
  };

  // Convert property value to string for display
  const renderPropertyValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return value.toString();
  };

  // Get icon based on component type
  const getIconForType = (type: string): string => {
    switch (type) {
      case 'indicator':
        return '📊';
      case 'entryCondition':
        return '⬆️';
      case 'exitCondition':
        return '⬇️';
      case 'positionSizing':
        return '💰';
      case 'riskManagement':
        return '🛡️';
      default:
        return '🧩';
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full bg-gray-950 border border-gray-800 rounded-lg relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleCanvasClick}
    >
      {renderConnections()}
      {renderComponents()}
      
      {/* Grid background */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0" 
        style={{
          backgroundSize: '20px 20px',
          backgroundImage: 'linear-gradient(to right, rgba(64, 64, 64, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(64, 64, 64, 0.1) 1px, transparent 1px)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Empty canvas prompt */}
      {components.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 pointer-events-none">
          <div className="text-center">
            <p>Add components from the library on the left to this canvas</p>
            <p className="mt-2 text-sm">Drag components to adjust their position</p>
          </div>
        </div>
      )}
    </div>
  );
} 