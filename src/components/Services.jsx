import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/services.css";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      title: "UI Development",
      description: "Crafting pixel-perfect interfaces with modern frameworks",
      icon: "01"
    },
    {
      title: "Frontend Engineering",
      description: "Building scalable, performant web applications",
      icon: "02"
    },
    {
      title: "Interactive Animations",
      description: "Creating smooth, engaging user experiences",
      icon: "03"
    },
    {
      title: "Creative Coding",
      description: "Pushing boundaries with innovative solutions",
      icon: "04"
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(card => card !== null && card !== undefined);
      
      if (validCards.length === 0) return;

      // Animate each card using fromTo with explicit final state
      validCards.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            transform: "translateY(0)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true, // Critical: prevents re-triggering issues
              toggleActions: "play none none none"
            },
            delay: index * 0.1
          }
        );
      });
    }, sectionRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card glass"
              ref={el => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
            >
              <div className="service-icon">
                <span className="icon-number">{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
