
    const buttons = document.querySelectorAll('.postinfo-btn');
// 각 버튼 클릭 이벤트 팝업창 호출
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const popup = this.nextElementSibling;
            popup.style.display = 'block';
        });
    });
// x 클릭하면 팝업 창을 닫기.
    const close = document.querySelectorAll('.close');
    close.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const popup = this.parentNode.parentNode;
            popup.style.display = 'none';
        });
    });
// 팝업 밖을 클릭하면 팝업 창을 닫기
    const popups = document.querySelectorAll('.popup');
    window.addEventListener('click', function (event) {
        popups.forEach(function (popup) {
            if (event.target == popup) {
                popup.style.display = 'none';
            }
        });
    });

// 게시글정보 팝업창에서 해당게시글 삭제
    const deletePostBtns = document.querySelectorAll(".admin_post_del");
    deletePostBtns.forEach((deletePostBtn) => {
        deletePostBtn.addEventListener("click", () => {
            const confirmed = confirm("정말 게시글을 삭제하시겠습니까?");
            if (confirmed) {
                const postId = deletePostBtn.getAttribute("data-id");
                const boardName = "boardName";
                axios
                    .delete(`/boards/${boardName}/posts/${postId}`)
                    .then((res) => {
                        window.location.href = "/page/admin_post";
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    });


// 게시글 검색
    const searchBtn = document.querySelector(".post-search-btn");
    const searchInput = document.querySelector(".search_posts");
    const posts = document.querySelector("#posts aside");

    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase(); // 검색어를 소문자로 변경하여 저장

        // 게시글 목록에서 검색어가 포함된 게시글 정보만 필터링하여 출력
        Array.from(posts.querySelectorAll("h3")).forEach((post) => {
            if (post.textContent.toLowerCase().includes(query)) {
                post.style.display = "block";
                post.nextElementSibling.style.display = "block"; // 다음 요소인 게시글 정보 보기 버튼을 보여줌
            } else {
                post.style.display = "none";
                post.nextElementSibling.style.display = "none"; // 다음 요소인 게시글 정보 보기 버튼을 숨김
            }
        });
    });

