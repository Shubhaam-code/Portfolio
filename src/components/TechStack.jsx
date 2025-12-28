import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/techstack.css";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  const techCategories = [
    {
      title: "Frontend",
      items: ["React", "Tailwind CSS", "GSAP", "Framer Motion"]
    },
    {
      title: "Backend",
      items: ["Node.js", "Express.js", "MongoDB", "JWT Authentication"]
    },
    {
      title: "Tools & Workflow",
      items: ["Git & GitHub", "Vite", "Postman", "Figma (basic)"]
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      const triggerConfig = {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        toggleActions: "play none none none"
      };

      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            transform: "translateY(0)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: triggerConfig
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            transform: "translateY(0)",
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: triggerConfig
          }
        );
      }

      // Cards stagger animation
      const validCards = cardsRef.current.filter(card => card !== null && card !== undefined);
      validCards.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            transform: "translateY(0) scale(1)",
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              ...triggerConfig,
              once: true
            }
          }
        );
      });

    }, sectionRef);

    // Magnetic effect setup (desktop only)
    let cleanupFunctions = [];
    
    const setupMagneticEffect = () => {
      if (window.innerWidth <= 768) return; // Skip on mobile
      
      const cards = cardsRef.current.filter(card => card !== null && card !== undefined);
      
      cards.forEach((card) => {
        if (!card) return;

        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;
          
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          
          const distanceX = mouseX - cardCenterX;
          const distanceY = mouseY - cardCenterY;
          
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const maxDistance = 200; // Magnetic field radius
          
          if (distance < maxDistance) {
            const strength = (1 - distance / maxDistance) * 0.25; // Max 25% movement
            const moveX = distanceX * strength;
            const moveY = distanceY * strength;
            
            gsap.to(card, {
              x: moveX,
              y: moveY,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out"
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
        
        cleanupFunctions.push(() => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
          // Reset card position
          gsap.set(card, { x: 0, y: 0, scale: 1 });
        });
      });
    };

    // Setup magnetic effect after cards are rendered
    const timer = setTimeout(() => {
      setupMagneticEffect();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      // Cleanup all magnetic event listeners
      cleanupFunctions.forEach(cleanup => cleanup());
      cleanupFunctions = [];
    };
  }, []);

  return (
    <section id="techstack" className="techstack-section" ref={sectionRef}>
      <div className="techstack-container">
        <div className="techstack-header">
          <h2 className="techstack-heading" ref={headingRef}>
            My Tech Stack
          </h2>
          <p className="techstack-subtitle" ref={subtitleRef}>
            Tools & technologies I use to build modern web applications
          </p>
        </div>

        <div className="techstack-grid">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="techstack-card"
              ref={el => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
            >
              <h3 className="card-title">{category.title}</h3>
              <ul className="card-items">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="card-item">
                    <span className="item-bullet"></span>
                    <span className="item-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
