"use strict";

let addBtn = document.querySelector(".plus-icon-anchor");
let pomodoroList = document.querySelector("#pomodoroList");

addBtn.addEventListener("click", addPomodoro);

function addPomodoro() {
  let pomodoroLi = document.createElement("li");
  pomodoroLi.innerHTML = "test";

  pomodoroList.append(pomodoroLi);
}
