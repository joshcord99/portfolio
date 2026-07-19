import { useEffect, useState } from "react";
import "../css/About.css";

const FULL_NAME = "Joshua Cordial";

export default function About() {
  const [displayedName, setDisplayedName] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedName(FULL_NAME);
      setIsTypingComplete(true);
      return;
    }

    if (displayedName.length >= FULL_NAME.length) {
      setIsTypingComplete(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setDisplayedName(FULL_NAME.slice(0, displayedName.length + 1));
    }, 85);

    return () => window.clearTimeout(timeout);
  }, [displayedName, prefersReducedMotion]);

  return (
    <div className="main-container about-page">
      <section className="about-hero">
        <div className="about-copy">
          <p className="about-kicker">Software developer / CAD modeling</p>
          <h1 className="aboutHead">
            <span
              className={`aboutHead-typed${isTypingComplete ? " typing-complete" : ""}`}
            >
              {displayedName}
            </span>
          </h1>
          <p className="aboutText">
            I build practical tools that solve real problems, create value for
            people, and contribute to a better future. My background spans web
            applications, data-heavy workflows, hardware programming, CAD
            modeling, 3D printing, and hands-on technical problem solving.
          </p>
          <p className="aboutText">
            I am especially interested in combining software development with
            physical and virtual design. That mix helps me support teams, share
            useful knowledge, and build work that has a positive impact.
          </p>
          <div className="profile-tags" aria-label="Professional focus areas">
            <span>Software developer for tools and apps</span>
            <span>3D printing</span>
            <span>CAD modeling</span>
          </div>
        </div>
        <div className="profile-photo-wrap">
          <a
            href="https://github.com/joshcord99"
            target="_blank"
            rel="noreferrer"
            aria-label="Joshua Cordial GitHub profile"
          >
            <img src="/me.jpg" className="avatarImage" alt="Joshua Cordial" />
          </a>
        </div>
      </section>

      <div className="about-highlights">
        <div>
          <span className="highlight-label">Current Focus</span>
          <strong>Project building and collaboration</strong>
        </div>
        <div>
          <span className="highlight-label">Creative Edge</span>
          <strong>3D printing and CAD modeling</strong>
        </div>
        <div>
          <span className="highlight-label">Working Style</span>
          <strong>Reliable, detail-driven</strong>
        </div>
        <div>
          <span className="highlight-label">Interests</span>
          <strong>Fine-tuning AI models</strong>
        </div>
      </div>
    </div>
  );
}
