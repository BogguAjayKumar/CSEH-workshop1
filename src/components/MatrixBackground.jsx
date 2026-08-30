import React, { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cyber security symbols & binary code
    const alphabet = "01011001011001010110011001010101101011010101010101010101010101";
    const chars = alphabet.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Track state of each stream
    const streams = [];
    for (let i = 0; i < columns; i++) {
      streams.push({
        y: Math.random() * -100, // randomized starting offset
        speed: 1 + Math.random() * 2, // speed variance for 3D depth
        fontSize: fontSize * (0.6 + Math.random() * 0.8), // scale size for 3D depth
        colorType: Math.random() > 0.4 ? 'green' : 'cyan' // mixture of green and cyan streams
      });
    }

    const draw = () => {
      // Semi-transparent overlay to create trailing fade effect
      ctx.fillStyle = 'rgba(7, 9, 14, 0.09)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        
        // Pick character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        const x = i * fontSize;
        const y = stream.y * fontSize;

        // Visual depth layering
        ctx.font = `${stream.fontSize}px 'JetBrains Mono', monospace`;

        // Apply glow
        ctx.shadowBlur = 6;
        if (stream.colorType === 'green') {
          ctx.fillStyle = 'rgba(57, 255, 20, 0.25)';
          ctx.shadowColor = 'rgba(57, 255, 20, 0.4)';
        } else {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
          ctx.shadowColor = 'rgba(0, 240, 255, 0.3)';
        }

        ctx.fillText(text, x, y);

        // Reset shadow to prevent bleeding into other drawings
        ctx.shadowBlur = 0;

        // Increment drop coordinate
        stream.y += stream.speed;

        // Reset stream once it falls off the bottom
        if (y > canvas.height && Math.random() > 0.98) {
          stream.y = 0;
          stream.speed = 1 + Math.random() * 2;
          stream.colorType = Math.random() > 0.45 ? 'green' : 'cyan';
        }
      }
    };

    const interval = setInterval(draw, 33); // ~30 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -3, 
        pointerEvents: 'none' 
      }} 
    />
  );
}
