$(".header__menu-button").click(
    () => {
        $(".header__menu-button").toggleClass("header__menu-button--close")
        $(".nav").toggleClass("nav--show")
    })