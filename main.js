const addBtn = document.querySelector(".add-btn");
const inputedTopic = document.querySelector(".input-topic");
const topics = document.querySelector(".topics");
const resetBtn = document.querySelector(".reset-btn");
const mixBtn = document.querySelector(".mix-btn");

const addTopic = (inputedTopic) => {
  //topic 만들기
  let topic = document.createElement("li");
  topic.className = "topic";
  topic.classList.add("d-flex");
  topic.innerHTML = inputedTopic.value;
  topics.appendChild(topic);
  //삭제 버튼 만들기
  let i = document.createElement("i");
  i.className = "fa-solid";
  i.classList.add("fa-trash-can");
  i.classList.add("remove-topic");
  topic.appendChild(i);
  //topic 삭제 기능
  if (topics != "") {
    let removeTopic = document.querySelectorAll(".remove-topic");
    for (let i = 0; i < removeTopic.length; i++) {
      removeTopic[i].addEventListener("click", () => {
        removeTopic[i].parentElement.remove();
      });
    }
  }
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputedTopic.value == "") {
    alert("Topic을 추가해주세요");
    return false;
  }
  addTopic(inputedTopic);
  inputedTopic.value = "";
  resetBtn.classList.add("enabled");
  mixBtn.classList.add("enabled");
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputedTopic.value == "";
  topics.innerHTML = "";
  resetBtn.classList.remove("enabled");
  mixBtn.classList.remove("enabled");
});
