
import { useEffect, useState } from "react";

// Canvas confetti style component
const Confetti = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Create confetti particles
    const colors = [
      "#8B5CF6", // purple
      "#D946EF", // pink
      "#FBBF24", // yellow
      "#34D399", // green
      "#60A5FA", // blue
    ];
    
    const newParticles = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      // Random position on the screen
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random animation duration and delay
      const animationDuration = 3 + Math.random() * 2;
      const animationDelay = Math.random() * 0.5;
      
      // Random size
      const size = 5 + Math.random() * 10;
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Random rotation
      const rotation = Math.random() * 360;
      
      // Create particle
      newParticles.push(
        <div
          key={i}
          className="fixed z-50"
          style={{
            left: `${left}%`,
            top: `-5%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            transform: `rotate(${rotation}deg)`,
            animation: `confetti ${animationDuration}s ease-in-out ${animationDelay}s forwards`,
            opacity: 0,
          }}
        />
      );
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      {particles}
    </>
  );
};

export default Confetti;
