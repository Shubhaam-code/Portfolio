import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import "./styles/cursor.css";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <TechStack />
      <Projects />
      <Footer />
    </>
  );
}