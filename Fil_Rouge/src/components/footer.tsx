import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full py-4 bg-gray-900 text-gray-200 text-center mt-8">
    <span>
      © {new Date().getFullYear()} Projet Fil Rouge — Tous droits réservés.
    </span>
  </footer>
);

export default Footer;