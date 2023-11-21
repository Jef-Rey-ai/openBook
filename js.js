const inputText = document.querySelector("#add-book input");
const link = document.querySelector(".button");

// المانهای ثابت
const inputSerch=document.querySelector('#search-books input');
const divBook=document.querySelector('#book-list');
const checkBox=document.querySelector('#hide input');
const ul = document.querySelector("ul");
const spanDelet = '<span class="delete">حذف</span>';

// اضافه کردن مغادیر لوکال استوریج در لیست موجود در صفحه
document.addEventListener("DOMContentLoaded", function (e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }

  for (let item of tasks) {
    const spanName = document.createElement("span");
    spanName.className = "name";
    spanName.textContent = item;

    const li = document.createElement("li");
    li.appendChild(spanName);
    li.innerHTML += spanDelet;

    ul.appendChild(li);
  }
});

//عملیات برای دکمه ی "اضافه " 0
link.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputText.value == "") return console.log("no");

  storeToLocalStorage(inputText.value);
  const spanName = document.createElement("span");
  spanName.className = "name";
  spanName.textContent = inputText.value;

  const li = document.createElement("li");
  li.appendChild(spanName);
  li.innerHTML += spanDelet;

  ul.appendChild(li);
  spanName.textContent = inputText.value;
  inputText.value = "";
});

ul.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.children[0].textContent);
  }
});

//عملیات ورودی جستجو
inputSerch.addEventListener('keyup',function(e){
  for(let book of ul.children){
    if(book.firstElementChild.textContent.indexOf(inputSerch.value) !== -1){
      book.style.display="block";
    }else{
      book.style.display="none";
    }
  }
})

//عملیات فعال شدن چک باکس
checkBox.addEventListener('change',function(e){
  if(checkBox.checked){
    divBook.style.display="none";
  }else{
    divBook.style.display="block"
  }
})

//تابع ضخیره سازی اطلاعات در لوکال استورج
function storeToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }
  tasks.push(task);
  localStorage.setItem("tasks", tasks);
}

//تابع حذف یک مورد از لوکال استوریج
function removeFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === task) {
      tasks.splice(i, 1);
    }
  }

  if (tasks.length === 0) {
    localStorage.removeItem("tasks");
  } else {
    localStorage.setItem("tasks", tasks);
  }
}

// console.log(spamDelet);
