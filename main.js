const addBtn = document.querySelector(".add-btn");
const inputedTopic = document.querySelector(".input-topic");
const topics = document.querySelector(".topics");
const resetBtn = document.querySelector(".reset-btn");
const mixBtn = document.querySelector(".mix-btn");
const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
let itemList = []; //mixed로 들어갈 아이템들
const mixedItems = document.querySelector(".mixed-items");
let topicKeyCount = 0;

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

//localStorage 리셋 후 key, value 추가
const localStorageReset = () => {
  localStorage.clear();
  let changeTopic = document.querySelectorAll(".topic");
  for (let i = 0; i < topics.children.length; i++) {
    localStorage.setItem(`topic${i + 1}`, changeTopic[i].firstChild.innerHTML);
    changeTopic[i].classList.remove(changeTopic[i].classList[2]);
    changeTopic[i].classList.add(`topic${i + 1}`);
  }
};

//localStorage에 뭐라도 있으면
if (localStorage.length >= 1) {
  for (let i = 1; i <= localStorage.length; i++) {
    checkIfNotEmpty();
    let span = document.createElement("span");
    let data = localStorage.getItem(`topic${i}`);
    span.innerHTML = data;
    let topic = document.createElement("li");
    topic.className = "topic";
    topic.classList.add("d-flex");
    topic.classList.add(`topic${i}`);
    topic.appendChild(span);
    topics.appendChild(topic);

    //mixed될 아이템들
    itemList.push(data);

    //삭제 버튼 만들기
    let item = document.createElement("i");
    item.className = "fa-solid";
    item.classList.add("fa-trash-can");
    item.classList.add("remove-topic");
    topic.appendChild(item);

    //topic 삭제 기능
    let removeTopic = document.querySelectorAll(".remove-topic");
    for (let i = 0; i < removeTopic.length; i++) {
      removeTopic[i].addEventListener("click", (e) => {
        removeTopic[i].parentElement.remove();
        console.log(itemList);
        let idx = itemList.indexOf(removeTopic[i].parentElement.firstChild.innerHTML);
        if (idx !== -1) {
          itemList.splice(idx, 1);
        }
        localStorage.removeItem(removeTopic[i].parentElement.classList[2]);
        localStorageReset(inputedTopic);
        console.log(itemList);
        if (topics.innerHTML == "") {
          checkIfEmpty();
        }
      });
    }
  }
} else {
  //Local storage is empty
}

//section2에 Topic 추가
const addTopic = (inputedTopic) => {
  //topic 만들기
  let topic = document.createElement("li");
  let span = document.createElement("span");
  topic.className = "topic";
  topic.classList.add("d-flex");
  span.innerHTML = inputedTopic.value;
  topicKeyCount = localStorage.length + 1;
  localStorage.setItem(`topic${topicKeyCount}`, inputedTopic.value);
  topic.appendChild(span);
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
      localStorage.removeItem(removeTopic[i].parentElement.classList[2]);
      removeTopic[i].parentElement.remove();
      let idx = itemList.indexOf(removeTopic[i].parentElement.firstChild.innerHTML);
      if (idx !== -1) {
        itemList.splice(idx, 1);
      }
      localStorageReset(inputedTopic);
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
  localStorage.clear();
  topicKeyCount = 0;
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
  secondPage.firstElementChild.classList.remove("hide");
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
    let coveredTopic = document.createElement("div");
    coveredTopic.className = "covered-topic";
    li.className = "topic";
    li.classList.add("mixed-item");
    li.classList.add("d-flex");
    li.classList.add("covered");
    li.innerHTML = itemList[i];
    li.appendChild(coveredTopic);
    li.appendChild(inputText);
    mixedItems.appendChild(li);
  }

  //뒤로가기 버튼 생성
  const backBtn = document.querySelector(".back-btn");
  backBtn.classList.remove("hide");

  //뒤로가기 버튼 기능
  backBtn.addEventListener("click", () => {
    secondPage.firstElementChild.classList.add("hide");
    mixedItems.classList.add("hide");
    backBtn.classList.add("hide");
    firstPage.classList.remove("hide");
    mixedItems.innerHTML = "";
  });

  const coveredTopic = document.querySelectorAll(".covered-topic");
  if (coveredTopic.length > 0) {
    for (let i = 0; i < coveredTopic.length; i++) {
      coveredTopic[i].addEventListener("click", () => {
        coveredTopic[i].style.display = "none";

        //textarea height resizing
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
          tx[i].setAttribute("style", "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;");
          tx[i].addEventListener("input", OnInput, false);
        }

        function OnInput() {
          this.style.height = "auto";
          this.style.height = this.scrollHeight + "px";
        }
      });
    }
  }
});
