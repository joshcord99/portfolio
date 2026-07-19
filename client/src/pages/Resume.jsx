import "../css/Resume.css";
import resumeData from "../data/resumeData";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Resume() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timelineScroll, setTimelineScroll] = useState({ left: 0, width: 100 });
  const timelineRef = useRef(null);
  const timelineScrollTrackRef = useRef(null);
  const timelineScrollThumbRef = useRef(null);
  const timelineScrollFrameRef = useRef(null);

  useEffect(() => {
    if (!selectedEvent) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedEvent(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedEvent]);

  const openEvent = (eventItem) => {
    setSelectedEvent(eventItem);
  };

  const handleEventKeyDown = (keyboardEvent, eventItem) => {
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      keyboardEvent.preventDefault();
      openEvent(eventItem);
    }
  };

  const formatEventDate = (eventItem) =>
    eventItem.endDate
      ? `${eventItem.startDate} - ${eventItem.endDate}`
      : eventItem.startDate;

  const updateTimelineScroll = useCallback((timelineElement, syncState = true) => {
    if (!timelineElement) return;

    const { scrollLeft, scrollWidth, clientWidth } = timelineElement;
    const maxScrollLeft = scrollWidth - clientWidth;
    const width = Math.min(100, (clientWidth / scrollWidth) * 100);
    const left =
      maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * (100 - width) : 0;

    if (timelineScrollThumbRef.current) {
      timelineScrollThumbRef.current.style.left = `${left}%`;
      timelineScrollThumbRef.current.style.width = `${width}%`;
    }

    if (syncState) setTimelineScroll({ left, width });
  }, []);

  const setTimelineScrollFromPointer = useCallback(
    (clientX) => {
      const timelineElement = timelineRef.current;
      const trackElement = timelineScrollTrackRef.current;
      if (!timelineElement || !trackElement) return;

      const trackRect = trackElement.getBoundingClientRect();
      const currentThumbWidth =
        timelineScrollThumbRef.current?.getBoundingClientRect().width ?? 0;
      const thumbWidthPx = Math.max(
        currentThumbWidth,
        (timelineScroll.width / 100) * trackRect.width
      );
      const usableWidth = trackRect.width - thumbWidthPx;
      const pointerOffset = clientX - trackRect.left - thumbWidthPx / 2;
      const clampedOffset = Math.max(0, Math.min(pointerOffset, usableWidth));
      const scrollRatio = usableWidth > 0 ? clampedOffset / usableWidth : 0;

      timelineElement.scrollLeft =
        scrollRatio * (timelineElement.scrollWidth - timelineElement.clientWidth);
      updateTimelineScroll(timelineElement, false);
    },
    [timelineScroll.width, updateTimelineScroll]
  );

  const handleScrollbarPointerDown = (pointerEvent) => {
    pointerEvent.preventDefault();
    setTimelineScrollFromPointer(pointerEvent.clientX);

    const handlePointerMove = (event) => {
      setTimelineScrollFromPointer(event.clientX);
    };

    const handlePointerUp = () => {
      updateTimelineScroll(timelineRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  useEffect(() => {
    const handleResize = () => updateTimelineScroll(timelineRef.current);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateTimelineScroll]);

  return (
    <div className="main-container page resume-page">
      <div id="resume-text">
        <div>
          {/* TECHNICAL FOUNDATION */}
          <h2 className="resumeHead text-center">TECHNICAL FOUNDATION</h2>
          <ul>
            <li className="resumeText">
              <strong>Languages:</strong> {resumeData.technicalSkills.languages}
            </li>
            <li className="resumeText">
              <strong>Frameworks & Libraries:</strong>{" "}
              {resumeData.technicalSkills.frameworksLibraries}
            </li>
            <li className="resumeText">
              <strong>Backend Technologies:</strong>{" "}
              {resumeData.technicalSkills.backendTechnologies}
            </li>
            <li className="resumeText">
              <strong>Tools & Platforms:</strong>{" "}
              {resumeData.technicalSkills.toolsPlatforms}
            </li>
          </ul>

          <section className="timeline-bottom-section">
            {/* CAREER TIMELINE */}
            <h2 className="resumeHead text-center career-timeline-heading">
              CAREER TIMELINE
            </h2>
            <p className="timeline-scroll-cue">
              Scroll horizontally to view each event.
            </p>
            <div className="timeline-frame">
              <div
                id="career-timeline"
                className="work-timeline"
                style={{
                  "--timeline-span": resumeData.careerTimeline.length - 1,
                }}
                aria-label="Career timeline"
                ref={(element) => {
                  timelineRef.current = element;
                }}
                onScroll={(event) => {
                  if (timelineScrollFrameRef.current) {
                    cancelAnimationFrame(timelineScrollFrameRef.current);
                  }

                  const timelineElement = event.currentTarget;
                  timelineScrollFrameRef.current = requestAnimationFrame(() => {
                    updateTimelineScroll(timelineElement, false);
                  });
                }}
              >
                {resumeData.careerTimeline.map((job, index) => {
                  const hasDetails =
                    job.details?.length ||
                    job.skills?.length ||
                    job.references?.length ||
                    job.achievements?.length ||
                    job.credentials?.length ||
                    job.summary;

                  return (
                    <article
                      key={`${job.title}-${job.startDate}`}
                      className={`timeline-item timeline-position-${index + 1}${
                        index === resumeData.careerTimeline.length - 1
                          ? " timeline-item-last"
                          : ""
                      }`}
                    >
                      <div className="timeline-marker" aria-hidden="true"></div>
                      <div
                        className={`timeline-content${hasDetails ? "" : " timeline-content-static"}`}
                        role={hasDetails ? "button" : undefined}
                        tabIndex={hasDetails ? 0 : undefined}
                        onClick={hasDetails ? () => openEvent(job) : undefined}
                        onKeyDown={
                          hasDetails
                            ? (event) => handleEventKeyDown(event, job)
                            : undefined
                        }
                        aria-label={
                          hasDetails ? `Open details for ${job.title}` : undefined
                        }
                      >
                        <p className="timeline-date">
                          <span>{job.startDate}</span>
                          {job.endDate && (
                            <>
                              <span aria-hidden="true">-</span>
                              <span>{job.endDate}</span>
                            </>
                          )}
                        </p>
                        <h3>{job.title}</h3>
                        <p className="timeline-company">
                          {job.company} / {job.location}
                        </p>
                        {hasDetails && (
                          <span className="timeline-card-hint">
                            {job.credentials?.length
                              ? `View details + ${job.credentials.length} credential${job.credentials.length > 1 ? "s" : ""}`
                              : "View details"}
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div
                className="timeline-scrollbar"
                role="scrollbar"
                aria-label="Career timeline scroll"
                aria-controls="career-timeline"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(timelineScroll.left)}
                tabIndex={0}
                onPointerDown={handleScrollbarPointerDown}
                ref={timelineScrollTrackRef}
              >
                <div
                  className="timeline-scrollbar-thumb"
                  ref={timelineScrollThumbRef}
                  style={{
                    left: `${timelineScroll.left}%`,
                    width: `${timelineScroll.width}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <div className="resume-download-section">
            <h2 className="resumeHead text-center">Resume Download</h2>
            <a
              className="download-link"
              href="/Joshua-Cordial-Resume-pdf.pdf"
              download="/Joshua-Cordial-Resume-pdf.pdf"
            >
              <button>Download Resume</button>
            </a>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div
          className="timeline-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedEvent(null)}
        >
          <section
            className="timeline-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="timeline-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="timeline-modal-close"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close details"
            >
              &times;
            </button>

            <p className="timeline-modal-date">
              {formatEventDate(selectedEvent)}
            </p>
            <h2 id="timeline-modal-title">{selectedEvent.title}</h2>
            <p className="timeline-modal-location">
              {selectedEvent.company} / {selectedEvent.location}
            </p>
            <p className="timeline-modal-summary">{selectedEvent.summary}</p>

            {selectedEvent.credentials?.length > 0 && (
              <div className="timeline-modal-credentials">
                <h3>Credentials</h3>
                <div className="timeline-credentials-grid">
                  {selectedEvent.credentials.map((credential) =>
                    credential.type === "image" ? (
                      <a
                        key={credential.src}
                        className="timeline-credential-card timeline-credential-image"
                        href={credential.src}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={credential.src}
                          alt={credential.alt || credential.label}
                          loading="lazy"
                        />
                        <span>{credential.label}</span>
                      </a>
                    ) : (
                      <a
                        key={credential.src}
                        className="timeline-credential-card timeline-credential-pdf"
                        href={credential.src}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="timeline-credential-pdf-icon" aria-hidden="true">
                          PDF
                        </span>
                        <span>{credential.label}</span>
                      </a>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="timeline-modal-grid">
              <div>
                {selectedEvent.achievements?.length > 0 && (
                  <>
                    <h3>Achievements</h3>
                    <ul className="timeline-modal-achievements">
                      {selectedEvent.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedEvent.details?.length > 0 && (
                  <>
                    <h3>Responsibilities / Details</h3>
                    <ul>
                      {selectedEvent.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div>
                {selectedEvent.skills?.length > 0 && (
                  <>
                    <h3>Skills / Knowledge</h3>
                    <div className="timeline-modal-skills">
                      {selectedEvent.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </>
                )}

                {selectedEvent.references?.length > 0 && (
                  <>
                    <h3>References / Context</h3>
                    <ul>
                      {selectedEvent.references.map((reference) => (
                        <li key={reference}>{reference}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
