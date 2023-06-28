// imgUrl, postId
// 게시글 클릭 시
const posts = document.querySelectorAll(".picture-box");
posts.forEach((post) => {
  post.addEventListener("click", () => {
    axios.get(``).then().catch();
  });
});

// 스크롤이 아래 끝까지 닿으면
window.addEventListener("scroll", function () {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    loadMoreContent();
  }
});

const userId = document.querySelector('input[name="userId"]').value;
const boardName = document.querySelector('input[name="boardName"]').value;
function loadMoreContent() {
  // AJAX 요청을 보내서 추가 콘텐츠를 불러옵니다.
  // (create element, appendchild 등을 통해 사진 box 생성)

  // 현재 불러온 post의 수를 체크해서 그 뒤에서부터 DB로부터 읽어들인다
  const loadedPicCount = document.querySelectorAll(".picture-box").length;
  axios
    .get(`/boards/picture/posts?sortType=${changeNumberSort}&picCount=${loadedPicCount}&reqPostCount=4`)
    .then((response) => {
          const posts = response.data;
          const picContainer = document.querySelector(".container");
          posts.forEach((post) => {
            const pictureBox = document.createElement("div");
            pictureBox.setAttribute("class", "picture-box");
            pictureBox.innerHTML = `
            <input type="hidden" name="imgUrl" value="${post.imgUrl}" />
            <input type="hidden" name="postId" value="${post.id}" />
            <div class="bottom-area">
              <div class="view-count">조회수 : ${post.view}</div>
              <div class='like-info'>
                <button class="icon-button"><i class="fa fa-heart"></i></button>
                <div class="like-count">${post.likeCount}</div>
              </div>
            </div>
          `;
            console.log(`pictureBox ${post.id} 추가`);
            pictureBox.style.backgroundImage = `url('${post.imgUrl}')`;
            pictureBox.addEventListener("click", (ev) => {
              console.log(`/page/${boardName}/${post.id}`);
              window.location.href = `/page/${boardName}/${post.id}`;
            });
            picContainer.appendChild(pictureBox);
            const likeBtn = pictureBox.querySelector(".icon-button");
            likeBtn.addEventListener("click", (ev) => {
              ev.stopPropagation();
              if (userId) {
                const confirmed = confirm("이 게시글을 추천하시겠습니까?");
                if (confirmed) {
                  const postId = pictureBox.querySelector('input[name="postId"]').value;
                  // 추천 내역 없음
                  if (!likedPostList.includes(postId)) {
                    const data = {
                      userId: `${userId}`,
                      postId: `${postId}`,
                    };
                    console.log(data.userId, data.postId);
                    axios
                      .post(`/posts/${postId}/likes`, data)
                      .then((res) => {
                        // console.log(`${res.data.UserId}유저가 ${res.data.PostId}게시글을 추천하셨습니다`);
                        location.reload();
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  } else {
                    // 이미 추천 했음
                    customAlert("해당 게시글은 이미 추천하셨습니다", "info", 2000);
                  }
                }
              } else {
                // 로그인 안한 상태에서 추천 누를 경우
                // alert("로그인 하셔야 추천하실 수 있습니다");
                customAlert("로그인하셔야 추천하실 수 있습니다", "error", 2000);
              }
            }, true);
          });
        })
        .catch((error) => {
          console.error(error);
        });
}




// 사이드바 따라오는 코드
const sidebarWrapper = document.querySelector(".sidebar");
const sidebarHeight = sidebarWrapper.offsetHeight;
const initialTop =
  sidebarWrapper.getBoundingClientRect().top + window.pageYOffset;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  console.log(`scrollTop : ${scrollTop}`);
  console.log(`windowHeight : ${windowHeight}`);
  console.log(`documentHeight : ${documentHeight}`);

  const isSidebarVisible = sidebarHeight + windowHeight >= documentHeight;

  // if (!isSidebarVisible) {
    if(true){
    const distanceToTop = scrollTop - initialTop + windowHeight / 1.67;
    sidebarWrapper.style.position = "absolute";
    sidebarWrapper.style.top = `${distanceToTop}px`;
  } else {
    sidebarWrapper.style.position = "fixed";
    sidebarWrapper.style.top = "auto";
    sidebarWrapper.style.bottom = "0";
  }
});

//맨 위로
document.querySelector(".scrollup").addEventListener("click", scrollToTop);
document.querySelector(".scrolldown").addEventListener('click', scrollToDown);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function scrollToDown() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth"});
}