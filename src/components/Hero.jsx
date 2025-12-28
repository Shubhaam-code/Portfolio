import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/hero.css";
import myPhoto from "../assets/shubham.jpeg";

export default function Hero() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const headingRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const techRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !introRef.current ||
      !headingRef.current ||
      !tagRef.current ||
      !descRef.current ||
      !techRef.current ||
      !ctaRef.current ||
      !imageRef.current ||
      !glowRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.8"
      );

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6"
      );

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );

      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );

      tl.fromTo(
        techRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        "-=0.4"
      );

      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.2 },
        "-=1"
      );

      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.6,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projects = document.querySelector("#projects");
    if (!projects) return;

    const offset = projects.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-container">
        <div className="hero-card glass" ref={containerRef}>

          {/* LEFT */}
          <div className="hero-content">
            <span className="hero-intro" ref={introRef}>Hey, I'm</span>

            <h1 className="hero-heading" ref={headingRef}>
              Software Developer
            </h1>

            <p className="hero-tag" ref={tagRef}>(Engineering Student)</p>

            <p className="hero-description" ref={descRef}>
              I design and build modern, interactive web experiences.
            </p>

            <div className="hero-tech" ref={techRef}>
              <span>React</span> • <span>JavaScript</span> • <span>GSAP</span> • <span>Tailwind</span> • <span>Git</span>
            </div>

            <button
              className="hero-cta"
              ref={ctaRef}
              onClick={handleScrollToProjects}
            >
              View Projects
            </button>
          </div>

          {/* RIGHT */}
          <div className="hero-visual">
            <div className="hero-glow" ref={glowRef}></div>

            <div className="hero-image" ref={imageRef}>
              <div className="image-placeholder">
                <div className="image-content">
                  <img
                    src={myPhoto}
                    alt="Shubham"
                    className="hero-img"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
