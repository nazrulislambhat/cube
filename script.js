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

/* ================= IMAGE GALLERY ================= */

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

//accordions
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
//add to cart
const state = {
  purchase: 'single',
  singleFragrance: 'original',
  doubleFragrance1: 'frag1',
  doubleFragrance2: 'frag2',
};

/* -------------------------
   DOM
-------------------------- */
const addToCartBtn = document.getElementById('addToCart');

const singleBox = document.getElementById('singleBox');
const doubleBox = document.getElementById('doubleBox');

/* -------------------------
   HELPERS
-------------------------- */
function normalize(text) {
  return text.toLowerCase().trim();
}

function updateAddToCartURL() {
  let url = '/cart?';

  if (state.purchase === 'single') {
    url += `type=single&frag=${state.singleFragrance}`;
  } else {
    url += `type=double&frag1=${state.doubleFragrance1}&frag2=${state.doubleFragrance2}`;
  }

  addToCartBtn.href = url;
  console.log('Add to cart URL:', url);
}

/* -------------------------
   PURCHASE TYPE TOGGLE
-------------------------- */
document.querySelectorAll('input[name="purchase"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    state.purchase = e.target.value;

    if (state.purchase === 'single') {
      singleBox.classList.add('active');
      doubleBox.classList.remove('active');
    } else {
      doubleBox.classList.add('active');
      singleBox.classList.remove('active');
    }

    updateAddToCartURL();
  });
});

/* -------------------------
   SINGLE FRAGRANCE
-------------------------- */
document.querySelectorAll('#singleBox .fragrance').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('#singleBox .fragrance');

    state.singleFragrance = normalize(card.querySelector('span').innerText);

    updateAddToCartURL();
  });
});

/* -------------------------
   DOUBLE – FRAGRANCE 1
-------------------------- */
document.querySelectorAll('.fragrance-1 .fragrance').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.fragrance-1 .fragrance');

    state.doubleFragrance1 = normalize(card.querySelector('span').innerText);

    updateAddToCartURL();
  });
});

/* -------------------------
   DOUBLE – FRAGRANCE 2
-------------------------- */
document.querySelectorAll('.fragrance-2 .fragrance').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.fragrance-2 .fragrance');

    state.doubleFragrance2 = normalize(card.querySelector('span').innerText);

    updateAddToCartURL();
  });
});

/* -------------------------
   INIT
-------------------------- */
updateAddToCartURL();

//numbers counter

const counters = document.querySelectorAll('.stat h3');

const animateCounter = (el) => {
  const target = +el.dataset.percent;
  let current = 0;
  const duration = 1200; // ms
  const increment = target / (duration / 16);

  const update = () => {
    current += increment;
    if (current < target) {
      el.textContent = `${Math.round(current)}%`;
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}%`;
    }
  };

  update();
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target); // run only once
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));
