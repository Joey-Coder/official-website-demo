import "./style.css";
import "./libs/glide/glide.core.min.css";
import "./libs/glide/glide.theme.min.css";

// import "./libs/scrollReveal/scrollreveal.min.js";
// import "./libs/glide/glide.min.js";
// import "./libs/anime/anime.min.js";
// import "./libs/isotope/isotope.pkgd.min";
// import "./libs/smooth-scroll/smooth-scroll.polyfills.min";

const glide = new Glide(".glide");

const captionsEl = document.querySelectorAll(".slide-caption");

const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");
// 滚动导航栏展现
window.addEventListener("scroll", () => {
  // 获取header本身高度
  const { height } = headerEl.getBoundingClientRect();
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

// 监听轮播事件
glide.on(["mount.after", "run.after"], () => {
  // glide.index 为当前轮播图下标
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    // stagger 作用于每个子节点
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  });
});

glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});

glide.mount();

const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item",
});

const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click", (e) => {
  const { target } = e;
  // 获取被点击按钮对象
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    // 清除所有active
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    // 给被点击类添加active
    target.classList.add("active");
    isotope.arrange({ filter: filterOption });
  }
});

// 控制哪些元素在滑动时才出现
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom",
  reset: true,
};
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".activity", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => [0, el.innerHTML],
      duration: 2000,
      round: 1,
      easing: "easeInExpo",
    });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      dataSectionEl.getBoundingClientRect().bottom / 5
    }px)`;
  },
});

window.addEventListener("scroll", () => {
  const { bottom } = dataSectionEl.getBoundingClientRect();
  const { top } = dataSectionEl.getBoundingClientRect();
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      bottom / 5
    }px)`;
  }
});

const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  header: "header",
  offset: 80,
});

document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});

const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach((exploreBtnEl) => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
