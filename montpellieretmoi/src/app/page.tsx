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
    const sections = gsap.utils.toArray<HTMLElement>(".section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: () =>
          section.offsetHeight < window.innerHeight
            ? "top top"
            : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
        pin: true,
        pinSpacing: false,
      });
    });

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
            start: "top 100%", // Commence à défiler lorsque le logo arrive à 80% de la hauteur de la fenêtre
            end: "bottom 60%", // Terminer lorsque le logo est au milieux de la fenêtre
            scrub: true, // L'animation est liée au défilement
            // on fait l'animation que une fois
            once: false,
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
        className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-hero-pattern section"
        id="bg-index"
      >
        <h1 className="hero-heading text-5xl font-bold text-white mb-4 text-shadow-custom">
          Découvrez Montpellier sous un autre angle.
        </h1>
        <p className="text-xl text-white mb-8 text-shadow-custom">
          Explorez les meilleurs établissements et profitez d&apos;avantages
          exclusifs.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <a href="https://www.apple.com/fr/app-store/" className="transition">
            <button
              type="button"
              className="flex items-center justify-center w-48 mt-3 text-white bg-black h-14 rounded-xl"
            >
              <div className="mr-3">
                <svg viewBox="0 0 384 512" width="30">
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-xs">DISPONIBLE SUR</div>
                <div className="-mt-1 font-sans text-xl font-semibold">
                  l'App Store
                </div>
              </div>
            </button>
          </a>
          <a href="https://play.google.com/store/games" className="transition">
            <button
              type="button"
              className="flex items-center justify-center w-48 mt-3 text-white bg-black rounded-lg h-14"
            >
              <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                  <path
                    fill="#FFD400"
                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                  ></path>
                  <path
                    fill="#FF3333"
                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#48FF48"
                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#3BCCFF"
                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-xs">DISPONIBLE SUR</div>
                <div className="-mt-1 font-sans text-xl font-semibold">
                  Google Play
                </div>
              </div>
            </button>
          </a>
        </div>
      </section>
      {/* Section Fonctionnalités */}
      <section className="py-20 px-6 section" id="features">
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
      <section className="m-8 p-8 section help">
        <h2 className="text-4xl font-semibold text-center mb-12 text-white ">
          {" "}
          Mais comment ça fonctionne ?
        </h2>
        <div className="grid md:grid-cols-2 bg-white shadow-md rounded-md text-white> p-8 gap-5 help w-full">
          <img src="how.webp" alt="how" />
          <div>
            <h2 className="text-2xl font-bold space-x-4">
              Rien de plus simple !
            </h2>

            <p className="tracking-wide leading-7 mt-8 text-lg">
              Notre application a été conçue pour être la plus simple et
              intuitive possible. Peu importe votre niveau d&apos;expérience
              avec les outils numériques, vous pourrez l&apos;utiliser sans
              difficulté. Disponible sur tous les smartphones, qu&apos;ils
              soient Android ou iOS, notre application s&apos;adapte à vos
              besoins et vous accompagne au quotidien.
            </p>
            <p className="tracking-wide leading-7 mt-8 text-lg">
              Pour mieux vous montrer à quel point son utilisation est facile,
              nous avons préparé une animation qui illustre étape par étape son
              fonctionnement. Vous allez voir, rien n&apos;a jamais été aussi
              simple !
            </p>
          </div>
        </div>
      </section>
      {/* Chemin de personnage avec arrêts de texte */}
      <section
        className="py-20 px-6 relative character-path bg-white"
        id="chemin"
      >
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
            <p className="text-gray-600">Téléchargez l&apos;application.</p>
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
              Jouez au jeu grâce à votre téléphone.
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
              Rendez-vous dans l&apos;établissement dont vous disposez un qrcode
              de réduction
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
