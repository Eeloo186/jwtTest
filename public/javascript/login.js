const userid = document.getElementById("userid");
const userPwd = document.getElementById("userPwd");
const loginBtn = document.querySelector(".submit-btn");

loginBtn.addEventListener("click", (event) => {
  if (userid.value == "") {
    event.preventDefault();
    userid.style.outline = "1px solid red";
    userid.style.border = "1px solid red";
    userid.focus();
  } else {
    userid.style.outline = "none";
    userid.style.border = "1px solid rgb(189, 189, 189)";
    if (userPwd.value == "") {
      event.preventDefault();
      userPwd.style.outline = "1px solid red";
      userPwd.style.border = "1px solid red";
      userPwd.focus();
    }
  }
});
