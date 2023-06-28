const buttons = document.querySelectorAll('.memberinfo-btn');
// 각 버튼 클릭 이벤트 팝업창 호출
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const popup = this.nextElementSibling;
        popup.style.display = 'block';
    });
});
// x 클릭하면 팝업 창을 닫기.
const close = document.querySelectorAll('.close');
close.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const popup = this.parentNode.parentNode;
        popup.style.display = 'none';
    });
});
// 팝업 밖을 클릭하면 팝업 창을 닫기
const popups = document.querySelectorAll('.popup');
window.addEventListener('click', function(event) {
    popups.forEach(function(popup) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});

// 회원정보 검색 ((
const searchBtn = document.getElementById("mem-search-btn");
const searchInput = document.querySelector(".search-members");
const members = document.getElementById("members");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase(); // 검색어를 소문자로 변경하여 저장

    // 회원 목록에서 검색어가 포함된 회원 정보만 필터링하여 출력
    Array.from(members.querySelectorAll("h3")).forEach((member) => {
        if (member.textContent.toLowerCase().includes(query)) {
            member.style.display = "block";
        } else {
            member.style.display = "none";
        }
        Array.from(members.querySelectorAll("h3")).forEach((member) => {
            if (member.textContent.toLowerCase().includes(query)) {
                member.style.display = "block";
                member.nextElementSibling.style.display = "block"; // 다음 요소인 회원 정보 보기 버튼을 보여줌
                return; // 첫 번째 검색 결과만 보여줌
            } else {
                member.style.display = "none";
                member.nextElementSibling.style.display = "none"; // 다음 요소인 회원 정보 보기 버튼을 숨김
            }
        });
    });
});