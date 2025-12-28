import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const innerDotRef = useRef(null);
  const outerRingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable cursor on desktop
    if (window.innerWidth <= 768) return;

    const cursor = cursorRef.current;
    const innerDot = innerDotRef.current;
    const outerRing = outerRingRef.current;
    
    if (!cursor || !innerDot || !outerRing) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let innerX = 0;
    let innerY = 0;

    // Update cursor position with smooth trailing effect
    const updateCursor = () => {
      // Outer ring - smoother trailing
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      // Inner dot - tighter trailing
      const innerDx = mouseX - innerX;
      const innerDy = mouseY - innerY;
      
      innerX += innerDx * 0.3;
      innerY += innerDy * 0.3;
      
      innerDot.style.left = innerX - cursorX + "px";
      innerDot.style.top = innerY - cursorY + "px";
      
      requestAnimationFrame(updateCursor);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }
      
      // Check for interactive elements
      const target = e.target;
      const isInteractive = target.closest("button, .resume-btn, .skill-item, .techstack-card, a");
      
      if (isInteractive) {
        cursor.classList.add("hover-interactive");
        gsap.to(outerRing, {
          scale: 1.5,
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(innerDot, {
          scale: 1.3,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        cursor.classList.remove("hover-interactive");
        gsap.to(outerRing, {
          scale: 1,
          opacity: 0.6,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(innerDot, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Mouse down handler
    const handleMouseDown = () => {
      gsap.to(innerDot, {
        scale: 0.8,
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(outerRing, {
        scale: 1.8,
        opacity: 0.3,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    // Mouse up handler
    const handleMouseUp = () => {
      const isInteractive = document.elementFromPoint(mouseX, mouseY)?.closest("button, .resume-btn, .skill-item, .techstack-card, a");
      
      gsap.to(innerDot, {
        scale: isInteractive ? 1.3 : 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
      gsap.to(outerRing, {
        scale: isInteractive ? 1.5 : 1,
        opacity: isInteractive ? 0.4 : 0.6,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    // Initialize cursor position
    updateCursor();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  return (
    <div className="custom-cursor" ref={cursorRef} style={{ opacity: 0 }}>
      <div className="cursor-outer-ring" ref={outerRingRef}></div>
      <div className="cursor-inner-dot" ref={innerDotRef}></div>
    </div>
  );
}
