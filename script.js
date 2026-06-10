const filterButtons = document.querySelectorAll("[data-filter]");
const toyDetail = document.querySelector("[data-toy-detail]");

const toyItems = {
  joint: {
    title: "关节人偶",
    copy: "全身精密关节，可自由转动，轻松摆出坐、立、奔跑等百种姿态。换装、搭配道具随你心意，既是精致的桌面艺术品，也是掌中故事的主角。树脂材质细腻雕琢，眼神仿佛藏着情绪，随手把玩或静静欣赏，都能让想象停不下来。",
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
    copy: "桌面总是长出杂物？这款收纳自带磁吸开合与可移动隔板。钥匙、数据线、便签纸各归其位，轻轻一推，杂乱隐身。磨砂质感或温润竹木，放玄关、梳妆台或床头，小物件终于有了自己的家。整洁，从随手一放开始。",
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
    </div>
    ${
      item.images
        ? `<div class="toy-image-grid">${item.images
            .map((image) => `<img src="${image.src}" alt="${image.alt}" />`)
            .join("")}</div>`
        : `<img src="${item.image}" alt="${item.alt}" />`
    }
  `;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderToy(button.dataset.filter);
  });
});
