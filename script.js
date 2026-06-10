const filterButtons = document.querySelectorAll("[data-filter]");
const menuFilterLinks = document.querySelectorAll("[data-menu-filter]");
const toyDetail = document.querySelector("[data-toy-detail]");
const sideMenuLinks = Array.from(document.querySelectorAll(".side-menu nav a"));
const trackedSections = Array.from(
  new Set(sideMenuLinks.map((link) => link.hash).filter(Boolean)),
)
  .map((hash) => document.querySelector(hash))
  .filter(Boolean);

let activeFilterKey = "joint";
let scrollTicking = false;

const toyItems = {
  joint: {
    title: "关节人偶",
    copy: "全身精密关节，可自由转动，轻松摆出坐、立、奔跑等百种姿态。换装、搭配道具随你心意，既是精致的桌面艺术品，也是掌中故事的主角。树脂材质细腻雕琢，眼神仿佛藏着情绪，随手把玩或静静欣赏，都能让想象停不下来。",
    tags: ["多关节可动", "道具搭配", "适合礼品", "支持批发"],
    images: [
      { src: "./assets/products/joint-dolls/joint-doll-1.jpg", alt: "黑色关节人偶细节展示" },
      { src: "./assets/products/joint-dolls/joint-doll-2.jpg", alt: "圣剑骑士关节人偶" },
      { src: "./assets/products/joint-dolls/joint-doll-3.jpg", alt: "圣剑骑士关节人偶配件展示" },
      { src: "./assets/products/joint-dolls/joint-doll-4.jpg", alt: "黄色侠客关节人偶" },
      { src: "./assets/products/joint-dolls/joint-doll-5.jpg", alt: "银色侠客关节人偶" },
      { src: "./assets/products/joint-dolls/joint-doll-6.jpg", alt: "绿色章鱼战士关节人偶" },
      { src: "./assets/products/joint-dolls/joint-doll-7.jpg", alt: "黑色章鱼战士关节人偶" },
      { src: "./assets/products/joint-dolls/joint-doll-8.jpg", alt: "红色章鱼战士关节人偶" },
      { src: "./assets/products/joint-dolls/joint-doll-9.jpeg", alt: "章鱼战士关节人偶配件展示" },
    ],
  },
  stress: {
    title: "解压玩具",
    copy: "捏、拉、按、揉，指尖的无限小剧场。触感软糯Q弹，声音清脆治愈，无需规则，只有纯粹的重复动作。装在口袋里，通勤或办公时偷偷玩几下，焦虑就被一点点挤走。玩不坏，还会恢复原状，像你的压力一样，轻松揉掉。",
    tags: ["Q弹手感", "桌面解压", "多款可选", "适合上新"],
    images: [
      { src: "./assets/products/stress-toys/stress-toy-1.png", alt: "解压玩具展示图一" },
      { src: "./assets/products/stress-toys/stress-toy-2.jpg", alt: "猫咪弹簧解压玩具" },
      { src: "./assets/products/stress-toys/stress-toy-3.jpg", alt: "龙鳞蛋解压玩具" },
      { src: "./assets/products/stress-toys/stress-toy-4.png", alt: "解压玩具展示图四" },
      { src: "./assets/products/stress-toys/stress-toy-5.jpg", alt: "旋转齿轮解压玩具" },
      { src: "./assets/products/stress-toys/stress-toy-6.png", alt: "解压玩具展示图六" },
      { src: "./assets/products/stress-toys/stress-toy-7.jpg", alt: "解压玩具展示图七" },
      { src: "./assets/products/stress-toys/stress-toy-8.png", alt: "解压玩具展示图八" },
      { src: "./assets/products/stress-toys/stress-toy-9.png", alt: "解压玩具展示图九" },
    ],
  },
  custom: {
    title: "定制产品",
    copy: "可按图片、样品、尺寸或主题需求沟通，适合活动礼品、展示用品和个性化订单。",
    tags: ["来图来样", "尺寸定制", "主题开发", "礼品订单"],
    image: "./assets/products/custom-toy.jpg",
    alt: "3D打印定制产品",
  },
  desktop: {
    title: "桌面摆件",
    copy: "适合办公桌、书桌、展示架和礼品场景，可做不同颜色和尺寸。",
    tags: ["桌面装饰", "多色可选", "礼品摆件", "小批量"],
    image: "./assets/products/desktop-ornament.jpg",
    alt: "3D打印桌面摆件",
  },
  storage: {
    title: "收纳",
    copy: "桌面总是长出杂物？这款收纳自带磁吸开合与可移动隔板。钥匙、数据线、便签纸各归其位，轻轻一推，杂乱隐身。磨砂质感或温润竹木，放玄关、梳妆台或床头，小物件终于有了自己的家。整洁，从随手一放开始。",
    tags: ["桌面整理", "首饰收纳", "小物分类", "支持定制"],
    images: [
      { src: "./assets/products/storage-tools/storage-tool-1.png", alt: "粉色首饰收纳托盘" },
      { src: "./assets/products/storage-tools/storage-tool-2.png", alt: "电池与配件收纳盒" },
      { src: "./assets/products/storage-tools/storage-tool-3.png", alt: "红色厨房漏勺收纳工具" },
      { src: "./assets/products/storage-tools/storage-tool-4.png", alt: "粉色蝴蝶结化妆刷收纳桶" },
      { src: "./assets/products/storage-tools/storage-tool-5.png", alt: "仙人掌首饰收纳架" },
      { src: "./assets/products/storage-tools/storage-tool-6.png", alt: "首饰收纳托盘" },
      { src: "./assets/products/storage-tools/storage-tool-7.png", alt: "电池收纳盒" },
      { src: "./assets/products/storage-tools/storage-tool-8.png", alt: "三层首饰收纳架" },
    ],
  },
  accessories: {
    title: "3D打印配件",
    copy: "专注高品质3D打印机配件，涵盖喷头、加热组件、风扇等核心部件。耐用精准，提升打印成功率与模型精度。为DIY爱好者和专业用户提供稳定可靠的升级选择。",
    tags: ["喷头组件", "风扇线束", "维护升级", "稳定备件"],
    images: [
      { src: "./assets/products/printing-accessories/accessory-1.jpg", alt: "3D打印机喷头散热组件" },
      { src: "./assets/products/printing-accessories/accessory-2.jpg", alt: "3D打印机加热组件" },
      { src: "./assets/products/printing-accessories/accessory-3.jpg", alt: "3D打印机风扇" },
      { src: "./assets/products/printing-accessories/accessory-4.jpg", alt: "3D打印机喷头安装细节" },
      { src: "./assets/products/printing-accessories/accessory-5.jpg", alt: "3D打印机配件底座" },
      { src: "./assets/products/printing-accessories/accessory-6.jpg", alt: "3D打印机喷嘴清洁针" },
      { src: "./assets/products/printing-accessories/accessory-7.jpg", alt: "3D打印机硅胶清洁刷" },
      { src: "./assets/products/printing-accessories/accessory-8.jpg", alt: "3D打印机耗材连接配件" },
      { src: "./assets/products/printing-accessories/accessory-9.jpg", alt: "3D打印机加热组件线束" },
      { src: "./assets/products/printing-accessories/accessory-10.jpg", alt: "3D打印机喷头组件" },
    ],
  },
};

function renderToy(key) {
  const item = toyItems[key];
  if (!item || !toyDetail) return;

  toyDetail.innerHTML = `
    <div class="toy-detail-copy">
      <span class="eyebrow">当前分类</span>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
      <ul class="feature-tags">
        ${item.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
    </div>
    ${
      item.images
        ? `<div class="toy-image-grid">${item.images
            .map((image) => `<img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async" />`)
            .join("")}</div>`
        : `<img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async" />`
    }
  `;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

function setActiveFilter(key) {
  if (!toyItems[key]) return;

  activeFilterKey = key;
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === key);
  });
  renderToy(key);
  setActiveMenu("toys");
}

menuFilterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const key = link.dataset.menuFilter;
    setActiveFilter(key);
    document.querySelector("#toys")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

sideMenuLinks.forEach((link) => {
  if (link.dataset.menuFilter) return;

  link.addEventListener("click", () => {
    setActiveMenu(link.hash.slice(1));
  });
});

function setActiveMenu(sectionId) {
  sideMenuLinks.forEach((link) => {
    const linkSection = link.hash.slice(1);
    const linkFilter = link.dataset.menuFilter;
    const isActive =
      sectionId === "toys"
        ? linkFilter === activeFilterKey
        : linkSection === sectionId && !linkFilter;

    link.classList.toggle("active", isActive);
  });
}

function updateActiveMenuFromScroll() {
  const offset = 150;
  let currentSectionId = trackedSections[0]?.id;

  trackedSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) {
      currentSectionId = section.id;
    }
  });

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    currentSectionId = "contact";
  }

  if (currentSectionId) {
    setActiveMenu(currentSectionId);
  }
}

window.addEventListener("scroll", () => {
  if (scrollTicking) return;

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateActiveMenuFromScroll();
    scrollTicking = false;
  });
});

updateActiveMenuFromScroll();

function initMatrixRain() {
  const canvas = document.getElementById("matrix-rain");
  if (!canvas) return;

  const ctx = canvas.getContext?.("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const characters = "HC3D";
  let width = 0;
  let height = 0;
  let fontSize = 16;
  let columns = 0;
  let drops = [];
  let leftRainEdge = 0;
  let rightRainEdge = 0;
  let animationFrameId = null;
  let frame = 0;

  function getCharacter(position) {
    return characters[((position % characters.length) + characters.length) % characters.length];
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    fontSize = width < 720 ? 14 : 16;
    columns = Math.ceil(width / fontSize);
    const contentWidth = Math.min(1440, width);
    const outerSpace = Math.max(0, (width - contentWidth) / 2);
    const sideWidth =
      width > 980 ? Math.max(120, outerSpace) : Math.max(42, width * 0.12);
    leftRainEdge = sideWidth;
    rightRainEdge = width - sideWidth;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.dataset.ready = "true";
    canvas.dataset.columns = String(columns);
    canvas.dataset.leftRainEdge = String(Math.round(leftRainEdge));
    canvas.dataset.rightRainEdge = String(Math.round(rightRainEdge));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    ctx.textBaseline = "top";
    drops = Array.from({ length: columns }, () => Math.floor((Math.random() * -height) / fontSize));
  }

  function drawMatrixRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;

    drops.forEach((drop, index) => {
      const x = index * fontSize;
      if (x > leftRainEdge && x < rightRainEdge) {
        return;
      }

      const y = drop * fontSize;
      const isLead = Math.random() > 0.975;
      const trailLength = width < 720 ? 5 : 7;

      for (let trail = 0; trail < trailLength; trail += 1) {
        const trailY = y - trail * fontSize;
        if (trailY < -fontSize || trailY > height + fontSize) continue;

        const char = getCharacter(drop - trail + index);
        const alpha = Math.max(0, 0.58 - trail * 0.075);
        ctx.fillStyle =
          trail === 0 && isLead
            ? "rgba(225, 255, 236, 0.92)"
            : `rgba(0, 255, 128, ${alpha})`;
        ctx.shadowColor = "rgba(0, 255, 128, 0.7)";
        ctx.shadowBlur = trail === 0 ? 10 : 3;
        ctx.fillText(char, x, trailY);
      }
      ctx.shadowBlur = 0;

      if (y > height && Math.random() > 0.965) {
        drops[index] = 0;
      } else {
        drops[index] += 1;
      }
    });
  }

  function animateMatrixRain() {
    frame += 1;
    if (frame % 2 === 0) {
      drawMatrixRain();
    }
    animationFrameId = window.requestAnimationFrame(animateMatrixRain);
  }

  resizeCanvas();
  drawMatrixRain();

  if (!reducedMotion) {
    animateMatrixRain();
  }

  window.addEventListener("resize", () => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
    resizeCanvas();
    drawMatrixRain();
    if (!reducedMotion) {
      animateMatrixRain();
    }
  });
}

initMatrixRain();
