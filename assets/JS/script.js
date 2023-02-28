"use strict";

//It includes todo's ids
let todoIds = [];

//Add button
let addBtn = document.querySelector(".plus-icon-anchor");

//The list which includes todos
let todoList = document.querySelector("#todoList");

//Input area for adding todos
let todoAddArea = document.querySelector("#todoAddArea");

//Icons
let trashIcon = `<svg class="me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c471f5" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>`;
let rightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c471f5" class="bi bi-arrow-right-circle-fill me-2" viewBox="0 0 16 16">
<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg>`;

//If you click the add btn, addTodo() function will be started.
addBtn.addEventListener("click", addTodo);

//If you press enter key, addTodo() function will be called.
todoAddArea.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // If you press enter key.
    addTodo();
    // addTodo() function will be called.
  }
});

//Creates id.
function idGenerator() {
  return Math.random().toString(16).slice(2);
}

//That function adds todos.
function addTodo() {
  //If input area is not empty.
  if (todoAddArea.value) {
    // Create li element.
    const todoLi = document.createElement("li");
    // Create paragraph to get information is related to todos
    const todoParagraph = document.createElement("p");
    // Create Anchor for trash btn
    const todoAnchor = document.createElement("a");

    // Add styles via classes of bootstrap.
    todoLi.classList.add(
      "mb-3",
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );
    todoParagraph.classList.add("m-0");
    todoAnchor.classList.add("trash-btn");

    //If you click trash icon, delFunc(this) will be called.
    todoAnchor.setAttribute("onclick", "delFunc(this)");

    //Add li into ul.
    todoList.append(todoLi);
    //Add paragraph into li
    todoLi.append(todoParagraph);
    //Add anchor(trash-btn) into li
    todoLi.append(todoAnchor);

    //Add the value of the input into the paragraph.
    todoParagraph.innerHTML = rightIcon + " " + todoAddArea.value;

    //Add trash icon into the anchor.
    todoAnchor.innerHTML = trashIcon;

    //Clear the input field.
    todoAddArea.value = "";

    //Create a id.
    let id = idGenerator();

    //Add this id to new li elements
    todoLi.setAttribute("id", id);

    //Add this id to the array
    todoIds.push(id);

    //Convert the array into json to save later in localstoreage.
    let jsonSaveArray = JSON.stringify(todoIds);

    //Add this array to local storeage.
    localStorage.setItem("IdList", jsonSaveArray);

    //Add li element's inner html to localstoreage.
    localStorage.setItem(id, todoLi.innerHTML);
  }
}

// Deletion function
function delFunc(element) {
  // We can reach the parent element(li) of the a element which is clicked.
  const parent = element.parentNode;
  // Get its id.
  let removedId = parent.id;
  // Get its index.
  let removedItemIndex = todoIds.indexOf(removedId);

  // Del from localstoreage.
  localStorage.removeItem(removedId);
  // Del from the array.
  todoIds.splice(removedItemIndex, 1);

  // Convert our array into json format.
  let jsonSaveArray = JSON.stringify(todoIds);
  // Update the localstoreage.
  localStorage.setItem("IdList", jsonSaveArray);

  // Remove li element.
  parent.remove();
}

//This function uploads previous todos.
function localStorageUpload() {
  // Get the array list which holds the ids from the localstoreage.
  const ourSaveArray = JSON.parse(localStorage.getItem(`IdList`));

  let i = 0;
  // If our array has any element.
  if (ourSaveArray[i] != null) {
    // Update our array through local storeage array.
    while (ourSaveArray[i]) {
      todoIds[i] = ourSaveArray[i];
      i++;
    }

    // Call all todos which saved before from the local storage
    for (let j = 0; j < todoIds.length; j++) {
      const parentHTML = localStorage.getItem(`${todoIds[j]}`);
      const parent = document.createElement("li");
      parent.innerHTML = parentHTML;
      parent.classList.add(
        "mb-3",
        "d-flex",
        "align-items-center",
        "justify-content-between"
      );
      parent.setAttribute("id", `${todoIds[j]}`);
      todoList.append(parent);
    }
  }
}
