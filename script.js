const products = [
  {
    name: "Chocolate Fudge Cake",
    price: "₹499",
    image: "images/choco-fudge.jpg",
    desc: "Rich, moist, and topped with chocolate ganache."
  },
  {
    name: "Strawberry Dream",
    price: "₹399",
    image: "images/strawberry.jpg",
    desc: "Fresh strawberry layers with whipped cream."
  },
  {
    name: "Vanilla Delight",
    price: "₹349",
    image: "images/vanilla.jpeg",
    desc: "Classic vanilla with buttercream topping."
  },
  {
    name: "Chocolate Dream Cake",
    price: "₹499",
    image: "images/choco-dream.jpeg",
    desc: "Rich, creamy, and topped with chocolate cream."
  },
  {
    name: "Strawberry Forest",
    price: "₹399",
    image: "images/strawberry-forest.jpg",
    desc: "Fresh juicy strawberry creamy layers with whipped cream."
  },
  {
    name: "White Forest",
    price: "₹349",
    image: "images/white-forest.jpg",
    desc: "Creamy vanilla with buttercream topping."
  }
];

// Render product cards
const container = document.getElementById("product-carousel");

let imagesToLoad = products.length;
let imagesLoaded = 0;

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === imagesToLoad) {
      startAutoScroll();
    }
  };

  card.appendChild(img);
  card.innerHTML += `
    <h3>${product.name}</h3>
    <p>${product.desc}</p>
    <p><strong>${product.price}</strong></p>
  `;
  container.appendChild(card);
});

// Auto-scroll setup
let scrollStep = 1.25;
let direction = -1; // start right-to-left
let isUserScrolling = false;
let autoScrollPaused = false;
let scrollInterval;

function startAutoScroll() {
  scrollInterval = setInterval(autoScrollCarousel, 20);
}

function autoScrollCarousel() {
  if (!container || isUserScrolling || autoScrollPaused) return;

  container.scrollLeft += scrollStep * direction;

  // If reached either end, reverse direction
  if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
    direction = -1; // go left
  } else if (container.scrollLeft <= 0) {
    direction = 1; // go right
  }
}

// Pause/resume on drag/touch
container.addEventListener("mousedown", () => {
  isUserScrolling = true;
  pauseAutoScroll();
});
container.addEventListener("mouseup", () => {
  isUserScrolling = false;
  resumeAutoScroll();
});
container.addEventListener("touchstart", () => {
  isUserScrolling = true;
  pauseAutoScroll();
});
container.addEventListener("touchend", () => {
  isUserScrolling = false;
  resumeAutoScroll();
});

function pauseAutoScroll() {
  autoScrollPaused = true;
}
function resumeAutoScroll() {
  setTimeout(() => {
    autoScrollPaused = false;
  }, 1000);
}
