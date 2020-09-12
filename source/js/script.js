var menu = document.querySelector(".main-nav");
var menuButton = document.querySelector(".main-nav__toggle");
var mainLink = document.querySelector(".main-nav__link")

if (menu.classList.contains("main-nav--no-js")) {
  menuButton.classList.remove("main-nav__toggle--closed")
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


function initMap() {
  var map;
  var marker;
  var markerImage = "img/map-pin.png",
    map = new google.maps.Map(document.querySelector(".map__api"), {
      center: { lat: 59.938765, lng: 30.323015 },
      zoom: 15
    });

  marker = new google.maps.Marker({
    position: { lat: 59.938765, lng: 30.323015 },
    map: map,
    icon: markerImage
  });
}
