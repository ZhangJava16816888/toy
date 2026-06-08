const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const filterButtons = document.querySelectorAll("[data-filter]");
const toyDetail = document.querySelector("[data-toy-detail]");

const toyItems = {
  figure: {
    title: "小人",
    copy: "适合角色模型、主题摆件、盲盒风格产品和小批量上新。",
    image: "./assets/products/figures/b.png",
    alt: "3D打印小人模型",
  },
  stress: {
    title: "解压玩具",
    copy: "章鱼、活动关节、手把件等类型，适合礼品、电商和日常摆摊产品。",
    image: "./assets/products/toys/octopus-1.jpg",
    alt: "3D打印章鱼解压玩具",
  },
  custom: {
    title: "定制产品",
    copy: "可按图片、样品、尺寸或主题需求沟通，适合活动礼品、展示用品和个性化订单。",
    image: "./assets/products/custom-toy.jpg",
    alt: "3D打印定制产品",
  },
  desktop: {
    title: "桌面摆件",
    copy: "适合办公桌、书桌、展示架和礼品场景，可做不同颜色和尺寸。",
    image: "./assets/products/desktop-ornament.jpg",
    alt: "3D打印桌面摆件",
  },
  storage: {
    title: "收纳",
    copy: "桌面收纳、工具收纳、小物件收纳等产品，可按使用场景调整结构。",
    image: "./assets/products/storage-main.jpg",
    alt: "3D打印收纳产品",
  },
};

function closeNav() {
  if (!header || !navToggle) return;
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "打开菜单");
}

function toggleNav() {
  if (!header || !navToggle) return;
  const nextState = !header.classList.contains("is-open");
  header.classList.toggle("is-open", nextState);
  navToggle.setAttribute("aria-expanded", String(nextState));
  navToggle.setAttribute("aria-label", nextState ? "关闭菜单" : "打开菜单");
}

function renderToy(key) {
  const item = toyItems[key];
  if (!item || !toyDetail) return;

  toyDetail.innerHTML = `
    <img src="${item.image}" alt="${item.alt}" />
    <div>
      <span class="eyebrow">当前分类</span>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
    </div>
  `;
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeNav();
});

navToggle?.addEventListener("click", toggleNav);
nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeNav();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderToy(button.dataset.filter);
  });
});
