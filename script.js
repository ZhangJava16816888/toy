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
    title: "Articulated Figures",
    copy: "Precision joints throughout the body allow free rotation and easy posing for sitting, standing, running, and display scenes. Swap outfits and props to build a character with personality. Finely detailed resin makes each figure feel polished as both a desktop collectible and a story-ready toy.",
    tags: ["Fully Articulated", "Prop Friendly", "Gift Ready", "Wholesale Support"],
    images: [
      { src: "./assets/products/joint-dolls/joint-doll-1.jpg", alt: "Black articulated figure detail display" },
      { src: "./assets/products/joint-dolls/joint-doll-2.jpg", alt: "Sword knight articulated figure" },
      { src: "./assets/products/joint-dolls/joint-doll-3.jpg", alt: "Sword knight articulated figure accessories" },
      { src: "./assets/products/joint-dolls/joint-doll-4.jpg", alt: "Yellow hero articulated figure" },
      { src: "./assets/products/joint-dolls/joint-doll-5.jpg", alt: "Silver hero articulated figure" },
      { src: "./assets/products/joint-dolls/joint-doll-6.jpg", alt: "Green warrior articulated figure" },
      { src: "./assets/products/joint-dolls/joint-doll-7.jpg", alt: "Black warrior articulated figure" },
      { src: "./assets/products/joint-dolls/joint-doll-8.jpg", alt: "Red warrior articulated figure" },
      { src: "./assets/products/joint-dolls/joint-doll-9.jpeg", alt: "Warrior articulated figure accessory display" },
    ],
  },
  stress: {
    title: "Stress Toys",
    copy: "Designed for squeezing, pulling, pressing, and fidgeting, these toys turn small repeated motions into a calming desk or pocket experience. The resilient feel, crisp movement, and durable recovery make them easy additions for retail shelves, office breaks, and gift sets.",
    tags: ["Resilient Feel", "Desktop Stress Relief", "Multiple Styles", "New-Release Ready"],
    images: [
      { src: "./assets/products/stress-toys/stress-toy-1.png", alt: "Stress toy display image one" },
      { src: "./assets/products/stress-toys/stress-toy-2.jpg", alt: "Cat spring stress toy" },
      { src: "./assets/products/stress-toys/stress-toy-3.jpg", alt: "Textured egg stress toy" },
      { src: "./assets/products/stress-toys/stress-toy-4.png", alt: "Stress toy display image four" },
      { src: "./assets/products/stress-toys/stress-toy-5.jpg", alt: "Rotating gear stress toy" },
      { src: "./assets/products/stress-toys/stress-toy-6.png", alt: "Stress toy display image six" },
      { src: "./assets/products/stress-toys/stress-toy-7.jpg", alt: "Stress toy display image seven" },
      { src: "./assets/products/stress-toys/stress-toy-8.png", alt: "Stress toy display image eight" },
      { src: "./assets/products/stress-toys/stress-toy-9.png", alt: "Stress toy display image nine" },
    ],
  },
  custom: {
    title: "Custom Products",
    copy: "We can discuss production based on images, samples, sizes, or theme requirements, making these products suitable for event gifts, display items, and personalized orders.",
    tags: ["Image or Sample Based", "Size Customization", "Theme Development", "Gift Orders"],
    image: "./assets/products/custom-toy.jpg",
    alt: "3D printed custom product",
  },
  desktop: {
    title: "Desktop Ornaments",
    copy: "Suitable for office desks, study desks, display shelves, and gift scenarios, with color and size options available.",
    tags: ["Desk Decor", "Multiple Colors", "Gift Ornaments", "Small Batches"],
    image: "./assets/products/desktop-ornament.jpg",
    alt: "3D printed desktop ornament",
  },
  storage: {
    title: "Storage",
    copy: "Storage products can include magnetic closures, movable dividers, and compact layouts for keys, cables, notes, jewelry, and small accessories. They fit entryways, dressing tables, bedside areas, and desktop organization, with custom options available.",
    tags: ["Desktop Organization", "Jewelry Storage", "Small Item Sorting", "Customizable"],
    images: [
      { src: "./assets/products/storage-tools/storage-tool-1.png", alt: "Pink jewelry storage tray" },
      { src: "./assets/products/storage-tools/storage-tool-2.png", alt: "Battery and accessory storage box" },
      { src: "./assets/products/storage-tools/storage-tool-3.png", alt: "Red kitchen strainer storage tool" },
      { src: "./assets/products/storage-tools/storage-tool-4.png", alt: "Pink bow makeup brush storage cup" },
      { src: "./assets/products/storage-tools/storage-tool-5.png", alt: "Cactus jewelry storage stand" },
      { src: "./assets/products/storage-tools/storage-tool-6.png", alt: "Jewelry storage tray" },
      { src: "./assets/products/storage-tools/storage-tool-7.png", alt: "Battery storage box" },
      { src: "./assets/products/storage-tools/storage-tool-8.png", alt: "Three-tier jewelry storage stand" },
    ],
  },
  accessories: {
    title: "3D Printer Parts",
    copy: "We supply high-quality 3D printer parts, including nozzle assemblies, heating components, fans, and other core spare parts. Durable and precise parts help improve print success rates and model accuracy for DIY users and professional buyers.",
    tags: ["Nozzle Assemblies", "Fan Wiring Harnesses", "Maintenance Upgrades", "Reliable Spares"],
    images: [
      { src: "./assets/products/printing-accessories/accessory-1.jpg", alt: "3D printer nozzle cooling assembly" },
      { src: "./assets/products/printing-accessories/accessory-2.jpg", alt: "3D printer heating assembly" },
      { src: "./assets/products/printing-accessories/accessory-3.jpg", alt: "3D printer fan" },
      { src: "./assets/products/printing-accessories/accessory-4.jpg", alt: "3D printer nozzle installation detail" },
      { src: "./assets/products/printing-accessories/accessory-5.jpg", alt: "3D printer part base" },
      { src: "./assets/products/printing-accessories/accessory-6.jpg", alt: "3D printer nozzle cleaning needle" },
      { src: "./assets/products/printing-accessories/accessory-7.jpg", alt: "3D printer silicone cleaning brush" },
      { src: "./assets/products/printing-accessories/accessory-8.jpg", alt: "3D printer filament connector part" },
      { src: "./assets/products/printing-accessories/accessory-9.jpg", alt: "3D printer heating assembly wiring harness" },
      { src: "./assets/products/printing-accessories/accessory-10.jpg", alt: "3D printer nozzle assembly" },
    ],
  },
};

function renderToy(key) {
  const item = toyItems[key];
  if (!item || !toyDetail) return;

  toyDetail.innerHTML = `
    <div class="toy-detail-copy">
      <span class="eyebrow">Current Category</span>
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
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    ctx.textBaseline = "top";
    drops = Array.from({ length: columns }, () => Math.floor((Math.random() * -height) / fontSize));
  }

  function drawMatrixRain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, leftRainEdge, height);
    ctx.fillRect(rightRainEdge, 0, width - rightRainEdge, height);
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

      if (y > height && Math.random() > 0.985) {
        drops[index] = 0;
      } else {
        drops[index] += 1;
      }
    });
  }

  function animateMatrixRain() {
    frame += 1;
    if (frame % 4 === 0) {
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
