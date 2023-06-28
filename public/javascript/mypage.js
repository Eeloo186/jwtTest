// const mypostButton = document.getElementById("mypostBtn");
// mypostButton.addEventListener("click", async () => {
//   const postList = document.getElementById("post-list-div");
//   if (!parseInt(document.getElementById("check-first").value, 10)) {
//     document.getElementById("check-first").value = 1;
//     await axios
//       .get("/users/{{user.id}}/posts")
//       .then((res) => {
//         // 작성글 목록 얻어옴
//         const posts = res.data.posts;

//         // 요소에 작성글 목록 추가
//         posts.forEach((post) => {
//           const postInfo = document.createElement("li");
//           postInfo.style.listStyle = "none";
//           postInfo.innerHTML = `작성자 ID : ${post.User.userId}<br>작성자 닉네임 : ${post.User.nickname}<br>제목 : ${post.title}<br>글내용 : ${post.Content.content}<br>작성일 : ${post.createdAt}<hr>`;
//           postList.appendChild(postInfo);
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     // 작성글 목록 show 처리
//     postList.style.display = "block";
//   } else {
//     // 작성글 목록 show/hide 처리
//     if (postList.style.display === "block") {
//       postList.style.display = "none";
//     } else {
//       postList.style.display = "block";
//     }
//   }
// });
