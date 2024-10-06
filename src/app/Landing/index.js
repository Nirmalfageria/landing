"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { gsap } from "gsap";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Load the slim version for better performance
import Navbar from "../Navbar/page";
import styles from "./landing.module.css";

export default function Landing() {
  const tathvaTextRef = useRef(null);
  const comingSoonTextRef = useRef(null);
  const [init, setInit] = useState(false);
  const [particleCount, setParticleCount] = useState(80); // Default particle count

  useEffect(() => {
    // Initialize Particle.js engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    // Function to split text and wrap in span tags
    function breakText(ref) {
      const h1 = ref.current;
      const text = h1.textContent;
      const split = text.split("");
      let newText = "";

      split.forEach(function (char) {
        newText += `<span class="${styles.a}">${char}</span>`;
      });

      h1.innerHTML = newText;
    }

    breakText(tathvaTextRef);
    breakText(comingSoonTextRef);

    // GSAP animation timeline with repeat
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    tl.from(`.${styles.a}`, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power3.out",
    }).to(
      `.${styles.a}`,
      {
        opacity: 0,
        y: -80,
        duration: 0.5,
        stagger: 0.15,
        ease: "power3.in",
      },
      "+=0.5"
    );

    tl.fromTo(
      `.${styles.a}`,
      { y: -80, opacity: 0 },
      {
        y: 0,
        delay: 1.5,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "power3.out",
      },
      "+=0.0"
    );

    // Update particle count based on screen size
    const updateParticleCount = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setParticleCount(80); // Fewer particles for mobile screens
      } else if (width <= 1024) {
        setParticleCount(120); // Moderate particles for tablet screens
      } else {
        setParticleCount(180); // Default number of particles for larger screens
      }
    };

    // Initial particle count setting and event listener
    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);

    return () => {
      window.removeEventListener('resize', updateParticleCount);
    };
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#", // Adjust to black background to match your landing page
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 80,
            duration: 0.8,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // White particles to stand out on the black background
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
        },
        number: {
          value: particleCount, // Dynamic particle count
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
      detectRetina: true,
    }),
    [particleCount], // Depend on particleCount to update dynamically
  );

  return (
    <div className={styles.main}>
      {/* Particles.js background */}
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          style={{ position: "absolute", zIndex: -1 }} // Ensure particles are behind other content
        />
      )}

      {/* Navbar */}
      <Navbar />

      {/* Landing Page Content */}
      <div className={styles.landing}>
        <div className={styles.item1}>
        <h1 ref={tathvaTextRef} className={styles.letters}>
  Tathva&apos;24
</h1>

          <h2 ref={comingSoonTextRef} className={styles.letters}>
            Coming-Soon
          </h2>
        </div>

        {/* Event Dates */}
        <div className={styles.item2}>
          <h1>24 OCT</h1>
          <h1>25 OCT</h1>
          <h1>26 OCT</h1>
        </div>
      </div>
    </div>
  );
}
