import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`text-sm transition ${
        pathname === path
          ? "text-cyber-primary"
          : "text-cyber-muted hover:text-cyber-text"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cyber-dark/80 backdrop-blur border-b border-cyber-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-lg font-semibold text-cyber-primary tracking-wide">
          CYBERSHIELD
        </h1>

        {/* Links */}
        <div className="flex gap-8 items-center">
          {navLink("/", "Home")}
          {navLink("/threats", "Threats")}
          {navLink("/resources", "Resources")}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;