const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav a');

function toggleMenu() {
  const isOpen = hamburger.classList.toggle('active');
  nav.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
}

hamburger.addEventListener('click', toggleMenu);

// Close on link click
links.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
  }
});
/* ================= IMAGE GALLERY ================= */
const images = [
  './assets/thumb-1.png',
  './assets/thumb-2.png',
  './assets/thumb-3.png',
  './assets/thumb-4.png',
  './assets/thumb-1.png',
  './assets/thumb-2.png',
  './assets/thumb-3.png',
  './assets/thumb-4.png',
];

let current = 0;
const mainImage = document.getElementById('mainImage');
const dotsContainer = document.getElementById('dots');

function renderDots() {
  dotsContainer.innerHTML = '';
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.toggle('active', i === current);
    dot.onclick = () => changeImage(i);
    dotsContainer.appendChild(dot);
  });
}

function changeImage(index) {
  current = index;
  mainImage.src = images[current];
  renderDots();
}

document.querySelector('.next').onclick = () =>
  changeImage((current + 1) % images.length);

document.querySelector('.prev').onclick = () =>
  changeImage((current - 1 + images.length) % images.length);

document.querySelectorAll('.thumbnails img').forEach((img) => {
  img.onclick = () => changeImage(+img.dataset.index);
});

renderDots();

/* ================= RADIO LOGIC ================= */
const addToCart = document.getElementById('addToCart');
const singleBox = document.getElementById('singleBox');
const doubleBox = document.getElementById('doubleBox');

function updateCartLink() {
  const purchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;
  const fragrance = document.querySelector(
    'input[name="fragrance"]:checked'
  ).value;

  addToCart.href = `/cart/${purchase}-${fragrance}`;
}

document.querySelectorAll('input[name="purchase"]').forEach((radio) => {
  radio.onchange = () => {
    singleBox.classList.toggle('active', radio.value === 'single');
    doubleBox.classList.toggle('active', radio.value === 'double');
    updateCartLink();
  };
});

document.querySelectorAll('input[name="fragrance"]').forEach((radio) => {
  radio.onchange = updateCartLink;
});

updateCartLink();
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
  const header = item.querySelector('.accordion-header');

  header.addEventListener('click', () => {
    accordionItems.forEach((i) => {
      if (i !== item) {
        i.classList.remove('active');
        i.querySelector('.icon').textContent = '+';
      }
    });

    const isActive = item.classList.toggle('active');
    item.querySelector('.icon').textContent = isActive ? '−' : '+';
  });
});
