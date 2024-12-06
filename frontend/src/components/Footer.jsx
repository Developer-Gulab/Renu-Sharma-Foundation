import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6 text-center">
      <p>&copy; {new Date().getFullYear()} Renu Healthcare. All Rights Reserved.</p>
      <p>Follow us on:
        <a href="#" className="ml-2 text-purple-300 hover:text-purple-400">Facebook</a>,
        <a href="#" className="ml-2 text-purple-300 hover:text-purple-400">Twitter</a>,
        <a href="#" className="ml-2 text-purple-300 hover:text-purple-400">Instagram</a>
      </p>
    </footer>
  );
};

export default Footer;

