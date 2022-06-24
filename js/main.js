let navMenu = document.querySelector(".nav__menu")
let navList = document.querySelector(".nav__list")

navMenu.addEventListener("click", function () {
    navMenu.classList.toggle("active")
    navList.classList.toggle("active")
    
})