import "../css/Footer.css";

export default function Footer() {
  return (
    <div className="footer-away">
      <p>
        <a href="https://github.com/joshcord99" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span style={{ margin: "0 8px" }}>|</span>
        <a
          href="https://www.linkedin.com/in/joshua-cordial-0aa18a3a0/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <span style={{ margin: "0 8px" }}>|</span>
        <a href="mailto:joshcord99@gmail.com">joshcord99@gmail.com</a>
      </p>
    </div>
  );
}
