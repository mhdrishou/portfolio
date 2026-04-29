export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-xl font-display font-bold">Muhammed Rishan</h3>
            <p className="text-foreground/50 text-sm">Building the web, one pixel at a time.</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-foreground/70">
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#projects" className="hover:text-primary">Projects</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </div>

          <p className="text-xs text-foreground/30">
            &copy; 2026 Muhammed Rishan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
