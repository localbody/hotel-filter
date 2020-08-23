const btnsReviews = document.getElementsByClassName("reviews__item")
const btnsFilter = document.getElementsByClassName("btn-filter")
const btnShowAll = document.getElementsByClassName("btn-showall")[0]
const rooms = document.getElementsByClassName("room-detail")

// список SERVICES
let filterServices = []
// сколько должно быть REVIEWS
let minReviews = 0

function removeActiveReviews() {
    const activeReviews = document.getElementsByClassName("reviews__item active")
    if (!!activeReviews[0]) {
        activeReviews[0].classList.remove("active")
    }
}

function unckeckServices() {
    for(let i=0; i<btnsFilter.length; i++) {
        btnsFilter[i].checked = false
    }
}

function showAllBtn() {
    const isShowAll = !!document.getElementsByClassName("btn-all-reviews show")[0]
    if (!isShowAll) {
        btnShowAll.classList.add("show")
    }
}

function applyFilters(minReviews, filterServices) {
    for(let i=0; i<btnsFilter.length; i++) {

    }
}

// вешаем сброс фильтра и делаем SHOW ALL
btnShowAll.addEventListener("click", function () {
    filterServices = []
    minReviews = 0
    
    removeActiveReviews()
    unckeckServices()
    btnShowAll.classList.remove("show")
    // пробегаем по комнатам
    for(let i=0; i<rooms.length; i++) {
        rooms[i].classList.remove("hide")
    }
})

function checkRoom(room) {
    // по-умолчанию проверка пройдена
    let result = true
    let roomServices = room.dataset.services.split(",")
    for (let i=0; i<filterServices.length && result; i++) {
        result = roomServices.includes(filterServices[i])
    }
    // вернем true если все фильтры применились
    return (result && (room.dataset.reviews >= minReviews))
}

function checkRooms() {
    // пробегаем по комнатам 
    for(let i=0; i<rooms.length; i++) {
        let room = rooms[i]
        // скрыта ли уже комната ?
        let isHideRoom = (room.className.indexOf("hide") > -1)

        // результат проверки
        let checkResult = checkRoom(room)

        if (!isHideRoom && !checkResult) {
            // скроем комнату
            rooms[i].classList.add("hide")
        } else if (checkResult) {
            // покажем комнату
            rooms[i].classList.remove("hide")
        }
    }
}

for (let i=0; i<btnsReviews.length; i++) {
    btnsReviews[i].addEventListener("click", function() {

        // если кликнули НЕ активный фильтр
        if (this.className.indexOf("active") == -1) {
            minReviews =parseInt(this.innerText)
            // убираем ACTIVE с активного фильтра REVIEWS
            removeActiveReviews()
            // ставим  на выбранный фильтр
            this.classList.add("active")
            // покажем кнопку сброса фильтров
            showAllBtn()
            checkRooms()
        }

    })
}

for (let i=0; i<btnsFilter.length; i++) { 

    btnsFilter[i].addEventListener("click", function () {
    
        // покажем кнопку сброса фильтров
        showAllBtn()
        const currentFilter = this.dataset.filter

        // если УЖЕ ЕСТЬ в списке КЛИКНУТЫЙ фильтр - значит сняли CHECKED
        // если нет - добавим 
        const index = filterServices.indexOf(currentFilter)
        if (index == -1) {
            filterServices.push(currentFilter)
        } else {
            filterServices = filterServices.filter(function(item) { 
                                return item !== currentFilter
                            })
        }
        checkRooms()
    })
}

$(".header__menu-button").click(
    () => {
        $(".header__menu-button").toggleClass("header__menu-button--close")
        $(".nav").toggleClass("nav--show")
    })