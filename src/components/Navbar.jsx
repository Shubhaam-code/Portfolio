import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/navbar.css";

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Safety checks
    if (!navRef.current || !logoRef.current || !ctaRef.current) {
      return;
    }

    // GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Logo animation - fromTo with explicit final state
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            transform: "translateY(0)",
            duration: 0.8,
            ease: "power3.out"
          }
        );
      }

      // Links animation - fromTo with explicit final state
      const validLinks = linksRef.current.filter(link => link !== null && link !== undefined);
      if (validLinks.length > 0) {
        validLinks.forEach((link, index) => {
          gsap.fromTo(
            link,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              transform: "translateY(0)",
              duration: 0.6,
              ease: "power3.out",
              delay: index * 0.1
            }
          );
        });
      }

      // CTA button animation - fromTo with explicit final state
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            transform: "scale(1)",
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.3
          }
        );
      }
    }, navRef);

    // Scroll-based navbar background effect
    const handleScroll = () => {
      if (!navRef.current) return;
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        gsap.to(navRef.current, {
          background: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(20px)",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(navRef.current, {
          background: "transparent",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <div 
          className="nav-logo" 
          ref={logoRef}
          onClick={(e) => handleNavClick(e, "#hero")}
        >
          <span className="logo-text">Shubham Narayan</span>
        </div>
        
        <div className="nav-links">
          <a 
            href="#home" 
            className="nav-link"
            ref={el => {
              if (el) {
                linksRef.current[0] = el;
              }
            }}
            onClick={(e) => handleNavClick(e, "#hero")}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="nav-link"
            ref={el => {
              if (el) {
                linksRef.current[1] = el;
              }
            }}
            onClick={(e) => handleNavClick(e, "#about")}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="nav-link"
            ref={el => {
              if (el) {
                linksRef.current[2] = el;
              }
            }}
            onClick={(e) => handleNavClick(e, "#projects")}
          >
            Projects
          </a>
        </div>
        
        <button 
          className="nav-cta"
          ref={ctaRef}
          onClick={(e) => {
            e.preventDefault();
            const footer = document.querySelector("footer");
            if (footer) {
              footer.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Get in touch
        </button>
      </div>
    </nav>
  );
}
