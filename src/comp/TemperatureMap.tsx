import React, { useRef, useEffect } from 'react';
import  getColorFromTemperature  from '../utils/getColorFromTemperature';
interface TemperatureMapProps {
  temperatureData: Uint8Array|[];
  width: number;
  height: number;
}

const TemperatureMap: React.FC<TemperatureMapProps> = ({ temperatureData, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = '/empty-map.jpg'; 

    img.onload = () => {
      const scale = 0.1; 
      const scaledWidth = Math.floor(width * scale);
      const scaledHeight = Math.floor(height * scale);

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      for (let y = 0; y < scaledHeight; y++) {
        for (let x = 0; x < scaledWidth; x++) {
          const originalX = Math.floor(x / scale);
          const originalY = Math.floor((scaledHeight - y) / scale);
          const index = originalY * width + originalX;
          const temp = temperatureData[index];
          const color = getColorFromTemperature(temp);
          
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
          ctx.fillRect(x, y, 1, 1); 
        }
      }
    };
  }, [temperatureData, width, height]);

  return (
    <div>
     {width?<canvas ref={canvasRef} style={{position:'absolute', width: '100%' }} />:<img
        src={'/empty-map.jpg'}
        alt="World Map"
        style={{ display: 'flex', width: '100%' }}
      />}
      
      </div>
  );
};

export default TemperatureMap;
