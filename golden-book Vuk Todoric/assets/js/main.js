let signUpLogin = document.getElementById("signUpLogin"),
  rightDiv = document.getElementById("rightDiv"),
  navigation = document.getElementById("navigation"),
  alreadyHave = document.getElementById("alreadyHave"),
  btnForm = document.getElementById("btnForm"),
  login = document.getElementById("login"),
  signUp = document.getElementById("signUp"),
  btnToSignUp = document.getElementById("btnToSignUp"),
  formHeading = document.getElementById("formHeading"),
  leftSidenav = document.getElementById("leftSidenav"),
  toggleBtn = document.getElementById("toggleBtn"),
  wrapper = document.getElementById("wrapper"),
  form = document.getElementById("form"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  errorHolder = document.querySelectorAll(".error-holder"),
  admin = document.getElementById("admin"),
  adminSubtab = document.getElementById("adminSubtab"),
  booksWrapper = document.getElementById("booksWrapper"),
  formForAdding = document.getElementById("formForAdding"),
  author = document.getElementById("author"),
  categories = document.getElementById("categories"),
  url = document.getElementById("url"),
  title = document.getElementById("title"),
  year = document.getElementById("year"),
  isbn = document.getElementById("isbn"),
  description = document.getElementById("description"),
  saveBooks = document.getElementById("saveBooks"),
  bookList = document.getElementById("bookList"),
  homePageLink = document.getElementById("homePageLink"),
  cancelBooks = document.getElementById("cancelBooks");

//Modals
function User(email, password) {
  this.email = email;
  this.password = password;
}

function FormBooks(url, title, author, year, categories, isbn, description) {
  this.url = url;
  this.title = title;
  this.author = author;
  this.year = year;
  this.categories = categories;
  this.isbn = isbn;
  this.description = description;
}
//

//Arrays
let authorNmes = ["Saramago", "Wilde", "Dostoevski", "Andric"];
let categoriesNames = ["Fantasy", "Drama", "Historic", "Romance"];

let dataBase = [];
let library = [];
let errorMessages = [
  {
    required: "Required to have 8 or more characters!",
    invalid: "Invalid fild!",
  },
];
//

function loginForm() {
  formHeading.innerText = "Login";
  btnForm.innerText = "Login";
  alreadyHave.innerText = "Don't have an account? Sign up";
}

function signUpForm() {
  formHeading.innerText = "Sign Up";
  btnForm.innerText = "Sign Up";
  alreadyHave.innerText = "Already have an account? Login";
}

homePage();

function homePage() {
  signUpLogin.style.display = "none";
}

function loginPage() {
  signUpLogin.style.display = "block";
  rightDiv.style.display = "none";
  navigation.style.display = "none";
  formHeading.innerText = "Login";
  btnForm.innerText = "Login";
  alreadyHave.innerText = "Don't have an account? Sign up";
}
function signUpPage() {
  signUpLogin.style.display = "block";
  rightDiv.style.display = "none";
  navigation.style.display = "none";
  formHeading.innerText = "Sign Up";
  btnForm.innerText = "Sign Up";
  alreadyHave.innerText = "Already have an account? Login";
}

function toggleForm() {
  if (
    formHeading.innerText === "Sign Up" ||
    btnForm.innerText === "Sign Up" ||
    alreadyHave.innerText === "Already have an account? Login"
  ) {
    loginForm();
  } else {
    signUpForm();
  }
}

function toggle() {
  if (leftSidenav.style.display === "none") {
    leftSidenav.style.width = "20%";
    wrapper.style.marginLeft = "5%";
    leftSidenav.style.borderRight = "1px solid #fff";
    leftSidenav.style.display = "block";
    admin.addEventListener("click", showSubtab);
    adminSubtab.addEventListener("click", showBooks);
    homePageLink.addEventListener("click", showHomePage);
    cancelBooks.addEventListener("click", function () {
      clearFilds(formForAdding);
    });
  } else {
    leftSidenav.style.width = "0";
    wrapper.style.marginLeft = "0";
    leftSidenav.style.borderRight = "0";
    leftSidenav.style.display = "none";
  }
}

btnForm.addEventListener("click", userValidation);

function showSubtab() {
  adminSubtab.classList.toggle("display-none");
}

function showBooks() {
  booksWrapper.style.display = "block";
  wrapper.style.display = "none";
  saveBooks.addEventListener("click", showListOfBooks);
  render(authorNmes, author);
  render(categoriesNames, categories);
}

function showHomePage() {
  booksWrapper.style.display = "none";
  wrapper.style.display = "block";
}
function showListOfBooks(e) {
  let newBook = new FormBooks(
    url.value,
    title.value,
    author.value,
    year.value,
    categories.value,
    isbn.value,
    description.value
  );

  const regexUrl =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const isUrlValid = regexUrl.test(url.value);

  const regexTitle = /^[A-Z].{9,49}$/;
  const isTitleValid = regexTitle.test(title.value);

  const regexDescription = /^.{1,250}$/;
  const isDescriptionValid = regexDescription.test(description.value);

  if (!isUrlValid) {
    e.preventDefault();
    errorMessage(errorMessages[0].invalid, url.nextElementSibling, saveBooks);
  } else if (!isTitleValid) {
    e.preventDefault();
    errorMessage(errorMessages[0].invalid, title.nextElementSibling, saveBooks);
  } else if (!isDescriptionValid) {
    e.preventDefault();
    errorMessage(
      errorMessages[0].invalid,
      description.nextElementSibling,
      saveBooks
    );
  } else {
    e.preventDefault();
    library.push(newBook);
    renderList(newBook, bookList);
    clearFilds(formForAdding);
    console.table(newBook);
  }
}

function userValidation(e) {
  let newUser = new User(form.email.value, form.password.value);
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isEmailValid = regexEmail.test(email.value);

  if (
    newUser.email.length >= 8 &&
    newUser.password.length >= 8 &&
    isEmailValid
  ) {
    dataBase.push(newUser);
    e.target.submit();
  } else if (newUser.email.length < 8 && newUser.password.length < 8) {
    e.preventDefault();
    errorMessage(errorMessages[0].required, email.nextElementSibling, btnForm);
    errorMessage(
      errorMessages[0].required,
      password.nextElementSibling,
      btnForm
    );
  } else if (newUser.email.length < 8) {
    e.preventDefault();
    errorMessage(errorMessages[0].required, email.nextElementSibling, btnForm);
  } else if (newUser.password.length < 8) {
    e.preventDefault();
    errorMessage(
      errorMessages[0].required,
      password.nextElementSibling,
      btnForm
    );
  } else if (!isEmailValid) {
    e.preventDefault();
    errorMessage(errorMessages.invalid, email.nextElementSibling, btnForm);
  }
}

//   Services
function errorMessage(error, id, button) {
  let label = document.createElement("label");
  label.classList.add("alert");
  label.innerText = error;
  id.appendChild(label);

  if (button === btnForm) {
    button.disabled = true;
    button.style.backgroundColor = "gray";
    setTimeout(() => {
      alert("Page will be reloaded");
      location.reload();
    }, 1000);
  } else {
    setTimeout(() => {
      alert("All filds are required");

      for (let i = 0; i < errorHolder.length; i++) {
        errorHolder[i].children[i].innerHTML = "";
      }
    }, 1000);
  }
}

function render(array, id) {
  for (let content = 0; content < array.length; content++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${array[content]}`);
    let text = document.createTextNode(array[content]);
    id.appendChild(option).appendChild(text);
  }
}

function renderList(list, id) {
  const row = document.createElement("tr");
  for (let item in list) {
    row.innerHTML += `<td>${list[item]}</td>`;
    id.appendChild(row);
  }
}

function clearFilds(list) {
  for (item in list) {
    list[item].value = "";
  }
}
