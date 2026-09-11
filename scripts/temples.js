// Data e Copyright no Rodapé
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

// Menu Hambúrguer
const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("open");
});
