var menu = document.querySelector(".main-nav");
var menuButton = document.querySelector(".main-nav__toggle");
var mainLink = document.querySelector(".main-nav__link")

if (menu.classList.contains("main-nav--no-js")) {
  menu.classList.remove("main-nav--no-js");
}

menuButton.addEventListener("click", function () {
  if (menu.classList.contains("main-nav--opened")) {
    menu.classList.remove("main-nav--opened");
    menu.classList.add("main-nav--closed")
  } else {
    menu.classList.remove("main-nav--closed");
    menu.classList.add("main-nav--opened")
  }
});

mainLink.addEventListener("click", function () {
  mainLink.classList.add("main-nav__link--active")
})
