import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useCallback } from "react";
import "../css/Navbar.css";
import { ThemeContext } from "../theme/ThemeContext";

function Navbar() {
  const currentPage = useLocation().pathname;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 600px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [currentPage, isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovered(true);
  }, [isMobile]);
  const handleMouseLeave = useCallback(() => {
    if (!isMobile) setIsHovered(false);
  }, [isMobile]);
  const handleHamburgerClick = useCallback(() => {
    if (isMobile) setIsOpen((open) => !open);
  }, [isMobile]);
  const handleBackdropClick = useCallback(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  const showModal = isMobile ? isOpen : isHovered;

  return (
    <div
      className="hamburger-menu-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="hamburger-menu"
        onClick={handleHamburgerClick}
        aria-label="Open menu"
      >
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </button>
      {showModal && (
        <div className="modal-overlay">
          {isMobile && (
            <div
              className="modal-backdrop"
              onClick={handleBackdropClick}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.2)",
                zIndex: 1999,
                display: "block",
              }}
            />
          )}
          <div
            className="modal-content"
            style={isMobile ? { zIndex: 2000, position: "fixed" } : {}}
          >
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link
                  to="/"
                  className={
                    currentPage === "/" ? "nav-link active" : "nav-link"
                  }
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/resume"
                  className={
                    currentPage === "/resume" ? "nav-link active" : "nav-link"
                  }
                >
                  Resume
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/portfolio"
                  className={
                    currentPage === "/portfolio"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Portfolio
                </Link>
              </li>
              <li className="nav-item" style={{ textAlign: "center" }}>
                <button
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                  aria-label="Toggle dark/light mode"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 24,
                    padding: 0,
                  }}
                >
                  {theme === "dark" ? "🌙" : "☀️"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
