// components/ZoomPanWrapper.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/ZoomPanWrapper.css';

const ZoomPanWrapper = ({ 
  children, 
  initialScale = 1, 
  minScale = 0.5, 
  maxScale = 3,
  className = '' 
}) => {
  const [scale, setScale] = useState(initialScale);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newScale = Math.min(maxScale, Math.max(minScale, scale + delta));
    
    // Zoom towards mouse position
    const scaleChange = newScale - scale;
    setTranslate(prev => ({
      x: prev.x - (mouseX - prev.x) * (scaleChange / scale),
      y: prev.y - (mouseY - prev.y) * (scaleChange / scale)
    }));
    
    setScale(newScale);
  }, [scale, minScale, maxScale]);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setStartPos({ 
      x: e.clientX - translate.x, 
      y: e.clientY - translate.y 
    });
    containerRef.current.style.cursor = 'grabbing';
  }, [translate]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    setTranslate({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  }, [isDragging, startPos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, []);

  const resetView = useCallback(() => {
    setScale(initialScale);
    setTranslate({ x: 0, y: 0 });
  }, [initialScale]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // Double click to reset view
  const handleDoubleClick = useCallback((e) => {
    e.preventDefault();
    resetView();
  }, [resetView]);

  return (
    <div
      className={`zoom-pan-container ${className}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="svg-wrapper"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        {children}
      </div>
      
      <div className="zoom-controls">
        <button onClick={() => setScale(s => Math.min(maxScale, s + 0.1))}>+</button>
        <button onClick={() => setScale(s => Math.max(minScale, s - 0.1))}>-</button>
        <button onClick={resetView}>Reset</button>
        <span>Zoom: {Math.round(scale * 100)}%</span>
      </div>
    </div>
  );
};

export default ZoomPanWrapper;