const glide = new Glide(".glide");

const captionsEl = document.querySelectorAll(".slide-caption");

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
  let { target } = e;
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
