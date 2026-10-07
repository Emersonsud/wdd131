const projects = [
  {
    title: "Temple Album",
    category: "web",
    year: 2026,
    image: "images/temple-album.webp",
    alt: "Temple Album page showing a grid of temple photos with their location, dedication date and size",
    description: "A filterable picture album of temples built with a JavaScript array of objects and natively lazy-loaded images.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "../filtered-temples.html"
  },
  {
    title: "Product Review Form",
    category: "web",
    year: 2026,
    image: "images/review-form.webp",
    alt: "Product Review form with a product menu, star rating, date field and feature checkboxes",
    description: "An accessible review form that sends its data to a confirmation page and counts submitted reviews with localStorage.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "../form.html"
  },
  {
    title: "Website Plan",
    category: "web",
    year: 2026,
    image: "images/site-plan.webp",
    alt: "Emerson Portfolio planning document with site name, purpose and scenarios",
    description: "The planning document for this portfolio, with the site purpose, scenarios, color scheme and typography.",
    tech: ["HTML", "CSS"],
    link: "siteplan.html"
  },
  {
    title: "YouTube Videos",
    category: "csharp",
    year: 2026,
    image: "images/youtube-videos.webp",
    alt: "Terminal output of the YouTube Videos program showing a video title, author, length and its comments",
    description: "A C# console program that models videos and comments with classes, encapsulation and lists.",
    tech: ["C#", "OOP"],
    link: ""
  },
  {
    title: "Online Ordering",
    category: "csharp",
    year: 2026,
    image: "images/online-ordering.webp",
    alt: "Terminal output of the Online Ordering program showing packing labels, shipping labels and total prices",
    description: "A C# console program that builds customer orders, products and shipping labels using object-oriented design.",
    tech: ["C#", "OOP"],
    link: ""
  }
];

const skills = [
  { name: "HTML", level: 85 },
  { name: "CSS", level: 80 },
  { name: "JavaScript", level: 70 },
  { name: "C#", level: 65 },
  { name: "Git and GitHub", level: 70 }
];

function buildProjectCard(project) {
  const tags = project.tech.map(item => `<li>${item}</li>`).join("");
  const action = project.link
    ? `<a href="${project.link}">View project</a>`
    : `<span>Course project (code on GitHub)</span>`;

  return `
    <article class="project-card">
      <img src="${project.image}" alt="${project.alt}" width="640" height="400" loading="lazy">
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="tags">${tags}</ul>
        <p>${action}</p>
      </div>
    </article>`;
}

function renderProjects(list, container) {
  if (list.length === 0) {
    container.innerHTML = `<p>No projects found in this category.</p>`;
    return;
  }
  container.innerHTML = list.map(buildProjectCard).join("");
}

function setupFilters(container) {
  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const filtered = category === "all"
        ? projects
        : projects.filter(project => project.category === category);

      buttons.forEach(item => item.classList.toggle("active", item === button));
      buttons.forEach(item => item.setAttribute("aria-pressed", `${item === button}`));
      renderProjects(filtered, container);
    });
  });
}

function renderSkills(container) {
  container.innerHTML = skills.map(skill => `
    <li>
      <span>${skill.name} (${skill.level}%)</span>
      <div class="bar" role="img" aria-label="${skill.name} skill level ${skill.level} percent"><span style="width: ${skill.level}%"></span></div>
    </li>`).join("");
}

function setupMenu() {
  const button = document.querySelector("#menu-button");
  const nav = document.querySelector("#main-nav");

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", `${isOpen}`);
    button.textContent = isOpen ? `✕` : `☰`;
  });
}

function updateVisitCounter() {
  const output = document.querySelector("#visit-count");
  const stored = Number(localStorage.getItem("emerson-visits")) || 0;
  const visits = stored + 1;

  localStorage.setItem("emerson-visits", `${visits}`);
  output.textContent = visits === 1
    ? `Welcome! This is your first visit.`
    : `Welcome back! You have visited ${visits} times.`;
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const saved = JSON.parse(localStorage.getItem("emerson-messages")) || [];

  status.textContent = saved.length > 0
    ? `You have sent ${saved.length} message${saved.length === 1 ? "" : "s"} from this browser.`
    : ``;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      topic: form.elements.topic.value,
      message: form.elements.message.value.trim(),
      date: new Date().toLocaleDateString()
    };

    if (data.message.length < 10) {
      status.className = "error";
      status.textContent = `Please write a message of at least 10 characters.`;
      return;
    }

    saved.push(data);
    localStorage.setItem("emerson-messages", JSON.stringify(saved));
    status.className = "success";
    status.textContent = `Thank you, ${data.name}! Your message about "${data.topic}" was saved on ${data.date}.`;
    form.reset();
  });
}

function showFooterYear() {
  document.querySelector("#year").textContent = `${new Date().getFullYear()}`;
}

function init() {
  setupMenu();
  showFooterYear();
  updateVisitCounter();

  const featured = document.querySelector("#featured-projects");
  const allProjects = document.querySelector("#all-projects");
  const skillList = document.querySelector("#skill-list");
  const contactForm = document.querySelector("#contact-form");

  if (featured) {
    renderProjects(projects.slice(0, 3), featured);
  }
  if (allProjects) {
    renderProjects(projects, allProjects);
    setupFilters(allProjects);
  }
  if (skillList) {
    renderSkills(skillList);
  }
  if (contactForm) {
    setupContactForm();
  }
}

init();
