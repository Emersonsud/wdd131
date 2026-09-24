// ---------------------------------------------------------
// W04 Assignment: Picture Album Enhancement
// Array of temple objects (7 from the assignment sample +
// 3 additional real temples added per instruction #5)
// ---------------------------------------------------------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-62834-main.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495-main.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/washington-d.c.-temple/washington-d.c.-temple-14992-main.jpg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-temple/lima-peru-temple-12721-main.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-4060-main.jpg",
  },
  // --- 3 additional temples (instruction #5) ---------------
  // NOTE: swap these imageUrl placeholders for the real photo
  // links from https://churchofjesuschristtemples.org before
  // you submit, so every card shows the correct picture.
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg",
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/provo-city-center-temple/provo-city-center-temple-56386-main.jpg",
  },
];

// ---------------------------------------------------------
// Render temple cards into the page
// ---------------------------------------------------------
const cardContainer = document.querySelector("#temple-cards");
const filterHeading = document.querySelector("#filter-heading");

function displayTemples(templeArray) {
  cardContainer.innerHTML = "";

  templeArray.forEach((temple) => {
    const card = document.createElement("figure");
    card.classList.add("temple-card");

    const heading = document.createElement("h3");
    heading.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<strong>Size:</strong> ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy");

    card.appendChild(heading);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(img);

    cardContainer.appendChild(card);
  });
}

// ---------------------------------------------------------
// Filtering logic (instruction #7)
// ---------------------------------------------------------
function filterTemples(filter) {
  let filtered;
  let heading;

  switch (filter) {
    case "old":
      filtered = temples.filter(
        (temple) => parseInt(temple.dedicated.split(",")[0]) < 1900,
      );
      heading = "Old Temples (before 1900)";
      break;
    case "new":
      filtered = temples.filter(
        (temple) => parseInt(temple.dedicated.split(",")[0]) > 2000,
      );
      heading = "New Temples (after 2000)";
      break;
    case "large":
      filtered = temples.filter((temple) => temple.area > 90000);
      heading = "Large Temples (over 90,000 sq ft)";
      break;
    case "small":
      filtered = temples.filter((temple) => temple.area < 10000);
      heading = "Small Temples (under 10,000 sq ft)";
      break;
    default:
      filtered = temples;
      heading = "Home";
  }

  filterHeading.textContent = heading;
  displayTemples(filtered);
}

// ---------------------------------------------------------
// Navigation events
// ---------------------------------------------------------
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const filter = link.getAttribute("data-filter");
    filterTemples(filter);

    // Close the mobile menu after a selection
    document.querySelector("#primary-nav").classList.remove("open");
    document
      .querySelector("#menu-toggle")
      .setAttribute("aria-expanded", "false");
  });
});

// ---------------------------------------------------------
// Hamburger menu toggle (responsive nav)
// ---------------------------------------------------------
const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// ---------------------------------------------------------
// Footer: dynamic copyright year + last modified date
// ---------------------------------------------------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `${document.lastModified}`;

// ---------------------------------------------------------
// Initial render
// ---------------------------------------------------------
displayTemples(temples);
