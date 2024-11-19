"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Spline from "@splinetool/react-spline";
import Footer from "@/composant/Footer";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Home() {
  useEffect(() => {
    const frameWidth = 200; // Largeur de chaque frame de l'image
    const totalFrames = 6; // Nombre total de frames dans l'image

    const partnerPanels = gsap.utils.toArray(".partner-logo");
    console.log(partnerPanels);
    partnerPanels.forEach((panel) => {
      gsap.fromTo(
        panel as HTMLElement,
        {
          x: window.innerWidth, // Commence à droite
          opacity: 0, // Commence invisible
        },
        {
          x: 0, // Se déplace aux milieux
          opacity: 1, // Devient visible
          duration: 10, // Durée de l'animation
          // Décalage entre les partenaires
          scrollTrigger: {
            trigger: panel as undefined, // Déclencheur pour chaque panneau
            start: "top 80%", // Commence à défiler lorsque le logo arrive à 80% de la hauteur de la fenêtre
            end: "bottom top", // Terminer lorsque le logo est sorti de la fenêtre
            scrub: true, // L'animation est liée au défilement
            // on fait l'animation que une fois
            once: true,
          },
        }
      );
    });
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

    // Points de texte le long du chemin
    const textStops = [
      { trigger: ".text-point-1", text: "Bienvenue à Montpellier!" },
      { trigger: ".text-point-2", text: "Explorez nos attractions." },
      { trigger: ".text-point-3", text: "Découvrez la culture locale." },
      { trigger: ".text-point-4", text: "Profitez de réductions exclusives!" },
      { trigger: ".text-point-5", text: "Profitez de réductions exclusives!" },
    ];

    textStops.forEach((stop) => {
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
  }, []);

  return (
    <div className="bg-gray-100 font-sans">
      {/* Section Héros */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-hero-pattern"
        id="bg-index"
      >
        <h1 className="hero-heading text-5xl font-bold text-gray-800 mb-4">
          Découvrez Montpellier autrement
        </h1>
        <p className="text-xl text-gray-800 mb-8">
          Explorez les meilleurs établissements et profitez d’avantages
          exclusifs
        </p>
        <a
          href="#download"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Téléchargez l&apos;application
        </a>
      </section>
      {/* Section Fonctionnalités */}
      <section className="py-20 px-6 " id="features">
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800 ">
          Fonctionnalités
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800">
            <h3 className="text-2xl font-bold mb-2">Jeux Hebdomadaires</h3>
            <p className="text-gray-600 mb-4">
              Gagnez des récompenses en participant à nos jeux hebdomadaires !
              Chaque semaine, nous vous proposons une nouvelle série de jeux
              excitants avec des prix à gagner. Que vous soyez compétitif ou que
              vous cherchiez simplement à passer un bon moment, il y a toujours
              quelque chose pour vous !
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                <strong>Jeux divers :</strong> Des jeux variés chaque semaine,
                allant des quiz aux défis créatifs, pour tous les goûts.
              </li>
              <li>
                <strong>Récompenses attractives :</strong> Des prix tels que des
                bons d&apos;achat, des réductions exclusives ou des expériences
                uniques.
              </li>
              <li>
                <strong>Compétition amicale :</strong> Affrontez d&apos;autres
                participants dans des challenges et montez dans le classement
                pour débloquer des récompenses supplémentaires.
              </li>
              <li>
                <strong>Facile à participer :</strong> Inscrivez-vous
                simplement, participez chaque semaine et suivez votre
                progression.
              </li>
            </ul>
          </div>

          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800">
            <h3 className="text-2xl font-bold mb-2">Codes Promo Exclusifs</h3>
            <p className="text-gray-600 mb-4">
              Profitez de réductions et d&apos;offres spéciales dans vos
              établissements favoris grâce à nos codes promo exclusifs. Chaque
              mois, nous vous offrons des opportunités de faire des économies
              tout en explorant de nouveaux lieux.
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                <strong>Réductions immédiates :</strong> Utilisez des codes
                promo pour obtenir des réductions instantanées lors de vos
                achats ou réservations.
              </li>
              <li>
                <strong>Offres limitées :</strong> Profitez de nos offres
                spéciales qui changent chaque mois. Restez à l&apos;affût !
              </li>
              <li>
                <strong>Partenariats exclusifs :</strong> Bénéficiez de remises
                dans une sélection d&apos;établissements partenaires locaux.
              </li>
            </ul>
          </div>
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800">
            <h3 className="text-2xl font-bold mb-2">Explorer Montpellier</h3>
            <p className="text-gray-600 mb-4">
              Découvrez les secrets bien gardés de Montpellier ! Partez à la
              recherche des lieux cachés, des monuments historiques et des
              expériences uniques que cette ville a à offrir. Que vous soyez un
              résident ou un visiteur, il y a toujours quelque chose de nouveau
              à explorer.
            </p>
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                <strong>Sites historiques :</strong> Explorez les monuments
                emblématiques de Montpellier, comme la Place de la Comédie et
                l’Arc de Triomphe.
              </li>
              <li>
                <strong>Endroits secrets :</strong> Découvrez des lieux moins
                connus mais tout aussi fascinants, comme des jardins cachés ou
                des cafés pittoresques.
              </li>
              <li>
                <strong>Expériences locales :</strong> Participez à des
                événements locaux, des visites guidées et des activités
                culturelles pour plonger au cœur de la ville.
              </li>
            </ul>
          </div>
        </div>
        {/* Block nos partenaires avec scroll horizontal */}
        <div className="relative mt-12" id="partener">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Nos Partenaires
          </h3>
          <div
            className="partners-scroll-wrapper overflow-x-scroll flex space-x-6 py-4 justify-center align-middle"
            id="partners"
          >
            {/* Simuler quelques partenaires avec des logos */}
            <div className="partner-logo bg-white shadow-md rounded-md p-4">
              <img
                src="partenaire1.webp"
                alt="Partenaire 1"
                className="h-32 w-auto"
              />
            </div>
            <div className="partner-logo bg-white shadow-md rounded-md p-4">
              <img
                src="partenaire2.webp"
                alt="Partenaire 2"
                className="h-32 w-auto"
              />
            </div>
            <div className="partner-logo bg-white shadow-md rounded-md p-4">
              <img
                src="partenaire3.webp"
                alt="Partenaire 3"
                className="h-32 w-auto"
              />
            </div>
            <div className="partner-logo bg-white shadow-md rounded-md p-4">
              <img
                src="partenaire4.webp"
                alt="Partenaire 4"
                className="h-32 w-auto"
              />
            </div>
            {/* Plus de logos ici */}
          </div>
        </div>
      </section>
      <section className="m-8 p-8">
        <h2 className="text-4xl font-semibold text-center mb-12 text-gray-800 ">
          {" "}
          Mais comment sa fonctionne ?
        </h2>
        <div className="grid md:grid-cols-2 bg-white shadow-md rounded-md text-gray-800 p-8 gap-5">
          <img src="how.webp" alt="how" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error a
            laudantium iure eaque incidunt tenetur laborum corporis harum
            ducimus facilis! Tenetur molestiae illum minus deleniti dolore
            cumque ab excepturi placeat.
          </p>
        </div>
      </section>
      {/* Chemin de personnage avec arrêts de texte */}
      <section className="py-20 px-6 relative character-path" id="chemin">
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
        <div className="absolute text-point-1 left-[10%] top-[5%] text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 1</h3>
            <p className="text-gray-600">Télerchargez l&apos;application.</p>
          </div>
        </div>
        <div className="absolute text-point-2 left-[5%] top-[14%] text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 2</h3>
            <p className="text-gray-600">Attendez une notification.</p>
          </div>
        </div>
        <div className="absolute text-point-3 left-[20%] top-[30%] text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 3</h3>
            <p className="text-gray-600">
              Jouer au jeux grace a votre téléphone.
            </p>
            <Spline
              scene="https://prod.spline.design/CmgToJ93I6e4R6uA/scene.splinecode"
              className="spline-canvas"
            />
          </div>
        </div>
        <div className="absolute text-point-4 right-[10%] top-[57%] text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 4</h3>
            <p className="text-gray-600">
              Rendez-vous dans l&apos;établissements dont vous disposez un qrcode de
              réduction
            </p>
            <div className="flex justify-center m-8">
              <img src="logo-qr.png" alt="QR Code" className="h-32 w-auto" />
            </div>
          </div>
        </div>
        <div className="absolute text-point-5 right-[10%] top-[80%] text-xl font-semibold text-blue-600">
          <div className="feature p-6 bg-white shadow-md rounded-md text-gray-800 ">
            <h3 className="text-2xl font-bold mb-2">Etape 5</h3>
            <p className="text-gray-600">Profitez de votre réduction !</p>
            <div className="flex justify-center mt-5">
              <img src="hand.jpg" alt="QR Code" className="h-32 w-auto" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
