const petHospital = document.querySelector(".pet-hospital");
const display = document.querySelector(".displaymap");

const dogbtn = document.querySelector(".dogBtn");
const catbtn = document.querySelector(".catBtn");
const dogitem = document.querySelector(".dogitem");
const catitem = document.querySelector(".catitem");

const heartbeat = document.querySelector(".fa-heartbeat");
const fadog = document.querySelector(".fa-dog");
const facat = document.querySelector(".fa-cat");

dogbtn.addEventListener("click", () => {
  dogitem.classList.remove("hidenMap");
  catitem.classList.add("hidenMap");
  display.classList.add("hidenMap");

  dogbtn.style.borderColor = "rgb(179, 132, 255)";
  catbtn.style.borderColor = "";
  petHospital.style.borderColor = "";

  heartbeat.style.color = "";
  fadog.style.color = "rgb(179, 132, 255)";
  facat.style.color = "";
});

catbtn.addEventListener("click", () => {
  catitem.classList.remove("hidenMap");
  dogitem.classList.add("hidenMap");
  display.classList.add("hidenMap");

  catbtn.style.borderColor = "rgb(179, 132, 255)";
  dogbtn.style.borderColor = "";
  petHospital.style.borderColor = "";

  heartbeat.style.color = "";
  fadog.style.color = "";
  facat.style.color = "rgb(179, 132, 255)";
});

petHospital.addEventListener("click", () => {
  display.classList.remove("hidenMap");
  dogitem.classList.add("hidenMap");
  catitem.classList.add("hidenMap");

  petHospital.style.borderColor = "rgb(179, 132, 255)";
  dogbtn.style.borderColor = "";
  catbtn.style.borderColor = "";

  heartbeat.style.color = "rgb(179, 132, 255)";
  fadog.style.color = "";
  facat.style.color = "";
});
