import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const sourcePath = new URL("../client/src/data/resumeData.jsx", import.meta.url);
const outputPath = "/private/tmp/joshua-cordial-resume.html";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function list(items = []) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function formatDate(item) {
  return item.endDate ? `${item.startDate} - ${item.endDate}` : item.startDate;
}

const source = await readFile(sourcePath, "utf8");
const script = new vm.Script(
  `${source.replace("export default resumeData;", "")}\nresumeData;`
);
const resumeData = script.runInNewContext({});
const coreCompetencies = [
  "Software Development",
  "Application Development",
  "Automation",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "Python",
  "C",
  "C++",
  "REST APIs",
  "API Integration",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "GitHub",
  "AI-Assisted Development",
  "Debugging",
  "Technical Troubleshooting",
  "Data Accuracy",
  "Operations Systems",
  "CAD Modeling",
  "3D Printing",
];

const credentialItems = resumeData.careerTimeline
  .filter((item) => item.credentials?.length)
  .map(
    (item) => `
      <article>
        <div class="item-heading">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.company)} / ${escapeHtml(item.location)}</p>
          </div>
          <time>${escapeHtml(formatDate(item))}</time>
        </div>
        ${list(item.credentials.map((credential) => credential.label))}
        ${item.achievements?.length ? list(item.achievements) : ""}
      </article>
    `
  )
  .join("");

const experienceItems = resumeData.experience
  .map(
    (job) => `
      <article>
        <div class="item-heading">
          <div>
            <h3>${escapeHtml(job.title)}</h3>
            <p>${escapeHtml(job.company)} / ${escapeHtml(job.location)}</p>
          </div>
          <time>${escapeHtml(job.date)}</time>
        </div>
        ${list(job.responsibilities)}
        <p class="keyword-line"><strong>Skills:</strong> ${escapeHtml(job.skills.join(", "))}</p>
      </article>
    `
  )
  .join("");

const projectItems = resumeData.projects
  .map(
    (project) => `
      <article>
        <div class="item-heading">
          <div>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.role)} / ${escapeHtml(project.tools)}</p>
          </div>
        </div>
        <p>${escapeHtml(project.description)}</p>
        <p class="keyword-line"><strong>Links:</strong> ${escapeHtml(project.github)}${
          project.live ? ` / ${escapeHtml(project.live)}` : ""
        }</p>
      </article>
    `
  )
  .join("");

const educationItems = resumeData.education
  .map(
    (education) =>
      `<li><strong>${escapeHtml(education.degree)}</strong> - ${escapeHtml(
        education.institution
      )}</li>`
  )
  .join("");

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Joshua Cordial Resume</title>
    <style>
      @page {
        margin: 0.48in;
        size: letter;
      }

      * {
        box-sizing: border-box;
      }

      body {
        color: #172033;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 10.5px;
        line-height: 1.35;
        margin: 0;
      }

      header {
        border-bottom: 2px solid #1b6f88;
        margin-bottom: 14px;
        padding-bottom: 8px;
      }

      h1 {
        color: #0f2433;
        font-size: 27px;
        letter-spacing: 0.04em;
        margin: 0 0 4px;
        text-transform: uppercase;
      }

      h2 {
        border-bottom: 1px solid #b7c7d3;
        color: #1b6f88;
        font-size: 13px;
        letter-spacing: 0.06em;
        margin: 15px 0 7px;
        padding-bottom: 3px;
        text-transform: uppercase;
      }

      h3 {
        color: #102030;
        font-size: 11.5px;
        margin: 0;
      }

      p {
        margin: 0 0 5px;
      }

      .headline {
        color: #1b6f88;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.03em;
        margin-bottom: 3px;
        text-transform: uppercase;
      }

      ul {
        margin: 4px 0 0;
        padding-left: 16px;
      }

      li {
        margin-bottom: 2px;
      }

      article {
        break-inside: avoid;
        margin-bottom: 9px;
      }

      .contact {
        color: #425268;
        font-size: 10.5px;
      }

      .grid {
        display: grid;
        gap: 12px;
        grid-template-columns: 1fr 1fr;
      }

      .item-heading {
        align-items: start;
        display: flex;
        gap: 14px;
        justify-content: space-between;
        margin-bottom: 2px;
      }

      .item-heading p,
      time {
        color: #526074;
        font-size: 10px;
        font-weight: 700;
      }

      time {
        flex: 0 0 auto;
        text-align: right;
      }

      .skill-list {
        display: grid;
        gap: 4px;
        grid-template-columns: 1fr;
      }

      .skill-list p {
        margin: 0;
      }

      .competency-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 10px;
        margin: 0;
        padding: 0;
      }

      .competency-list li {
        display: inline;
        font-weight: 700;
        margin: 0;
      }

      .keyword-line {
        color: #425268;
        font-size: 10px;
        margin-top: 4px;
      }

    </style>
  </head>
  <body>
    <header>
      <h1>Joshua Cordial</h1>
      <p class="headline">${escapeHtml(resumeData.headline)}</p>
      <p class="contact">joshcord99@gmail.com / github.com/joshcord99 / linkedin.com/in/joshua-cordial-0aa18a3a0</p>
    </header>

    <section>
      <h2>Professional Summary</h2>
      <p>${escapeHtml(resumeData.summary)}</p>
    </section>

    <section>
      <h2>Core Competencies</h2>
      <ul class="competency-list">${coreCompetencies
        .map((skill) => `<li>${escapeHtml(skill)}</li>`)
        .join("")}</ul>
    </section>

    <section>
      <h2>Technical Skills</h2>
      <div class="skill-list">
        <p><strong>Languages:</strong> ${escapeHtml(resumeData.technicalSkills.languages)}</p>
        <p><strong>Frameworks/Libraries:</strong> ${escapeHtml(resumeData.technicalSkills.frameworksLibraries)}</p>
        <p><strong>Backend:</strong> ${escapeHtml(resumeData.technicalSkills.backendTechnologies)}</p>
        <p><strong>AI Programming:</strong> ${escapeHtml(resumeData.technicalSkills.aiProgramming)}</p>
        <p><strong>Tools/Platforms:</strong> ${escapeHtml(resumeData.technicalSkills.toolsPlatforms)}</p>
      </div>
    </section>

    <section>
      <h2>Experience</h2>
      ${experienceItems}
    </section>

    <section>
      <h2>Projects</h2>
      ${projectItems}
    </section>

    <section>
      <h2>Education</h2>
      <ul>${educationItems}</ul>
    </section>

    <section>
      <h2>Credentials</h2>
      <div class="grid">${credentialItems}</div>
    </section>
  </body>
</html>`;

await writeFile(outputPath, html);
console.log(outputPath);
