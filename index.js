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
