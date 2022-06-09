const addBtn = document.querySelector(".add-btn");
const inputedTopic = document.querySelector(".input-topic");
const topics = document.querySelector(".topics");
const resetBtn = document.querySelector(".reset-btn");
const mixBtn = document.querySelector(".mix-btn");
const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
let itemList = []; //mixed로 들어갈 아이템들
const mixedItems = document.querySelector(".mixed-items");

//section2에 Topic이 존재하는지 체크 (비어있으면 - 값 존재 x)
const checkIfEmpty = () => {
  resetBtn.disabled = true;
  mixBtn.disabled = true;
  resetBtn.classList.remove("enabled");
  mixBtn.classList.remove("enabled");
};

//section2에 Topic이 존재하는지 체크 (비어있지 않으면 - 값 존재 o)
const checkIfNotEmpty = () => {
  resetBtn.classList.add("enabled");
  mixBtn.classList.add("enabled");
  resetBtn.removeAttribute("disabled");
  mixBtn.removeAttribute("disabled");
};

//section2에 Topic 추가
const addTopic = (inputedTopic) => {
  //topic 만들기
  let topic = document.createElement("li");
  topic.className = "topic";
  topic.classList.add("d-flex");
  topic.innerHTML = inputedTopic.value;
  topics.appendChild(topic);

  //mixed될 아이템들
  itemList.push(inputedTopic.value);

  //삭제 버튼 만들기
  let i = document.createElement("i");
  i.className = "fa-solid";
  i.classList.add("fa-trash-can");
  i.classList.add("remove-topic");
  topic.appendChild(i);

  //topic 삭제 기능
  let removeTopic = document.querySelectorAll(".remove-topic");
  for (let i = 0; i < removeTopic.length; i++) {
    removeTopic[i].addEventListener("click", () => {
      removeTopic[i].parentElement.remove();
      if (topics.innerHTML == "") {
        checkIfEmpty();
      }
    });
  }
};

//추가 버튼 기능
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //input이 비어있고 추가 버튼을 눌렀을 때 alert 출력
  if (inputedTopic.value == "") {
    alert("Topic을 추가해주세요");
    return false;
  }

  //Topic 추가 / input 빈칸 / 리셋, 섞기 버튼 disable
  addTopic(inputedTopic);
  inputedTopic.value = "";
  checkIfNotEmpty();
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //itemList 초기화
  if (itemList.length >= 1) {
    itemList = [];
  }

  checkIfEmpty();

  //값 전체 초기화
  inputedTopic.value == "";
  topics.innerHTML = "";
  mixedItems.innerHTML = "";
});

mixBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //첫페이지 가리기
  firstPage.classList.add("hide");

  //두번째 페이지 보이기
  mixedItems.classList.remove("hide");

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  //랜덤으로 값을 보여주기 위해 배열을 섞는다
  itemList = shuffleArray(itemList);

  //태그 생성 후 itemList에 있는 값 각각을 추가
  for (let i = 0; i < itemList.length; i++) {
    let li = document.createElement("li");
    let inputText = document.createElement("textarea");
    li.className = "topic";
    li.classList.add("mixed-item");
    li.classList.add("d-flex");
    li.innerHTML = itemList[i];
    li.appendChild(inputText);
    mixedItems.appendChild(li);
  }

  //뒤로가기 버튼 생성
  const backBtn = document.querySelector(".back-btn");
  backBtn.classList.remove("hide");

  //뒤로가기 버튼 기능
  backBtn.addEventListener("click", () => {
    mixedItems.classList.add("hide");
    backBtn.classList.add("hide");
    firstPage.classList.remove("hide");
    mixedItems.innerHTML = "";
  });
});
