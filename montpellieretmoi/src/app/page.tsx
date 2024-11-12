"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Home() {
  useEffect(() => {
    const frameWidth = 200; // Largeur de chaque frame de l'image
    const totalFrames = 6; // Nombre total de frames dans l'image

    // Animation du sprite en fonction du scroll (image du personnage qui change)
    gsap.to(".character-sprite", {
      backgroundPositionX: `-${frameWidth * totalFrames}px`,
      ease: "steps(" + totalFrames + ")", // Animation "step" pour chaque image
      scrollTrigger: {
        trigger: ".character-path",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Animation du mouvement le long du chemin
    /*     gsap.to(".character-container", {
      scrollTrigger: {
        trigger: ".character-path",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
      motionPath: {
        path: ".character-path-svg path", // Assurez-vous que votre SVG est sélectionné correctement
        align: ".character-path-svg path",
        alignOrigin: [0.5, 0.5],
        offsetX: 0, // Ajustez si nécessaire
        offsetY: 0, // Ajustez si nécessaire
      },
    }); */

    gsap.to(".character-container", {
      duration: 5,
      paused: false,
      ease: "none",
      motionPath: {
        path: "#path", // Assure-toi que l'ID du chemin est correct
        align: "#path",
        autoRotate: true, // Auto-rotation pour aligner le personnage avec le chemin
        alignOrigin: [0.5, 0.5], // Alignement de l'élément au centre
      },
      scrollTrigger: {
        trigger: "#path",
        start: "top center",
        end: "bottom center",
        scrub: true, // Fait en sorte que le mouvement soit lié au scroll
      },
    });

    // Animation des éléments de la section héro
    gsap.from(".hero-heading", { opacity: 0, y: 50, duration: 1 });

    // Animation des fonctionnalités
    gsap.from(".feature", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".feature",
        start: "top 80%",
      },
    });

    // Animation de chaque logo au scroll
    gsap.utils.toArray(".partner-logo").forEach((logo, index) => {
      gsap.fromTo(
        logo,
        { opacity: 0, x: 100 }, // Point de départ (invisible, décalé)
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: logo,
            start: "top center+=200", // Début de l’animation
            end: "top center", // Fin de l’animation
            toggleActions: "play none none reverse",
            scrub: true,
            onLeave: () => gsap.to(logo, { opacity: 0 }), // Masque le logo lorsqu’il sort de vue
          },
        }
      );
    });

    // Points de texte le long du chemin
    const textStops = [
      { trigger: ".text-point-1", text: "Bienvenue à Montpellier!" },
      { trigger: ".text-point-2", text: "Explorez nos attractions." },
      { trigger: ".text-point-3", text: "Découvrez la culture locale." },
      { trigger: ".text-point-4", text: "Profitez de réductions exclusives!" },
    ];

    textStops.forEach((stop, index) => {
      gsap.fromTo(
        stop.trigger,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: stop.trigger,
            start: "top center+=100",
            end: "bottom center-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    // annimation téléphone
    const canvas = document.getElementById("iphone-animation");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    const frameCount = 147;
/*     const currentFrame = (index) => (
      `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
    ); */
        const currentFrame = (index) => (
      `https://www.apple.com/v/iphone-16-pro/a/images/overview/product-viewer/iphone-pro/loader__gfk6vgp90p26_xlarge.jpg`
    );

    const images = [];
    const iphone = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    gsap.to(iphone, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".text-point-3",
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
      onUpdate: render,
    });

    images[0].onload = render;

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[iphone.frame], 0, 0);
    }
  }, []);

  return (
    <div className="bg-gray-100 font-sans">
      {/* Section Héros */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-hero-pattern">
        <h1 className="hero-heading text-5xl font-bold text-gray-800 mb-4">
          Découvrez Montpellier autrement
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explorez les meilleurs établissements et profitez d’avantages
          exclusifs
        </p>
        <a
          href="#download"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Téléchargez l'application
        </a>
      </section>
      {/* Section Fonctionnalités */}
      <section className="py-20 px-6" id="features">
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800 ">
          Fonctionnalités
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature p-6 bg-white shadow-md rounded-md">
            <h3 className="text-2xl font-bold mb-2 text-gray-800 ">
              Jeux Hebdomadaires
            </h3>
            <p className="text-gray-600">
              Gagnez des récompenses en participant à nos jeux.
            </p>
          </div>
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Codes Promo Exclusifs</h3>
            <p className="text-gray-600">
              Accédez à des réductions dans vos établissements favoris.
            </p>
          </div>
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Explorer Montpellier</h3>
            <p className="text-gray-600">
              Découvrez les meilleurs endroits cachés de la ville.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800 ">
          {" "}
          Mais comment sa fonctionne ?
        </h2>
      </section>
      {/* Chemin de personnage avec arrêts de texte */}
      <section className="py-20 px-6 relative character-path">
        <div className="character-container absolute">
          <div
            className="character-sprite"
            style={{
              width: `${170}px`,
              height: "451px",
              backgroundImage: "url('/cycle-marche4.png')",
              backgroundSize: `${200 * 6}px auto`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <svg
          fill="none"
          className="character-path-svg"
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          width="100%"
          viewBox="0 0 1300 3000"
        >
          <path
            id="path"
            d="M143.78,431.83c103.76,235.99,223.54,324.48,318.04,360c143.34,53.87,223.51-16.03,379,51.84 c136.54,59.6,292.87,208.71,272.99,325.44c-25.74,151.18-320.87,94.36-612.23,336.96c-155.68,129.63-367.75,392.59-331.29,624.96 c43.59,277.79,443.64,520.03,985.93,492.48"
            stroke="black"
            strokeWidth="8"
          />
        </svg>

        {/* Points de texte le long du chemin */}
        <div className="absolute text-point-1 top-40 left-20 text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 1</h3>
            <p className="text-gray-600">Télerchargez l'application.</p>
          </div>
        </div>
        <div className="absolute text-point-2 top-[700px] left-40 text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 2</h3>
            <p className="text-gray-600">Attendez une notification.</p>
          </div>
        </div>
        <div className="absolute text-point-3 top-[1600px] left-60 text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 3</h3>
            <p className="text-gray-600">
              Découvrez les meilleurs endroits cachés de la ville.
            </p>
            <canvas id="iphone-animation" width="1158" height="770" className="mt-4"></canvas>
          </div>
        </div>
        <div className="absolute text-point-4 top-[2500px] right-80 text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 4</h3>
            <p className="text-gray-600">Profitez de réductions exclusives!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
