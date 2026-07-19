import {
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { marked } from "marked";
import resumeData from "../data/resumeData";
import avatarImg from "../../public/AvatarMaker-2.png";
import { ThemeContext } from "../theme/ThemeContext";
import "../css/chatboxui.css";

const resumeText = JSON.stringify(resumeData, null, 2);


marked.setOptions({
  breaks: true,
  gfm: true,
  sanitize: false,
});

const ChatBotUI = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `👋 **Hey there!** I'm Joshua Cordial — welcome to my site.

## **Common Questions:**
- "Tell me about him"
- "What experience does he have?"
- "What projects has he done?"
- "Does he have experience in PHP?"
- "List all skills he has"

## **Things I can do:**
- **Page navigation** - Guide you to different sections
- **Summarization** - Provide concise overviews
- **Analysis** - Deep dive into specific topics
- **Contextual Memory** - Remember our conversation

*Feel free to ask me anything about my background, work, or how to get in touch!*`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const chatEndRef = useRef(null);
  const pendingPageNavigation = useRef(null);

  const detectDirectPageRequest = (text) => {
    const lower = text.toLowerCase();
    if (/resume|cv/.test(lower) && /(show|see|want|view|open)/.test(lower))
      return "/resume";
    if (
      /portfolio|project/.test(lower) &&
      /(show|see|want|view|open)/.test(lower)
    )
      return "/portfolio";
    if (
      /about|bio|background|him|her|profile/.test(lower) &&
      /(show|see|want|view|open)/.test(lower)
    )
      return "/";
    return null;
  };

  const isAffirmative = (text) => {
    return /^(y(es)?|ya|yep|yeah|sure|ok(ay)?|please|of course|go ahead|absolutely|certainly|definitely|why not|sounds good|let'?s do it|i do|i would|i want|i need|i'd like|i will|i am|i'm in)$/i.test(
      text.trim()
    );
  };

  const systemPrompt = useMemo(
    () => ({
      role: "system",
      content: `
You are a helpful AI assistant for Joshua Cordial's personal website. You can answer questions, guide users, and help navigate between pages.
You have access to Joshua's resume, which is provided below. Use this information to answer any questions about Joshua's experience, skills, or background.

**Important**: Format your responses using markdown for better readability. Use:
- **Bold text** for emphasis
- *Italic text* for secondary information
- Bullet points for lists
- Headers (##) for sections
- Code formatting for technical terms

Resume:
${resumeText}

The website includes:
- [NAVIGATE:/] → About Joshua
- [NAVIGATE:/resume] → Resume page
- [NAVIGATE:/portfolio] → Project showcase
- Contact links are available in the footer on every page

Special instructions for common user questions:
1. If the user asks about Joshua specifically (e.g., "Tell me about Joshua"), respond with:
   - [NAVIGATE:/] (to About page) (prioritize this first) 
   - A brief summary about Joshua based on the resume (e.g., name, summary, location, background).
2. If the user asks about Joshua's experience (e.g., "Tell me about his experience"), respond with:
   - [NAVIGATE:/resume] (to Resume page) (prioritize this first)
   - A summary of Joshua's experience, including job titles, companies, and a short description of his background.
3. If the user asks about Joshua's projects (e.g., "What projects has Joshua done?"), respond with:
   - [NAVIGATE:/portfolio] (to Portfolio page) (prioritize this first)
   - A list of project titles and a short description for each, based on the resume.
4. If the user asks how to contact Joshua or for his contact info, respond with:
   - Tell them contact links are in the footer on every page.
   - Include Joshua's email: joshcord99@gmail.com.
   - Include LinkedIn: https://www.linkedin.com/in/joshua-cordial-0aa18a3a0/.

If a user asks to go to a specific page, respond ONLY with the appropriate [NAVIGATE:/path] tag and nothing else, unless it matches one of the above cases.

Example:
User: I want to see the resume.
Assistant: [NAVIGATE:/resume]

Never make up information that's not on Joshua's site. If the requested info isn't available, explain that respectfully. Do not assume anything. Only answer based on what you've received or know from the site.
`,
    }),
    []
  );

  const getLastUserMessage = useCallback(() => {
    return (
      [...messages].reverse().find((m) => m.role === "user")?.content || ""
    );
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;

    const content = last.content;

    const navigateMatch = content.match(/\[NAVIGATE:(.+?)\]/);
    if (navigateMatch) {
      const path = navigateMatch[1].trim();
      let pageName = path === "/" ? "about" : path.replace("/", "");
      const summary = content.replace(/\[NAVIGATE:(.+?)\]/g, "").trim();
      let suggestPath = path;
      let suggestPageName = pageName;
      if (
        /experience|work|job|career|background|cv/.test(summary.toLowerCase())
      ) {
        suggestPath = "/resume";
        suggestPageName = "resume";
      } else if (/project/.test(summary.toLowerCase())) {
        suggestPath = "/portfolio";
        suggestPageName = "portfolio";
      } else if (/contact|email|reach/.test(summary.toLowerCase())) {
        suggestPath = "/";
        suggestPageName = "about";
      }
      if (summary) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { ...prev[prev.length - 1], content: summary },
          {
            role: "assistant",
            content: `Would you like to see his ${suggestPageName} page?`,
          },
        ]);
        pendingPageNavigation.current = suggestPath;
      } else {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            role: "assistant",
            content: `Would you like to see his ${suggestPageName} page?`,
          },
        ]);
        pendingPageNavigation.current = suggestPath;
      }
      return;
    }

    const clickMatch = content.match(/\[CLICK:(.+?)\]/);
    if (clickMatch) {
      const selector = clickMatch[1].trim();
      const el = document.querySelector(selector);
      if (el) el.click();
    }

    if (last.content.includes("Anazlying Resume . . .")) {
      const lastUserMessage = getLastUserMessage();

      fetch("/.netlify/functions/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            systemPrompt,
            {
              role: "user",
              content: `Based on the following resume, answer the question below:\n\nResume:\n${resumeText}\n\nQuestion: ${lastUserMessage}`,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
        })
        .catch(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Sorry, I couldn't analyze the resume right now.",
            },
          ]);
        });
    }
  }, [messages, navigate, getLastUserMessage, systemPrompt]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const directPath = detectDirectPageRequest(input);
    if (directPath) {
      let pageName = directPath === "/" ? "about" : directPath.replace("/", "");
      navigate(directPath);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Here is the ${pageName} page` },
      ]);
      pendingPageNavigation.current = null;
      setInput("");
      setLoading(false);
      return;
    }

    if (pendingPageNavigation.current) {
      if (isAffirmative(input)) {
        const path = pendingPageNavigation.current;
        let pageName = path === "/" ? "about" : path.replace("/", "");
        navigate(path);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Here is the ${pageName} page` },
        ]);
        pendingPageNavigation.current = null;
        setInput("");
        setLoading(false);
        return;
      }
    }

    const userMessage = { role: "user", content: input };
    const updatedMessages = [
      ...messages,
      userMessage,
      { role: "assistant", content: "Thinking . . ." },
    ];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [systemPrompt, ...updatedMessages.slice(1, -1)],
        }),
      });
      const data = await res.json();
      setMessages((prev) => {
        const newMessages = [...prev];
        const idx = newMessages.findIndex(
          (m) => m.role === "assistant" && m.content === "Thinking . . ."
        );
        if (idx !== -1) {
          newMessages[idx] = { role: "assistant", content: data.reply };
        }
        return newMessages;
      });
    } catch (err) {
      setMessages((prev) => {
        const newMessages = [...prev];
        const idx = newMessages.findIndex(
          (m) => m.role === "assistant" && m.content === "Thinking . . ."
        );
        if (idx !== -1) {
          newMessages[idx] = {
            role: "assistant",
            content:
              "Sorry, something went wrong while processing your request.",
          };
        }
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`minimized-container ${minimized ? "minimized" : ""}`}>
        {minimized && (
          <img src="/bubble.gif" alt="Click me" className="bubble-gif" />
        )}
        <button
          className="minimized-button"
          onClick={() => setMinimized(false)}
          aria-label="Open chat"
        >
          <img src={avatarImg} alt="Avatar" className="avatar-img" />
        </button>
      </div>

      <div className={`chat-box ${theme}${minimized ? " minimized" : ""}`}>
        <div className="header">
          <span className="header-title">Virtual Joshua</span>
          <button
            onClick={() => setMinimized(true)}
            className="minimize-button"
            aria-label="Minimize chat"
          >
            &minus;
          </button>
        </div>

        <div className="chat-body">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <span
                className="message-content"
                dangerouslySetInnerHTML={{
                  __html: marked(msg.content.replace(/\[.*?:.*?\]/g, "")),
                }}
              />
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={sendMessage} className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input-field"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="send-button"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBotUI;
