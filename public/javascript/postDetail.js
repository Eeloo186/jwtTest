const commentText = document.getElementById("comment-textarea");

const writeArea = document.querySelector("#comments-write-area");

commentText.addEventListener("focus", () => {
  writeArea.style.border = "2px solid rgb(204, 0, 255)";
});

commentText.addEventListener("blur", () => {
  writeArea.style.border = "";
});
