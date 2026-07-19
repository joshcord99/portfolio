import { Outlet } from "react-router-dom";
import Nav from "./components/Navbar";
import Footer from "./pages/Footer";
import "./css/App.css";
// import ChatBotUI from "./components/chatbotui";
import { ThemeProvider, ThemeContext } from "./theme/ThemeContext";
import { useContext } from "react";

function AppContent() {
  const { theme } = useContext(ThemeContext);
  const appStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    margin: "0",
  };
  return (
    <div className={theme + "-mode"} style={appStyle}>
      <div className="page-wrapper">
        <Nav />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* <ChatBotUI /> */}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
