// ===== DATA =====
const games = [
  {
    id: 1,
    title: "Elden Ring",
    genre: "Action RPG",
    emoji: "⚔️",
    img: "/assets/images/elden_ring.jpg",
    price: 39.99,
    orig: 59.99,
    rating: 5,
    reviews: 14820,
    badge: "hot",
    platform: ["PC", "PlayStation", "Xbox"],
    desc: "Journey through the Lands Between, a new fantasy world created by Hidetaka Miyazaki and George R.R. Martin. Discover a story told through its vast world and formidable enemies.",
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    genre: "Action RPG",
    emoji: "🤖",
    img: "/assets/images/cyperpunk2077.jpeg",
    price: 29.99,
    orig: 59.99,
    rating: 4,
    reviews: 8421,
    badge: "sale",
    platform: ["PC", "PlayStation", "Xbox"],
    desc: "An open-world action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
  },
  {
    id: 3,
    title: "God of War Ragnarök",
    genre: "Action",
    emoji: "🪓",
    img: "/assets/images/god_of_war_ragnarök.jpg",
    price: 49.99,
    orig: 69.99,
    rating: 5,
    reviews: 12350,
    badge: "sale",
    platform: ["PlayStation"],
    desc: "Join Kratos and Atreus on a mythic journey through the Nine Realms as they prepare for the prophesied end of the world.",
  },
  {
    id: 4,
    title: "Hogwarts Legacy",
    genre: "RPG",
    emoji: "🧙",
    img: "/assets/images/hogwarts_legacy.jpeg",
    price: 44.99,
    orig: 59.99,
    rating: 4,
    reviews: 6740,
    badge: "new",
    platform: ["PC", "PlayStation", "Xbox"],
    desc: "Explore and discover magic in an open world set in the wizarding world of the 1800s. Your legacy is what you make of it.",
  },
  {
    id: 5,
    title: "FIFA 25",
    genre: "Sports",
    emoji: "⚽",
    img: "/assets/images/fc_2025.png",
    price: 59.99,
    orig: 69.99,
    rating: 4,
    reviews: 9210,
    badge: "new",
    platform: ["PC", "PlayStation", "Xbox"],
    desc: "Feel the power of EA SPORTS FC – the most authentic football simulation featuring over 19,000 players and 700+ teams.",
  },
  {
    id: 6,
    title: "Starfield",
    genre: "RPG",
    emoji: "🚀",
    img: "/assets/images/starfield.jpg",
    price: 39.99,
    orig: 69.99,
    rating: 4,
    reviews: 5890,
    badge: "sale",
    platform: ["PC", "Xbox"],
    desc: "In this next generation role-playing game, create any character you want and explore with unmatched freedom in Bethesda's first new universe in 25 years.",
  },
  {
    id: 7,
    title: "Spider-Man 2",
    genre: "Action",
    emoji: "🕷️",
    img: "/assets/images/sm2.jpg",
    price: 59.99,
    orig: 69.99,
    rating: 5,
    reviews: 11230,
    badge: "new",
    platform: ["PlayStation"],
    desc: "Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save the city, each other, and the ones they love.",
  },
  {
    id: 8,
    title: "Diablo IV",
    genre: "Action RPG",
    emoji: "👹",
    img: "/assets/images/diablo_iv.jpeg",
    price: 39.99,
    orig: 69.99,
    rating: 4,
    reviews: 7640,
    badge: "sale",
    platform: ["PC", "PlayStation", "Xbox"],
    desc: "Endless evil awaits. Join the eternal battle between the High Heavens and Burning Hells in a dark world where you are the only hope.",
  },
  {
    id: 9,
    title: "Baldur's Gate 3",
    genre: "RPG",
    emoji: "🏰",
    img: "/assets/images/baldur's_gate_3.jpg",
    price: 59.99,
    orig: 59.99,
    rating: 5,
    reviews: 19560,
    badge: "hot",
    platform: ["PC", "PlayStation"],
    desc: "Gather your party, and return to the Forgotten Realms. A tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.",
  },
  {
    id: 10,
    title: "Forza Horizon 5",
    genre: "Racing",
    emoji: "🏎️",
    img: "/assets/images/forza_horizon_5.jpg",
    price: 34.99,
    orig: 59.99,
    rating: 5,
    reviews: 8830,
    badge: "sale",
    platform: ["PC", "Xbox"],
    desc: "Your horizon adventure awaits! Explore the vibrant open world landscapes of Mexico in a historic automotive festival.",
  },
  {
    id: 11,
    title: "The Last of Us Part I",
    genre: "Adventure",
    emoji: "🌲",
    img: "/assets/images/the_last_of_us_Part_i.jpeg",
    price: 49.99,
    orig: 69.99,
    rating: 5,
    reviews: 10200,
    badge: "",
    platform: ["PC", "PlayStation"],
    desc: "Experience the emotional storytelling and compelling characters in the remake of the original game, now rebuilt for PlayStation 5.",
  },
  {
    id: 12,
    title: "Halo Infinite",
    genre: "Shooter",
    emoji: "🔫",
    img: "/assets/images/halo_infinite.jpeg",
    price: 19.99,
    orig: 59.99,
    rating: 4,
    reviews: 6120,
    badge: "sale",
    platform: ["PC", "Xbox"],
    desc: "When all hope is lost and humanity's fate hangs in the balance, the Master Chief is ready to confront the most ruthless foe he's ever faced.",
  },
];

// ===== CART STATE =====
let cart = [];
let currentDetail = null;

// ===== RENDER GAME CARD =====
function renderCard(game) {
  const stars = "★".repeat(game.rating) + "☆".repeat(5 - game.rating);
  const badgeHtml = game.badge
    ? `<div class="card-float"><span class="badge badge-${game.badge}">${game.badge === "hot" ? "🔥 Hot" : game.badge === "new" ? "✨ New" : "🏷️ Sale"}</span></div>`
    : "";
  const discount =
    game.orig > game.price ? Math.round((1 - game.price / game.orig) * 100) : 0;
  return `
  <div class="game-card" onclick="showDetail('${game.title.replace(/'/g, "\\'")}')">
    ${badgeHtml}
    <div class="game-cover">
      <span style="font-size:3.5rem;z-index:1;">
        <img class="card-img" src="${game.img}" alt="${game.title}">
      </span>
      <div class="game-cover-overlay">
        <button class="quick-add" onclick="event.stopPropagation();addToCart(${game.id})">
          + Add to Cart
        </button>
      </div>
    </div>
    <div class="game-card-body">
      <div class="game-platform">
        ${game.platform.map((p) => `<span class="platform-tag">${p}</span>`).join("")}
      </div>
      <div class="game-title">${game.title}</div>
      <div class="game-meta">
        <div><span class="stars">${stars}</span><span class="rating-count">(${(game.reviews / 1000).toFixed(1)}k)</span></div>
        <span class="badge badge-new" style="font-size:0.55rem;">${game.genre}</span>
      </div>
      <div class="game-price">
        <span class="price-current">$${game.price.toFixed(2)}</span>
        ${discount > 0 ? `<span class="price-original">$${game.orig.toFixed(2)}</span><span class="badge badge-sale">-${discount}%</span>` : ""}
      </div>
    </div>
  </div>`;
}

// ===== INIT GRIDS =====
function initGrids() {
  document.getElementById("featuredGrid").innerHTML = games
    .slice(0, 4)
    .map(renderCard)
    .join("");
  document.getElementById("newReleasesGrid").innerHTML = games
    .filter((g) => g.badge === "new")
    .slice(0, 4)
    .map(renderCard)
    .join("");
  document.getElementById("allGamesGrid").innerHTML = games
    .map(renderCard)
    .join("");
}

// ===== FILTER & SORT =====
let currentFilter = "all";
function filterGames(filter, el) {
  currentFilter = filter;
  document
    .querySelectorAll(".filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  const filtered =
    filter === "all" ? games : games.filter((g) => g.genre.includes(filter));
  document.getElementById("allGamesGrid").innerHTML = filtered
    .map(renderCard)
    .join("");
}
function sortGames(val) {
  let sorted = [...games];
  if (val === "price-asc") sorted.sort((a, b) => a.price - b.price);
  else if (val === "price-desc") sorted.sort((a, b) => b.price - a.price);
  else if (val === "rating") sorted.sort((a, b) => b.rating - a.rating);
  else if (val === "new")
    sorted = sorted
      .filter((g) => g.badge === "new")
      .concat(sorted.filter((g) => g.badge !== "new"));
  const filtered =
    currentFilter === "all"
      ? sorted
      : sorted.filter((g) => g.genre.includes(currentFilter));
  document.getElementById("allGamesGrid").innerHTML = filtered
    .map(renderCard)
    .join("");
}

// ===== DETAIL PAGE =====
function showDetail(title) {
  const game = games.find((g) => g.title === title);
  if (!game) return;
  currentDetail = game;

  // Helper: build inner HTML for main image or thumbnail
  function imgOrEmoji(src, alt, emoji) {
    if (src) return `<img class="card-details-img" src="${src}" alt="${alt}">`;
    return emoji;
  }

  const detailImgEl = document.getElementById("detailImg");
  detailImgEl.innerHTML = imgOrEmoji(game.img, game.title, game.emoji);
  detailImgEl.style.fontSize = game.img ? "" : "6rem";

  // Thumbnails — thumb1 mirrors the main image; others are decorative slots
  document.getElementById("thumb1").innerHTML = imgOrEmoji(
    game.img,
    game.title + " screenshot 1",
    game.emoji,
  );
  document.getElementById("thumb2").innerHTML = imgOrEmoji(game.img, "", "🌟");
  document.getElementById("thumb3").innerHTML = imgOrEmoji(game.img, "", "⚡");
  document.getElementById("thumb4").innerHTML = imgOrEmoji(game.img, "", "🏆");
  document.getElementById("detailGenre").textContent = game.genre.toUpperCase();
  document.getElementById("detailTitle").textContent = game.title;
  document.getElementById("detailStars").textContent =
    "★".repeat(game.rating) + "☆".repeat(5 - game.rating);
  document.getElementById("detailReviews").textContent =
    `(${game.reviews.toLocaleString()} reviews)`;
  document.getElementById("detailPrice").textContent =
    `$${game.price.toFixed(2)}`;
  document.getElementById("detailOrig").textContent =
    game.orig > game.price ? `$${game.orig.toFixed(2)}` : "";
  const discount =
    game.orig > game.price ? Math.round((1 - game.price / game.orig) * 100) : 0;
  document.getElementById("detailSave").textContent =
    discount > 0 ? `Save ${discount}%` : "";
  document.getElementById("detailDesc").textContent = game.desc;
  // Related
  const related = games
    .filter(
      (g) =>
        g.id !== game.id &&
        (g.genre.includes(game.genre.split(" ")[0]) || g.badge === game.badge),
    )
    .slice(0, 4);
  document.getElementById("relatedGrid").innerHTML = related
    .map(renderCard)
    .join("");
  showPage("detail");
}
function addToCartFromDetail() {
  if (currentDetail) addToCart(currentDetail.id);
}

// ===== CART =====
function addToCart(id) {
  const game = games.find((g) => g.id === id);
  if (!game) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...game, qty: 1 });
  updateCartUI();
  showToast(game.title);
  // Bump animation
  const cnt = document.getElementById("cartCount");
  cnt.classList.remove("bump");
  void cnt.offsetWidth;
  cnt.classList.add("bump");
}

function updateCartUI() {
  const total = cart.reduce((a, c) => a + c.qty, 0);
  document.getElementById("cartCount").textContent = total;
  renderCartPage();
}

function renderCartPage() {
  const container = document.getElementById("cartItems");
  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart">
      <div class="empty-cart-icon">🛒</div>
      <h3>Your cart is empty</h3>
      <p style="margin-bottom:24px;">Add some games to get started!</p>
      <button class="btn btn-primary" onclick="showPage('games')"><i class="fas fa-gamepad"></i> Browse Games</button>
    </div>`;
  } else {
    container.innerHTML = cart
      .map(
        (item) => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-platform">${item.platform.join(" · ")}</div>
      </div>
      <div class="quantity-control">
        <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
      </div>
      <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
        <i class="fas fa-trash"></i>
      </button>
    </div>`,
      )
      .join("");
  }
  // Summary
  const sub = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const tax = sub * 0.08;
  const total = sub + tax;
  document.getElementById("summarySubtotal").textContent = `$${sub.toFixed(2)}`;
  document.getElementById("summaryTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("summaryTotal").textContent = `$${total.toFixed(2)}`;
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  updateCartUI();
}
function removeFromCart(id) {
  const el = document.getElementById(`cart-item-${id}`);
  if (el) {
    el.style.opacity = "0";
    el.style.transform = "translateX(20px)";
    el.style.transition = "all 0.3s";
    setTimeout(() => {
      cart = cart.filter((c) => c.id !== id);
      updateCartUI();
    }, 300);
  } else {
    cart = cart.filter((c) => c.id !== id);
    updateCartUI();
  }
}

// ===== TOAST =====
let toastTimer;
function showToast(title) {
  document.getElementById("toastGame").textContent = title + " added!";
  const t = document.getElementById("toast");
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

// ===== PAGE NAVIGATION =====
function showPage(page) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));

  document.getElementById("page-" + page).classList.add("active");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.dataset.page === page);
  });


  if (page === "cart") renderCartPage();
  window.scrollTo({ top: 0, behavior: "smooth" });
  // close mobile menu
  document.getElementById("navLinks").classList.remove("mobile-open");
}

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("mobile-open");
}

// ===== TIMER =====
let timerEnd = Date.now() + 8 * 3600000 + 45 * 60000 + 30000;
function updateTimer() {
  const diff = Math.max(0, timerEnd - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const ms = Math.floor((diff % 1000) / 10);
  document.getElementById("tHours").textContent = String(h).padStart(2, "0");
  document.getElementById("tMins").textContent = String(m).padStart(2, "0");
  document.getElementById("tSecs").textContent = String(s).padStart(2, "0");
  document.getElementById("tMs").textContent = String(ms).padStart(2, "0");
}
setInterval(updateTimer, 50);

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  document.getElementById("navbar").style.background =
    window.scrollY > 20 ? "rgba(8,11,20,0.98)" : "rgba(8,11,20,0.85)";
});

// ===== INIT =====
initGrids();
updateCartUI();
