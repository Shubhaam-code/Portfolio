import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/footer.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const linksRef = useRef([]);

  const socialLinks = [
    { name: "GitHub", url: "https://github.com", icon: "G" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "L" },
    { name: "Twitter", url: "https://twitter.com", icon: "T" }
  ];

  useEffect(() => {
    // Safety checks
    if (!footerRef.current || !contentRef.current) {
      return;
    }

    // GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Footer content children animation
      if (contentRef.current && contentRef.current.children) {
        const children = Array.from(contentRef.current.children).filter(child => child !== null);
        children.forEach((child, index) => {
          gsap.fromTo(
            child,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              transform: "translateY(0)",
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 85%",
                once: true, // Critical: prevents re-triggering issues
                toggleActions: "play none none none"
              },
              delay: index * 0.1
            }
          );
        });
      }

      // Social links animation
      const validLinks = linksRef.current.filter(link => link !== null && link !== undefined);
      validLinks.forEach((link, index) => {
        if (!link) return;
        
        gsap.fromTo(
          link,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            transform: "scale(1)",
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true, // Critical: prevents re-triggering issues
              toggleActions: "play none none none"
            },
            delay: 0.3 + (index * 0.1)
          }
        );
      });
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-content" ref={contentRef}>
          <div className="footer-brand">
            <h3 className="footer-logo">Shubham Narayan</h3>
            <p className="footer-tagline">Software Developer</p>
          </div>
          
          <div className="footer-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                ref={el => {
                  if (el) {
                    linksRef.current[index] = el;
                  }
                }}
                aria-label={link.name}
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-name">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Shubham Narayan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
