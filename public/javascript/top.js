window.onload = () => {
  if (new URL(location.href).searchParams.get("error")) {
    alert(new URL(location.href).searchParams.get("error"));
  }
};

const header = document.querySelector("#menu-box");
const SCROLL_HEIGHT = 50;

function handleScroll() {
  const scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollHeight >= SCROLL_HEIGHT) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

window.addEventListener("scroll", handleScroll);

const loginForm = document.getElementById("login-form");
const logoutForm = document.getElementById("logout-form");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

if (loginBtn) {
  loginBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    console.log(ev.target.parentNode.parentNode.querySelector('input[name="currUrl"]'));
    ev.target.parentNode.parentNode.querySelector('input[name="currUrl"]').value = window.location.href;
    loginForm.submit();
  });
} else if (logoutBtn) {
  logoutBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    console.log(ev.target.parentNode.parentNode.querySelector('input[name="currUrl"]'));
    ev.target.parentNode.parentNode.querySelector('input[name="currUrl"]').value = window.location.href;
    logoutForm.submit();
  });
}
