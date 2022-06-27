let navMenu = document.querySelector(".nav__menu")
let navList = document.querySelector(".nav__list")

navMenu.addEventListener("click", function () {
	navMenu.classList.toggle("active")
	navList.classList.toggle("active")

})


let headerSlide = document.querySelectorAll(".header-slide")

for (let i = 0; i < headerSlide.length; i++) {
	headerSlide[i].addEventListener("click", function (e) {
		for (let k = 0; k < headerSlide.length; k++) {
			headerSlide[k].classList.remove("active")
		}
		headerSlide[i].classList.add("active")
	})
}


let headerMenu = document.querySelectorAll(".header__brand")
let playlist = document.querySelector(".header__playlist")
let navBar = document.querySelector(".header__navbar")
for (let i = 0; i < headerMenu.length; i++) {
	headerMenu[i].addEventListener("click", function(){
		this.classList.toggle("active")
		playlist.classList.toggle("active")
		navBar.classList.toggle("active")
	})
	
}


const swiper = new Swiper(".carousel", {
	grabCursor: true,
	effect: "creative",
	creativeEffect: {
		prev: {
			shadow: true,
			translate: [0, 0, -400],
		},
		next: {
			translate: ["100%", 0, 0],
		},
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

var book = new Swiper(".book", {
	direction: "vertical",
	slidesPerView: "auto",
	freeMode: true,
	scrollbar: {
	  el: ".swiper-scrollbar",
	},
	mousewheel: true,
  });
  
  let accordionBody = document.querySelectorAll(".accordion-collapse")
  
  accordionBody.addEventListener("click", function () {
	
  })
 