"use client";
import useSWR from 'swr'
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
  const [particleCount, setParticleCount] = useState(200);

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

    // Update particle count based on screen width for responsiveness
    const updateParticleCount = () => {
      if (window.innerWidth <= 768) {
        setParticleCount(80); // Fewer particles for mobile screens
      } else if (window.innerWidth <= 1024) {
        setParticleCount(150); // Moderate particles for tablet screens
      } else {
        setParticleCount(200); // Default number of particles for larger screens
      }
    };

    // Listen for window resize to update particle count dynamically
    window.addEventListener('resize', updateParticleCount);

    // Initial particle count setting
    updateParticleCount();

    return () => {
      window.removeEventListener('resize', updateParticleCount);
    };
  }, []);

  const options = useMemo(() => {
    return {
      background: {
        color: {
          value: "#", // Black background to simulate space
        },
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: particleCount, // Dynamic particle count based on screen size
        },
        color: {
          value: "#ffffff", // White stars
        },
        shape: {
          type: "circle", // Circular dots for stars
        },
        move: {
          enable: true, // Enable movement
          direction: "right", // Move stars horizontally to the right
          speed: 2.5, // Speed of the moving stars
          straight: true, // Continuous straight movement
          outMode: "out", // Stars reappear from the left after going off-screen
        },
        opacity: {
          value: 0.8, // Slightly transparent stars
        },
        size: {
          value: { min: 1, max: 3 }, // Random size for the stars
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab", // Grab mode on hover
            parallax: {
              enable: true,
              force: 100, // Increase parallax force for a stronger effect
            },
          },
        },
        modes: {
          grab: {
            distance: 250, // Increase the grab distance
            line_linked: {
              opacity: 0.4, // Adjust the opacity of connecting lines
            },
          },
        },
      },
      detectRetina: true, // High-quality rendering for Retina screens
    };
  }, [particleCount]); // Depend on particleCount to update dynamically
  
  const randomStarsOptions = useMemo(() => {
    return {
      particles: {
        number: {
          value: 20, // Initial count is 0, stars will randomly appear
        },
        color: {
          value: ["#FFD700", "#FF6347", "#00CED1", "#FF1493", "#32CD32"], // Array of predefined colors for randomly appearing stars
        },
        shape: {
          type: "star",
        },
        move: {
          enable: true, // Enable movement
          direction: "right", // Move stars horizontally
          speed: 2.5, // Faster speed for the randomly appearing stars
          straight: false, // Move in a straight line
          outMode: "out", // Stars disappear after moving off-screen
        },
        opacity: {
          value: 1, // Opaque stars
        },
        size: {
          value: { min: 2, max: 4 }, // Slightly larger than the static stars
        },
        life: {
          duration: {
            sync: true,
            value: 5, // Random stars live for 5 seconds
          },
          count: -1, // Only appear once
        },
      },

      detectRetina: true, // Retina support
    };
  }, []);

  return (
    <div className={styles.main}>
      {/* Particles.js background */}
      {init && (
        <>
          <Particles
            id="tsparticles"
            options={options}
            style={{ position: "absolute", zIndex: -1 }} // Ensure particles are behind other content
          />
          <Particles
            id="randomStars"
            options={randomStarsOptions}
            style={{ position: "absolute", zIndex: -1 }}
          />
        </>
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
