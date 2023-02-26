"use strict";

let addBtn = document.querySelector(".plus-icon-anchor");
let todoList = document.querySelector("#todoList");
let todoInput = document.querySelector("#todoInput");
let trashBtn = document.querySelector(".trash-btn");

//ekle butonuna tiklandiginda bu fonksiyon calissin
addBtn.addEventListener("click", addPomodoro);
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Enter tuşuna basılırsa
    addPomodoro(); // addPomodoro() isimli fonksiyonu çağırın
  }
});
// trashBtn.addEventListener("click", function (element) {
//   element.parentNode.removeChild(element);
// });

let trashIcon = `<svg class="me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>`;
let rightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg>`;

// add butonu calistiginda
function addPomodoro() {
  if (todoInput.value) {
    // liste içine li elemani olustur
    const pomodoroLi = document.createElement("li");
    const pomodoroInfo = document.createElement("p");
    const pomodoroAnchor = document.createElement("a");

    pomodoroLi.classList.add(
      "mb-3",
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );
    pomodoroInfo.classList.add("m-0");
    pomodoroAnchor.classList.add("trash-btn");

    //listenin sonuna bu yeni elemani ekle
    todoList.append(pomodoroLi);
    pomodoroLi.append(pomodoroInfo);
    pomodoroLi.append(pomodoroAnchor);

    // inputun içine yazılan degeri bu li elemanına yazdir
    pomodoroInfo.innerHTML = todoInput.value;
    pomodoroAnchor.innerHTML = trashIcon;

    // inputu temizle
    todoInput.value = "";
  }
}
