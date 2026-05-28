import { useEffect, useRef } from 'react';

export default function MiniChart({ up = true, width = 60, height = 30 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const pts = Array.from({ length: 20 }, (_, i) =>
      Math.sin(i * 0.5 + (Math.random() - 0.5)) * 12 + 16 + (up ? i * 0.4 : -i * 0.4)
    );
    const mn = Math.min(...pts), mx = Math.max(...pts), rng = mx - mn || 1;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = i * (width / (pts.length - 1));
      const y = (height - 4) - ((p - mn) / rng) * (height - 6);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    const color = up ? '#00ff88' : '#ff4466';
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.lineTo(width, height); ctx.lineTo(0, height); ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, up ? 'rgba(0,255,136,0.22)' : 'rgba(255,68,102,0.22)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad; ctx.fill();
  }, [up, width, height]);
  return <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block' }} />;
}
