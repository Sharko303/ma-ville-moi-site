import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { AiFillApple, AiFillAndroid } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="text-white py-6" id="footer">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section des icônes */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 gap-5 p-8">
            {/* Lien vers l'App Store */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <AiFillApple size={24} />
              <span>Télécharger sur l'App Store</span>
            </a>
            {/* Lien vers le Play Store */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-400"
            >
              <AiFillAndroid size={24} />
              <span>Télécharger sur Google Play</span>
            </a>
          </div>

          {/* Liens des réseaux sociaux */}
          <div className="flex space-x-4 mt-4 md:mt-0 gap-5 p-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Droits réservés */}
        <div className="text-center mt-6 text-sm text-gray-400">
          © {new Date().getFullYear()} Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
