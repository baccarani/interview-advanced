const Footer = () => {
  return (
    <footer className="p-3 text-center border-t bottom-0 bg-background font-light text-sm">
      © {new Date().getFullYear()} Interview Advanced.<span className="hidden sm:inline"> </span>
      <div className="block sm:inline">Powered by Google AI and Gemini.</div>
    </footer>
  );
};

export default Footer;