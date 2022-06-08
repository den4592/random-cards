const btn = document.querySelector(".btn");
const inputedTopic = document.querySelector(".input-topic");
const topics = document.querySelector(".topics");

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

btn.addEventListener("click", (e) => {
  e.preventDefault();
  addTopic(inputedTopic);
  inputedTopic.value = "";
});
