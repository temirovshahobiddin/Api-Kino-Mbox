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
    formInput = document.querySelector(".header__input"),
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

function openMainClock(e) {
    e.preventDefault()
    mainContent.classList.add("active")
    body.classList.add("active")
}

searchLink.addEventListener("click", openMainClock)
moviesLink.forEach(item => item.addEventListener("click", openMainClock))
mainClose.forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault()
        mainContent.classList.remove("active")
        body.classList.remove("active")
    })
})

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
                let movieItem = document.querySelectorAll(".movie__item")
                movieItem.forEach(items => {
                    items.addEventListener("click", function (e) {
                        let attr = this.getAttribute("data-id")
                        openMainClock(e)
                        renderSolo(attr)
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
                        <a href="#" class="header__more header__watch movie__item" data-id="${info.filmId}">More information</a>
                    </div>
    `
                anime.classList.remove("active")
            })
            .then(() => {
                let headerWatch = document.querySelector(".header__watch")
                headerWatch.addEventListener("click", function (e) {
                    e.preventDefault()
                    openMainClock(e)
                    let attr = this.getAttribute("data-id")
                    renderSolo(attr)
                })
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


//comins soon

// render solo 

async function renderSolo(id) {
    mainBlock.innerHTML = "";
    pagination.innerHTML = "";
    anime.classList.add("active");
    (async function () {
        const [reviews, frames, solo] = await Promise.all([
            kino.getReviews(id),
            kino.getFrames(id),
            kino.getSoloFilm(id)
        ])
        return {
            reviews,
            frames,
            solo
        }
    }())
    .then(res => {
            // console.log(res);
            let solo = res.solo.data
            let genres = solo.genres.reduce((acc, item) => acc + `${item.genre} `, '')
            // console.log(genres);
            let countries = solo.countries.reduce((acc, item) => acc + `${item.country} `, '')
            let facts = ''
            let frames = ''
            let reviews = ''
            if (solo.facts.length) {
                solo.facts.forEach((item, i) => {
                    if (i < 10) facts += `<li class "solo__facts">${i + 1}: ${item}</li>`
                });
            } else(facts += `<li class "solo__facts">Facts not a found</li>`)
            if (res.frames.items.length) {
                res.frames.items.forEach((item, i) => {
                    if (i < 10) frames += `<img src="${item.previewUrl}" alt="" loading="lazy">`
                })
            } else {
                frames += 'Images not a found'
            }
            if (res.reviews.items.length) {
                res.reviews.items.forEach((item, i) => {
                    if (i < 10) {
                        reviews += `
                    <div class="review__item">
                        <span>${item.author}</span>
                        <p class="review__descr">${item.description}</p>
                    </div>
                    `
                    } else {
                        reviews += "Reviews is not found"
                    }
                })
            }
            let url = solo.webUrl.split("www.").join("gg")
            let div =
                `
                <div class="solo__img">
                <img src="${solo.posterUrlPreview}" alt="${solo.nameRu || solo.nameEn}">
                <a href="${url}" class="solo__link header__watch">Watch Free</a>
                </div>
                <div class="solo__content">
                <h3 class="solo__title trend__tv-title">${solo.nameRu || solo.nameEn}</h3>
                     <ul>
                         <li class="solo__countries">Страны: ${countries}</li>
                         <li class="solo__genres">Жанры: ${genres}</li>
                         <li class="solo__dur">Продолжительность: ${solo.filmLength != null ? solo.filmLength + ":00" : "Отсутствует"}</li>
                         <li class="solo__year">Год: ${solo.year}</li>
                         <li class="solo__premiere">Мировая премьера: ${solo.premiereWorld}</li>
                         <li class="solo__rating">Возрастной рейтинг: ${solo.ratingAgeLimits != null ? solo.ratingAgeLimits : "Отсутствует"}+</li>
                         <li class="solo__slogan">Слоган: ${solo.slogan != null ? solo.slogan : "Отсутствует"}</li>
                         <li class="solo__descr header__descr">Описание: ${solo.description != null ? solo.description : "Отсутствует"}</li>
                    </ul>
             </div>
                <ul class="solo__facts">
                    <h3 class="trend__tv-title">Интересные факты</h3>
                    ${facts}
                </ul>
                <h3 class="trend__tv-title solo__title2">Кадры из фильма</h3>
                <div class="solo__images">${frames}</div>
                <div class="solo__reviews">
                   <h3 class="trend__tv-title solo__title2">Отзыви</h3>
                   ${reviews}
                </div>
                `
            anime.classList.remove("active")
            mainSolo.innerHTML = div
        })
        .catch(e => {
            console.log(e);
            anime.classList.remove("active")
        })
}

// renderSolo(5412)

// search film
function searchRender(page = 1, keyword = "", fn = "getTopMovies") {
    mainBlock.innerHTML = "";
    mainSolo.innerHTML = "";
    kino[fn](page, keyword).then(data => {
            if (data.films.length > 0) {
                data.films.forEach(item => {
                    let someItem = document.createElement("div")
                    someItem.classList.add("some__item")
                    someItem.innerHTML = `
           <div class="some__img">
           <img src="${item.posterUrlPreview}" alt="${item.nameRu || item.nameEn}" class="" loading="lazy">
           <span class="some__rating">${item.rating != null ? item.rating : 0}</span>
           <h3 class="some__title">${item.nameRu || item.nameEn}</h3>
           </div>`
                    someItem.setAttribute("data-id", item.filmId)
                    mainBlock.append(someItem)
                })
            } else {
                mainBlock.innerHTML = `<p class="undefined">Not a found</p>`
            }
        })
        .then(() => {
            let someItem = document.querySelectorAll(".some__item")
            someItem.forEach(item => {
                item.addEventListener("click", function (e) {
                    let attr = this.getAttribute("data-id")
                    renderSolo(attr)
                })
            });
            anime.classList.remove("active")
        })
        .catch(e => {
            console.log(e);
        })
}

searchRender()

formMain.addEventListener("submit", function (e) {
    e.preventDefault();
    searchRender(1, formInput.value, `getSearch`)
})
// search film

// render solo