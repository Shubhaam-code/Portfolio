import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);
  const resumeBtnRef = useRef(null);

  const skills = [
    "Data Structures & Algorithms",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB"
  ];

  useEffect(() => {
    // Safety check
    if (!sectionRef.current || !headingRef.current || !contentRef.current || !skillsRef.current) {
      return;
    }

    // GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      const triggerConfig = {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        toggleActions: "play none none none"
      };

      // Heading animation
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

      // Content children stagger animation
      const items = Array.from(contentRef.current.children);
      items.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            transform: "translateY(0)",
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

      // Skills animation
      if (skillsRef.current) {
        const skillItems = Array.from(skillsRef.current.children);
        skillItems.forEach((el, index) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              transform: "translateY(0) scale(1)",
              duration: 0.6,
              ease: "power3.out",
              delay: index * 0.08,
              scrollTrigger: {
                ...triggerConfig,
                once: true
              }
            }
          );
        });
      }

      // Resume button animation
      if (resumeBtnRef.current) {
        gsap.fromTo(
          resumeBtnRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            transform: "translateY(0) scale(1)",
            duration: 0.7,
            ease: "back.out(1.7)",
            delay: 0.5,
            scrollTrigger: {
              ...triggerConfig,
              once: true
            }
          }
        );
      }
    }, sectionRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  const handleResumeDownload = () => {
    // Replace with actual resume file path
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Update with your resume file
    link.download = "Shubham_Narayan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-grid">
          {/* Left: About Content */}
          <div className="about-content-wrapper">
            <h2 className="about-heading" ref={headingRef}>
              Building Scalable Solutions Through Logic & Design
            </h2>

            <div className="about-content" ref={contentRef}>
              <p className="about-text">
                I'm a developer who thrives on solving complex problems with clean, 
                efficient code. My foundation in Data Structures & Algorithms gives me 
                the analytical mindset to build scalable applications that perform.
              </p>

              <p className="about-text">
                I balance technical rigor with creative problem-solving, crafting 
                full-stack applications that are both robust and intuitive. From 
                optimizing algorithms to designing clean interfaces, I focus on building 
                solutions that work beautifully in production.
              </p>
            </div>
          </div>

          {/* Right: Skills & CTA */}
          <div className="about-skills-wrapper">
            <div className="skills-section">
              <h3 className="skills-heading">Technical Skills</h3>
              <div className="skills-grid" ref={skillsRef}>
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="resume-btn"
              ref={resumeBtnRef}
              onClick={handleResumeDownload}
            >
              <span>Download Resume</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 14L5 9H8V3H12V9H15L10 14Z" fill="currentColor"/>
                <path d="M3 16H17V18H3V16Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
