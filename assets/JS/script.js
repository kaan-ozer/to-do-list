"use strict";

let todoIds = [];
// todoIds.push("banana", "apple", "peach");
//Ekleme Butonu
let addBtn = document.querySelector(".plus-icon-anchor");
//todoların oldugu liste
let todoList = document.querySelector("#todoList");
//todo ekleme input alanı
let todoAddArea = document.querySelector("#todoAddArea");

//Icons
let trashIcon = `<svg class="me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c471f5" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>`;
let rightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#c471f5" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg>`;

//ekle butonuna ('click') tiklandiginda addTodo() fonksiyonu  calissin
addBtn.addEventListener("click", addTodo);

//ekleme alanında entere basıldığında addTodo() fonksiyonu  calissin
todoAddArea.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Enter tuşuna basılırsa
    addTodo();
    // addTodo() isimli fonksiyonu çağırın
  }
});

function idGenerator() {
  return Math.random().toString(16).slice(2);
}

// add butonu calistiginda yada ekleme alanında enter tuslandiginda
function addTodo() {
  //input alanı bos degilse
  if (todoAddArea.value) {
    // liste içine li elemani olustur
    const todoLi = document.createElement("li");
    // to do icerigini gir
    const todoParagraph = document.createElement("p");
    // to do trash button olustur
    const todoAnchor = document.createElement("a");

    todoLi.classList.add(
      "mb-3",
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );
    todoParagraph.classList.add("m-0");
    todoAnchor.classList.add("trash-btn");

    //her todo trash tusuna basildiginda delFunc calissin
    todoAnchor.setAttribute("onclick", "delFunc(this)");

    //listenin sonuna bu yeni elemani ekle
    todoList.append(todoLi);
    //bu yeni li elemanının içine icerigi belirtmek icin paragraph ekle
    todoLi.append(todoParagraph);
    //icerik paragrafı sonrası silme butonunu ekle
    todoLi.append(todoAnchor);

    // inputun içine yazılan degeri bu li icindeki paragraph elemanına yazdir
    todoParagraph.innerHTML = rightIcon + " " + todoAddArea.value;

    //anchor a trash icon ekle
    todoAnchor.innerHTML = trashIcon;

    // input alanını temizle
    todoAddArea.value = "";

    //this item's unique id
    let id = idGenerator();

    todoLi.setAttribute("id", id);

    //add this id to the array
    todoIds.push(id);

    let jsonSaveArray = JSON.stringify(todoIds);
    //bu listeyi her zaman güncelleyecegiz ve local storeage in ustunde tutacagız
    localStorage.setItem("IdList", jsonSaveArray);

    // li'nin HTML icerigini localStorage'a kaydedin
    localStorage.setItem(id, todoLi.innerHTML);
  }
}

// trash icon a tıklandıgında calısan silme methodu
function delFunc(element) {
  // tiklanan <a> etiketinin parent node'unu alarak li elemanına erisin
  const parent = element.parentNode;

  let removedId = parent.id;
  console.log(removedId);
  let removedItemIndex = todoIds.indexOf(removedId);
  console.log(removedItemIndex);

  localStorage.removeItem(removedId);
  todoIds.splice(removedItemIndex, 1);

  // console.log(
  //   `silmeden önce
  //   index: ${removedItemIndex}
  //   id ${removedId}
  //   array ${todoIds}`
  // );

  // console.log(
  //   `silmeden sonra
  //   index: ${removedItemIndex}
  //   id ${removedId}
  //   array ${todoIds}`
  // );

  let jsonSaveArray = JSON.stringify(todoIds);
  //bu listeyi her zaman güncelleyecegiz ve local storeage in ustunde tutacagız
  localStorage.setItem("IdList", jsonSaveArray);

  // li'yi kaldirin
  parent.remove();
}

//body yuklendiginde localstoragedaki onceki todo'lar yuklensin
function localStorageUpload() {
  const ourSaveArray = JSON.parse(localStorage.getItem(`IdList`));
  let i = 0;

  if (ourSaveArray[i] != null) {
    while (ourSaveArray[i]) {
      todoIds[i] = ourSaveArray[i];
      i++;
    }
    console.log(todoIds);

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

  // //li elemanının icerigini local storage'dan aliyoruz
  // const parentHTML = localStorage.getItem(`${todoIds[index++]}`);
  // // li elementini olusturun ve icerigini localStorage'dan alinan veri ile doldurun
  // const parent = document.createElement("li");
  // parent.innerHTML = parentHTML;

  // //li'ye gerekli style'lari verin
  // parent.classList.add(
  //   "mb-3",
  //   "d-flex",
  //   "align-items-center",
  //   "justify-content-between"
  // );

  // // li'yi sayfaya ekleyin
  // todoList.append(parent);
}
