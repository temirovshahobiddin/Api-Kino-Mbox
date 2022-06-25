/* let tv = new Swiper(`.trend__tv-slider`, {
    slidesPerView: 1,
    spaceBetween: 27,
    // slidesPerGroup: 3,
    loop: true,
    // loopFillGroupWithBlank: true,
    navigation: {
        nextEl: `.trend__tv-slider .swiper-button-next`,
        prevEl: `.trend__tv-slider .swiper-button-prev`,
    },
    breakpoints: {
        1440: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        960: {
            slidesPerView: 4,
        },
        720: {
            slidesPerView: 3,
        },
        500: {
            slidesPerView: 2,
        },
    }
});
let awaited = new Swiper(`.popular__actors-slider`, {
    slidesPerView: 1,
    spaceBetween: 27,
    // slidesPerGroup: 3,
    loop: true,
    // loopFillGroupWithBlank: true,
    navigation: {
        nextEl: `.popular__actors-slider .swiper-button-next`,
        prevEl: `.popular__actors-slider .swiper-button-prev`,
    },
    breakpoints: {
        1440: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        960: {
            slidesPerView: 4,
        },
        720: {
            slidesPerView: 3,
        },
        500: {
            slidesPerView: 2,
        },
    }
});
 */
const searchLink = document.querySelector(".search__link .icon-reg"),
    mainContent = document.querySelector(".main__content"),
    mainClose = document.querySelectorAll(".main__close"),
    mainBlock = document.querySelector(".main__block"),
    mainSolo = document.querySelector(".main__solo"),
    moviesLink = document.querySelectorAll(".movies__link"),
    formMain = document.querySelector(".form__main"),
    formInput = document.querySelector(".input"),
    anime = document.querySelector(".anime"),
    pagination = document.querySelector(".pagination"),
    headerBtn = document.querySelector(".header__btn"),
    headerAbs = document.querySelector(".header__abs"),
    headerItems = document.querySelector(".header__items");

// menu burger

headerBtn.addEventListener("click", function (e) {
    e.preventDefault()
    this.classList.toggle("active")
    headerItems.classList.toggle("active")
    headerAbs.classList.toggle("active")
    body.classList.toggle("active")
})

// menu burger

const host = "https://kinopoiskapiunofficial.tech"
const hostName = "X-API-KEY"
const hostValue = "d3b408f9-8b61-4290-bea3-4077f2132888"

class Kino {
    constructor() {
        this.date = new Date().getMonth()
        this.curYear = new Date().getFullYear()
        this.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        this.curMonth = this.months[this.date]
    }

    fOpen = async (url) => {
        let respone = await fetch(url, {
            headers: {
                [hostName]: hostValue
            }
        })
        if (respone.ok) return respone.json()
        else throw new Error(`Cannot access to ${url}`)
    }

    getTopMovies = (page = 1) => this.fOpen(`${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`)
    getSoloFilm = (id) => this.fOpen(`${host}/api/v2.1/films/${id}`)
    getMostAwaited = (page = 1, year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`)
    getFrames = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`)
    getReviews = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`)
    getSearch = (page = 1, keyword) => this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)

}

const kino = new Kino()

// kino.getTopMovies(5).then(res => {
//     console.log(res);
// })

/* kino.getMostAwaited().then(res =>{
    console.log(res);
}) */

/* kino.getReviews(5273).then(res =>{
    console.log(res);
}) */
/* kino.getSearch().then(res =>{
    console.log(res);
}) */


function randMovies(num) {
    return Math.floor(Math.random() * num + 1)
}

//render Tremd Movie

function renderTrendMovies(elem = [], fn = [], films = [], params = []) {
    anime.classList.add("active")
    elem.forEach((item, i) => {
        let parent = document.querySelector(`${item} .swiper-wrapper`)
        kino[fn[i]](params[i]).then(data => {
                //console.log(data[films[i]]);
                data[films[i]].forEach(el => {

                    let slide = document.createElement(`div`)
                    slide.classList.add(`swiper-slide`)
                    slide.innerHTML = `
                <div class="movie__item" data-id="${el.filmId}">
                    <img src="${el.posterUrlPreview}" alt="${el.nameRu || el.nameEn}" loading="lazy">
                </div>
                `
                    parent.append(slide)
                })
                anime.classList.remove("active")
            })
            .then(() => {
                elem.forEach(item => {
                    new Swiper(`${item}`, {
                        slidesPerView: 1,
                        spaceBetween: 27,
                        // slidesPerGroup: 3,
                        loop: true,
                        // loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: `${item} .swiper-button-next`,
                            prevEl: `${item} .swiper-button-prev`,
                        },
                        breakpoints: {
                            1440: {
                                slidesPerView: 6,
                            },
                            1200: {
                                slidesPerView: 5,
                            },
                            960: {
                                slidesPerView: 4,
                            },
                            720: {
                                slidesPerView: 3,
                            },
                            500: {
                                slidesPerView: 2,
                            },
                        }
                    })
                })
            })
            .catch(e => {
                anime.classList.remove("active")
                console.error(e);
            })
    })
}
renderTrendMovies([".trend__tv-slider", ".popular__actors-slider"], ["getTopMovies", "getMostAwaited"], ["films", "releases"], [2, 1])


/* render trend Movie */
// render header movie 
function renderHeader(page) {
    kino.getTopMovies(page).then(data => {
        /*    console.log(data); */
        anime.classList.remove("active")
        let max = randMovies(data.films.length)
        let filmId = data.films[max].filmId
        let filmRating = data.films[max].rating
        kino.getSoloFilm(filmId).then(response => {
                /* console.log(response); */
                let info = response.data
                let headerText = document.querySelector(".header__text")
                let url = info.webUrl.split("www.").join("gg")
                headerText.innerHTML = `
                    <h1 class="header__title">${info.nameRu || info.nameEn}</h1>
                    <div class="header__balls">
                        <span class="header__year">${info.year}</span>
                        <span class="logo__span header__rating  header__year ">${info.ratingAgeLimits}+</span>
                        <div class="header__seasons header__year">${info.seasons.length != 0 ? info.seasons[0] : "0+"}</div>
                        <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmRating}</strong></div>
                    </div>
                    <p class="header__descr">
                        ${info.description}
                    </p>
                    <div class="header__buttons">
                        <a href="${url}" target="_blank" class="header__watch"><span class="icon-solid"></span>watch</a>
                        <a href="#" class="header__more header__watch movie__item">More information</a>
                    </div>
    `
                anime.classList.remove("active")
            })
            .catch(e => {
                console.error(e);
                anime.classList.remove("active")
            })
    })
}
let page = 13
let rand = randMovies(page)
renderHeader(rand)

// render Header Movies

// current data

const popularTitle = document.querySelector(".popular__actors-title strong"),
    popularPoster = document.querySelector(".coming__soon-block > img");
popularYear = document.querySelector(".year");

popularTitle.innerHTML = `${kino.curMonth} ${kino.curYear}`

kino.getTopMovies().then(res => {
    let rand = randMovies(res.films.length)
    popularPoster.src = res.films[rand].posterUrlPreview
    
})