const userEmail = document.getElementById("user-email");
const selected = document.getElementById("selected");
const userSelect = document.getElementById("email-select");
const joinBtn = document.querySelector("#join-btn");
const confirmBox = document.querySelector(".confirm-box");
const userIdInput = document.getElementById("user-id");
const userNickInput = document.getElementById("user-name");
//유효성 검사

if (window.location.href.match("join")) {
  //아이디 중복 체크

  userIdInput.addEventListener("input", async () => {
    const userId = userIdInput.value;

    const response = await axios.get(`/users/check/?userId=${userId}`);
    const isDuplicate = response.data.isDuplicate;
    const userIdResult = document.getElementById("userIdResult");
    if (userId !== "") {
      if (isDuplicate) {
        userIdResult.textContent = "이미 사용하는 아이디입니다.";
        userIdResult.style.color = "red";
        userIdInput.classList.add("existenceN");
        userIdInput.classList.remove("existenceY");
      } else {
        userIdResult.textContent = "멋진 아이디네요!";
        userIdResult.style.color = "green";
        userIdInput.classList.add("existenceY");
        userIdInput.classList.remove("existenceN");
      }
    } else {
      userIdResult.textContent = "";
      userIdInput.classList.remove("existenceY");
      userIdInput.classList.remove("existenceN");
    }
  });

  //이름 중복 검사

  userNickInput.addEventListener("input", async () => {
    const nickname = userNickInput.value;

    const response = await axios.get(`/users/check/?nickname=${nickname}`);
    const isDuplicate = response.data.isDuplicate;
    const userNickResult = document.getElementById("userNickResult");
    if (nickname !== "") {
      if (isDuplicate) {
        userNickResult.textContent = "이미 사용하는 아이디입니다.";
        userNickResult.style.color = "red";
        userNickInput.classList.add("existenceN");
        userNickInput.classList.remove("existenceY");
      } else {
        userNickResult.textContent = "멋진 아이디네요!";
        userNickResult.style.color = "green";
        userNickInput.classList.add("existenceY");
        userNickInput.classList.remove("existenceN");
      }
    } else {
      userNickResult.textContent = "";
      userNickInput.classList.remove("existenceY");
      userNickInput.classList.remove("existenceN");
    }
  });
}

//제출 했을 때
joinBtn.addEventListener("click", (event) => {
  if (userNickInput.classList.contains("existenceN")) {
    event.preventDefault();
    alert("이미 사용하는 이름입니다.");
    userNickInput.focus();
    return;
  }

  if (userIdInput.classList.contains("existenceN")) {
    event.preventDefault();
    alert("이미 사용하는 아이디입니다.");
    userIdInput.focus();
    return;
  }

  //-----이메일 양식 검사
  if (userEmail.value !== "") {
    if (!userEmail.value.match("@")) {
      alert("이메일형식이 아닙니다.");
      event.preventDefault();
      userEmail.focus();
      return;
    }
  }

  //----------------------펫나이 숫자확인
  const petAge = document.querySelector(".petAge");
  if (petAge.value !== "" && !Number(petAge.value)) {
    alert("나이에 숫자만 입력가능합니다.");
    event.preventDefault();
  }

  //-------------비밀번호 재확인
  const password = document.getElementById("user-passward");
  const repassword = document.getElementById("user-repassward");
  if (password.value !== "") {
    if (repassword.value !== password.value) {
      alert("비밀번호가 다릅니다.");
      event.preventDefault();
      repassword.value = "";
      repassword.focus();
    }
  }
});
// -----------------------유효성 검사 끝 -----------------------

// 주소선택 함수
function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("detailAddress").focus();
    },
  }).open();
}

//펫 정보 유&무 창 움직임

const petInformation = document.getElementById("pet-information");
const petNo = document
  .getElementById("petNo")
  .addEventListener("change", () => {
    const petInputValue = document.querySelectorAll(".petInput");
    for (let i = 0; i < petInputValue.length; i++) {
      petInputValue[i].value = "";
    }
    petInformation.style.zIndex = "-1";
    petInformation.style.opacity = "0";
    setTimeout(() => {
      petInformation.style.left = "0";
    }, 200);
  });
const petYes = document
  .getElementById("petYes")
  .addEventListener("change", () => {
    petInformation.style.left = "102%";
    setTimeout(() => {
      petInformation.style.opacity = "0.5";
      petInformation.style.zIndex = "0";
      petInformation.style.opacity = "1";
    }, 300);
  });

// 회원정보 수정
if (window.location.href.match("page/users")) {
  const hidn = document.querySelector(".hiddenNick").value;

  userNickInput.addEventListener("input", async () => {
    const nickname = userNickInput.value;
    const response = await axios.get(`/users/check/?nickname=${nickname}`);
    const isDuplicate = response.data.isDuplicate;
    const userNickResult = document.getElementById("userNickResult");

    if (nickname !== "") {
      if (isDuplicate && hidn == nickname) {
        userNickResult.textContent = "";
        userNickInput.classList.remove("existenceY");
        userNickInput.classList.remove("existenceN");
      } else if (isDuplicate && hidn !== userNickInput.value) {
        userNickResult.textContent = "이미 사용하는 이름입니다.";
        userNickResult.style.color = "red";
        userNickInput.classList.add("existenceN");
        userNickInput.classList.remove("existenceY");
      } else {
        userNickResult.textContent = "멋진 이름이네요!";
        userNickResult.style.color = "green";
        userNickInput.classList.add("existenceY");
        userNickInput.classList.remove("existenceN");
      }
    } else {
      userNickResult.textContent = "";
      userNickInput.classList.remove("existenceY");
      userNickInput.classList.remove("existenceN");
    }
  });

  userIdInput.addEventListener("input", async () => {
    const userId = userIdInput.value;
    const hidn = document.querySelector(".hiddenId").value;

    const response = await axios.get(`/users/check/?userId=${userId}`);
    const isDuplicate = response.data.isDuplicate;
    const userIdResult = document.getElementById("userIdResult");
    if (userId !== "") {
      if (isDuplicate && hidn == userId) {
        userIdResult.textContent = "";
        userIdInput.classList.remove("existenceY");
        userIdInput.classList.remove("existenceN");
      } else if (isDuplicate && hidn !== userId) {
        userIdResult.textContent = "이미 사용하는 아이디입니다.";
        userIdResult.style.color = "red";
        userIdInput.classList.add("existenceN");
        userIdInput.classList.remove("existenceY");
      } else {
        userIdResult.textContent = "멋진 아이디네요!";
        userIdResult.style.color = "green";
        userIdInput.classList.add("existenceY");
        userIdInput.classList.remove("existenceN");
      }
    } else {
      userIdResult.textContent = "";
      userIdInput.classList.remove("existenceY");
      userIdInput.classList.remove("existenceN");
    }
  });
}
