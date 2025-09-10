const exploreMenu = document.querySelector(".explore-menu");
const exploreMenuOpen = document.querySelector(".explore-open");

const moreMenu = document.querySelector(".more-menu");
const moreMenuOpen = document.querySelector(".more-open");

let menuTimer;

// Explore Menu
const exploreMenuOpenFunction = () => {
    clearTimeout(menuTimer);
    exploreMenuOpen.classList.add("explore-menu-js");
}

const exploreMenuCloseFunction = () => {
    menuTimer = setTimeout(() => {
        exploreMenuOpen.classList.remove("explore-menu-js");
    }, 50);
}

// More Menu
const moreMenuOpenFunction = () => {
    clearTimeout(menuTimer);
    moreMenuOpen.classList.add("more-menu-js");
}

const moreMenuCloseFunction = () => {
    menuTimer = setTimeout(() => {
        moreMenuOpen.classList.remove("more-menu-js");
    }, 50);
}


// Explore Menu
exploreMenu.addEventListener("mouseenter", exploreMenuOpenFunction);
exploreMenuOpen.addEventListener("mouseenter", exploreMenuOpenFunction);

exploreMenu.addEventListener("mouseleave", exploreMenuCloseFunction);
exploreMenuOpen.addEventListener("mouseleave", exploreMenuCloseFunction);


// More Menu
moreMenu.addEventListener("mouseenter", moreMenuOpenFunction);
moreMenuOpen.addEventListener("mouseenter", moreMenuOpenFunction);

moreMenu.addEventListener("mouseleave", moreMenuCloseFunction);
moreMenuOpen.addEventListener("mouseleave", moreMenuCloseFunction);



const $header = document.querySelector("[data-header]");

const scrollWindow = () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
}

window.addEventListener("scroll", scrollWindow);


document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("mobile-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
