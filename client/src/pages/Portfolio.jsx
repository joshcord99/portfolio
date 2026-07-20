import "../css/Portfolio.css";
import { useCallback, useEffect, useRef, useState } from "react";

const codingProjects = [
  {
    link: "https://github.com/joshcord99/zoomies",
    img: "/projects/zoomies/game-play.png",
    alt: "ZOOMIES watchOS endless runner gameplay",
    title: "ZOOMIES",
    description:
      "Apple Watch endless runner built with Swift and SwiftUI, featuring generated character sprites, map selection, obstacles, coins, lives, settings, and persistent scores.",
    languagesUsed: ["Swift", "SwiftUI", "watchOS"],
    skillsLearned: [
      "Digital Crown input tuning",
      "Watch-size gameplay pacing",
      "Obstacle spacing systems",
    ],
    images: [
      {
        src: "/projects/zoomies/home.png",
        alt: "ZOOMIES Apple Watch home screen",
      },
      {
        src: "/projects/zoomies/characters.png",
        alt: "ZOOMIES character selection screen",
      },
      {
        src: "/projects/zoomies/map-menu.png",
        alt: "ZOOMIES map selection screen",
      },
      {
        src: "/projects/zoomies/game-play.png",
        alt: "ZOOMIES Apple Watch endless runner gameplay",
      },
    ],
  },
  {
    link: "https://github.com/joshcord99/stoxai",
    img: "/projects/stoxai.png",
    alt: "Market Analysis",
    title: "StoxAI - Stock Market Analysis",
    description:
      "A stock market analysis tool that uses the algorythms to analyze stock market data and provide insights.",
    languagesUsed: ["Python", "JavaScript", "CSS"],
    skillsLearned: [
      "Historical price normalization",
      "Stock signal comparison",
      "Financial trend presentation",
      "Investor-focused dashboard copy",
    ],
  },
  {
    link: "https://github.com/anthonymoon2/TomoPudgy",
    img: "/tamapudgy.png",
    alt: "TamaPudgy",
    title: "TamaPudgy",
    description:
      "Collaborated project with team to create a tamagotchi inspired diet tracker",
    languagesUsed: ["JavaScript", "React", "CSS"],
    skillsLearned: [
      "Shared component ownership",
      "Gamified habit tracking",
      "Team merge coordination",
      "Diet log interaction design",
    ],
  },
  {
    link: "https://github.com/joshcord99/Talker",
    img: "/projects/zen.jpg",
    alt: "Talker AI Therapist",
    title: "Talker - AI Therapist",
    description: "Backend using MongoDB and Open-AI API integration",
    languagesUsed: ["JavaScript", "Node.js", "MongoDB"],
    skillsLearned: [
      "Conversation prompt routing",
      "MongoDB session persistence",
      "Server-side API key handling",
      "Therapy-style response boundaries",
    ],
  },
  {
    link: "https://github.com/joshcord99/EZBadges",
    img: "/err404.jpg",
    alt: "EZBadges",
    title: "EZBadges",
    description:
      "C# CLI application that creates employee badges using SkiaSharp for image generation and API integration.",
    languagesUsed: ["C#", ".NET", "SkiaSharp"],
    skillsLearned: [
      "SkiaSharp canvas composition",
      "Badge template layout",
      "C# API response mapping",
      "Image export pipelines",
    ],
  },
  {
    link: "https://github.com/joshcord99/Find-A-Programmer",
    img: "/err404.jpg",
    alt: "Find-A-Programmer",
    title: "Find-A-Programmer",
    description:
      "Front-end web application built with React and TypeScript that connects to GitHub API for candidate search and profile viewing.",
    languagesUsed: ["TypeScript", "React", "CSS"],
    skillsLearned: [
      "GitHub candidate filtering",
      "TypeScript payload interfaces",
      "Profile result empty states",
      "Search form accessibility",
    ],
  },
  {
    link: "https://github.com/joshcord99/Personal-README-Generator",
    img: "/projects/PersonalReadMeProject.png",
    alt: "Personal README Generator",
    title: "Personal-README-Generator",
    description:
      "A command-line app that generates a professional README.md file from user input.",
    languagesUsed: ["JavaScript", "Node.js", "Markdown"],
    skillsLearned: [
      "Inquirer question flows",
      "Markdown section templating",
      "README license selection",
      "Command-line validation prompts",
    ],
  },
  {
    link: "https://github.com/joshcord99/Personal-Vehicle-Builder-Generator",
    img: "/projects/VehicleBuilder.jpg",
    alt: "Vehicle Builder",
    title: "Personal-Vehicle-Builder-Generator",
    description:
      "Lets users create custom virtual vehicles by selecting parts with price totals.",
    languagesUsed: ["TypeScript", "Node.js"],
    skillsLearned: [
      "Vehicle class inheritance",
      "Typed option menus",
      "Constructor-based assembly",
      "Part total calculation",
    ],
  },
  {
    link: "https://github.com/joshcord99/Personal-Weather-Information",
    img: "/projects/weatherimage.jpg",
    alt: "Weather Info",
    title: "Personal-Weather-Information",
    description:
      "Displays current weather using OpenWeather API based on city input.",
    languagesUsed: ["JavaScript", "HTML", "CSS"],
    skillsLearned: [
      "City query encoding",
      "Weather condition rendering",
      "Failed search messaging",
      "OpenWeather response parsing",
    ],
  },
];

const threeDProjects = [
  {
    title: "TrachH2O",
    description:
      "CAD design for a hydration-tracking prototype built around a load cell, sensor board, and microcontroller layout.",
    img: "/projects/trachh2o-serial-monitor.jpg",
    alt: "TrachH2O prototype weight readings and sensor setup",
    link: "https://github.com/joshcord99/TrachH2o",
    languagesUsed: ["Arduino C/C++", "Fusion 360"],
    skillsLearned: [
      "HX711 signal smoothing",
      "Load-cell tare calibration",
      "Electronics clearance planning",
      "Serial monitor debugging",
    ],
    images: [
      {
        src: "/projects/trachh2o-serial-monitor.jpg",
        alt: "Arduino serial monitor showing live weight readings for the TrachH2O prototype",
      },
      {
        src: "/projects/trachh2o-load-cell-prototype.jpg",
        alt: "Load cell and HX711 sensor wired to a microcontroller for the TrachH2O prototype",
      },
      {
        src: "/projects/trachh2o-cad-model.png",
        alt: "Fusion CAD model of cylindrical TrachH2O prototype parts",
      },
    ],
  },
  {
    title: "Motorcycle Speaker Custom Design",
    description:
      "Custom CAD speaker enclosure designed for a customer's motorcycle, including the measured front plate layout, dual-speaker fitment, mounting points, and finished printed housing.",
    img: "/projects/motorcycle-speaker-front.jpg",
    alt: "Finished custom motorcycle speaker enclosure viewed from the front",
    link: "#",
    languagesUsed: ["Fusion 360", "CAD modeling"],
    skillsLearned: [
      "Physical measurement translation",
      "Speaker depth clearance checks",
      "Mounting-hole tolerance planning",
      "Customer-ready CAD iteration",
    ],
    images: [
      {
        src: "/projects/motorcycle-speaker-front.jpg",
        alt: "Finished custom motorcycle speaker enclosure viewed from the front",
      },
      {
        src: "/projects/motorcycle-speaker-angle.jpg",
        alt: "Finished custom motorcycle speaker enclosure viewed from an angle",
      },
      {
        src: "/projects/motorcycle-speaker-cad-sketch.jpeg",
        alt: "Fusion CAD sketch layout for the custom motorcycle speaker enclosure",
      },
    ],
  },
];

const projectCategories = [
  {
    key: "coding",
    label: "Coding Projects",
    items: codingProjects,
  },
  {
    key: "3d-cad",
    label: "3D / CAD Projects",
    items: threeDProjects,
  },
];

const projectTree = {
  type: "root",
  key: "projects-root",
  label: "Projects",
  children: projectCategories.map((category) => ({
    type: "category",
    key: category.key,
    label: category.label,
    children: [
      {
        type: "projectCards",
        key: `${category.key}-cards`,
        label: `${category.label} Cards`,
        categoryKey: category.key,
        items: category.items,
      },
    ],
  })),
};

function ProjectTreeNode({
  node,
  selectedCategoryKey,
  selectedProject,
  onSelectCategory,
  onSelectProject,
  introText,
}) {
  if (!node) return null;

  const isRoot = node.type === "root";
  const isProjectCards = node.type === "projectCards";
  const isSelected = isProjectCards && selectedCategoryKey === node.categoryKey;

  const handleProjectSelect = (project) => {
    onSelectCategory(node.categoryKey);
    onSelectProject(project);
  };

  return (
    <li className={`tree-branch${isRoot ? " tree-branch-root" : ""}`}>
      {isRoot ? (
        <>
          <h1 className="portfolioHead tree-node-root">{node.label}</h1>
          {introText}
        </>
      ) : isProjectCards ? (
        <div
          className={`tree-card-node${isSelected ? " selected" : ""}`}
          aria-label={node.label}
        >
          <div className="tree-project-list">
            {node.items.map((project) => (
              <ProjectListItem
                project={project}
                key={project.title}
                isSelected={selectedProject?.title === project.title}
                onSelectProject={handleProjectSelect}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`tree-node tree-node-${node.type}`}
          aria-label={node.label}
        >
          <strong className="tree-node-title">{node.label}</strong>
        </div>
      )}

      {node.children?.length > 0 && (
        <div className="tree-subtree">
          <div className="tree-line-down" aria-hidden="true" />
          <ul
            className={`tree-children tree-children--${node.children.length > 1 ? "multi" : "single"}`}
            style={{ "--tree-child-count": node.children.length }}
          >
            {node.children.map((child) => (
              <ProjectTreeNode
                key={child.key}
                node={child}
                selectedCategoryKey={selectedCategoryKey}
                selectedProject={selectedProject}
                onSelectCategory={onSelectCategory}
                onSelectProject={onSelectProject}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function ProjectListItem({ project, isSelected, onSelectProject }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectProject(project);
    }
  };

  return (
    <button
      className={`tree-project-item${isSelected ? " selected" : ""}`}
      type="button"
      role="button"
      onClick={() => onSelectProject(project)}
      onKeyDown={handleKeyDown}
      aria-label={`Show details for ${project.title}`}
      aria-pressed={isSelected}
    >
      <div>
        <strong>{project.title}</strong>
        <span>{project.description}</span>
      </div>
    </button>
  );
}

function ProjectMoreDetails({ project }) {
  const detailGroups = [
    { label: "Languages / Tools Used:", items: project.languagesUsed },
    { label: "Skills Learned:", items: project.skillsLearned },
  ].filter((group) => group.items?.length);

  if (!detailGroups.length) return null;

  return (
    <div className="project-more-details">
      {detailGroups.map((group) => (
        <section className="project-more-detail-group" key={group.label}>
          <h3>{group.label}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ProjectDetail({ project }) {
  if (!project) {
    return (
      <section className="project-detail project-detail-empty" aria-live="polite">
        <p>Select a project card above to view details.</p>
      </section>
    );
  }

  const projectImages = project.images?.length
    ? project.images
    : [{ src: project.img, alt: project.alt }];

  return (
    <section className="project-detail" aria-live="polite">
      <div
        className={`project-gallery project-gallery--${
          projectImages.length > 1 ? "multi" : "single"
        }`}
      >
        {projectImages.map((image) => (
          <div className="project-image-link" key={image.src}>
            <img src={image.src} className="image" alt={image.alt} />
          </div>
        ))}
      </div>
      <p className="portfolioText">{project.title}</p>
      <p className="portfolioDescription">{project.description}</p>
      <ProjectMoreDetails project={project} />
      {project.link === "#" ? (
        <span className="repository-button disabled">Repository Coming Soon</span>
      ) : (
        <a
          className="repository-button"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Repository
        </a>
      )}
    </section>
  );
}

function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const projectImages = project.images?.length
    ? project.images
    : [{ src: project.img, alt: project.alt }];

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="project-modal-close"
          type="button"
          aria-label="Close project details"
          onClick={onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h2 id="project-modal-title">{project.title}</h2>
        <p className="project-modal-description">{project.description}</p>
        <div
          className={`project-gallery project-gallery--${
            projectImages.length > 1 ? "multi" : "single"
        }`}
      >
        {projectImages.map((image) => (
            <div className="project-image-link" key={image.src}>
              <img src={image.src} className="image" alt={image.alt} />
            </div>
          ))}
        </div>
        {project.link === "#" ? (
          <>
            <ProjectMoreDetails project={project} />
            <span className="repository-button disabled">
              Repository Coming Soon
            </span>
          </>
        ) : (
          <>
            <ProjectMoreDetails project={project} />
            <a
              className="repository-button"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Repository
            </a>
          </>
        )}
      </section>
    </div>
  );
}

export default function Portfolio() {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(
    projectCategories[0].key
  );
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const [isMobilePortfolio, setIsMobilePortfolio] = useState(false);
  const [projectScroll, setProjectScroll] = useState({ left: 0, width: 100 });
  const projectScrollRef = useRef(null);
  const projectScrollTrackRef = useRef(null);
  const projectScrollThumbRef = useRef(null);
  const projectScrollFrameRef = useRef(null);

  const updateProjectScroll = useCallback((scrollElement, syncState = true) => {
    if (!scrollElement) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
    const maxScrollLeft = scrollWidth - clientWidth;
    const width = Math.min(100, (clientWidth / scrollWidth) * 100);
    const left =
      maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * (100 - width) : 0;

    if (projectScrollThumbRef.current) {
      projectScrollThumbRef.current.style.left = `${left}%`;
      projectScrollThumbRef.current.style.width = `${width}%`;
    }

    if (syncState) setProjectScroll({ left, width });
  }, []);

  const setProjectScrollFromPointer = useCallback(
    (clientX) => {
      const scrollElement = projectScrollRef.current;
      const trackElement = projectScrollTrackRef.current;
      if (!scrollElement || !trackElement) return;

      const trackRect = trackElement.getBoundingClientRect();
      const currentThumbWidth =
        projectScrollThumbRef.current?.getBoundingClientRect().width ?? 0;
      const thumbWidthPx = Math.max(
        currentThumbWidth,
        (projectScroll.width / 100) * trackRect.width
      );
      const usableWidth = trackRect.width - thumbWidthPx;
      const pointerOffset = clientX - trackRect.left - thumbWidthPx / 2;
      const clampedOffset = Math.max(0, Math.min(pointerOffset, usableWidth));
      const scrollRatio = usableWidth > 0 ? clampedOffset / usableWidth : 0;

      scrollElement.scrollLeft =
        scrollRatio * (scrollElement.scrollWidth - scrollElement.clientWidth);
      updateProjectScroll(scrollElement, false);
    },
    [projectScroll.width, updateProjectScroll]
  );

  const handleProjectScrollbarPointerDown = (pointerEvent) => {
    pointerEvent.preventDefault();
    setProjectScrollFromPointer(pointerEvent.clientX);

    const handlePointerMove = (event) => {
      setProjectScrollFromPointer(event.clientX);
    };

    const handlePointerUp = () => {
      updateProjectScroll(projectScrollRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  useEffect(() => {
    const handleResize = () => updateProjectScroll(projectScrollRef.current);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateProjectScroll]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const updateMobileState = () => setIsMobilePortfolio(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    if (!modalProject) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setModalProject(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [modalProject]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    if (isMobilePortfolio) setModalProject(project);
  };

  const introText = (
    <p className="portfolioHeader">
      Projects branch into coding work and 3D/CAD work. Choose a project inside
      a branch card to view photos below.
    </p>
  );

  return (
    <div className="main-container page portfolio-page">
      <section className="project-tree-section" aria-label="Project tree">
        <div
          className="project-tree-scroll"
          ref={projectScrollRef}
          onScroll={(event) => {
            if (projectScrollFrameRef.current) {
              cancelAnimationFrame(projectScrollFrameRef.current);
            }

            const scrollElement = event.currentTarget;
            projectScrollFrameRef.current = requestAnimationFrame(() => {
              updateProjectScroll(scrollElement, false);
            });
          }}
        >
          <ul className="project-tree" id="project-tree">
            <ProjectTreeNode
              node={projectTree}
              selectedCategoryKey={selectedCategoryKey}
              selectedProject={selectedProject}
              onSelectCategory={setSelectedCategoryKey}
              onSelectProject={handleSelectProject}
              introText={introText}
            />
          </ul>
        </div>
        <div
          className="portfolio-scrollbar"
          role="scrollbar"
          aria-label="Project tree scroll"
          aria-controls="project-tree"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(projectScroll.left)}
          onPointerDown={handleProjectScrollbarPointerDown}
          ref={projectScrollTrackRef}
          tabIndex={0}
        >
          <div
            className="portfolio-scrollbar-thumb"
            ref={projectScrollThumbRef}
            style={{
              left: `${projectScroll.left}%`,
              width: `${projectScroll.width}%`,
            }}
          />
        </div>
      </section>

      <ProjectDetail project={selectedProject} />
      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
}
