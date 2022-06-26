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