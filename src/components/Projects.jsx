import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/projects.css";
import portfolioImg from "../assets/projects/portfolio.jpg";
import ecommerceImg from "../assets/projects/ecommerce.jpg";


gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const projects = [
  {
    title: "Creative Portfolio",
    description: "Cinematic portfolio website with smooth animations",
    tech: ["React", "GSAP", "Vite"],
    color: "red",
    image: portfolioImg,
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured shopping experience with intuitive UI",
    tech: ["React", "JavaScript", "Nodejs","Express"],
    color: "purple",
    image: ecommerceImg,
  },
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
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            transform: "translateY(0) scale(1)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true, // Critical: prevents re-triggering issues
              toggleActions: "play none none none"
            },
            delay: index * 0.15
          }
        );
      });
    }, sectionRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <h2 className="projects-heading">Selected Projects</h2>
        <p className="projects-subtitle">
          Showcasing my best work in full stack development
        </p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass"
              ref={el => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
            >
            <div className="project-image-wrapper">
              <div className={`project-image project-image-${project.color}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                />
              <div className="project-image-overlay"></div>
              </div>
          </div>
  
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
