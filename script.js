const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const menu = document.getElementById('primary-menu');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.getAttribute('data-open') === 'true';
    primaryNav.setAttribute('data-open', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  menu?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      primaryNav.setAttribute('data-open', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const stopsInput = document.getElementById('stops');
const rideTypeSelect = document.getElementById('ride-type');
const estimateValue = document.getElementById('estimate-value');
const bookingForm = document.querySelector('.booking-form');

const PRICE_MAP = {
  'one-way': 15,
  'round-trip': 25,
  'bundle-one-way': 100,
  'bundle-round-trip': 200,
};

function formatUSD(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function calculateEstimate() {
  const rideType = rideTypeSelect?.value ?? 'one-way';
  const base = PRICE_MAP[rideType] ?? 15;
  const extraStops = Number(stopsInput?.value ?? 0);
  const stopsCost = Math.max(0, extraStops) * 5;
  const total = base + stopsCost;
  if (estimateValue) {
    estimateValue.textContent = formatUSD(total);
  }
}

rideTypeSelect?.addEventListener('change', calculateEstimate);
stopsInput?.addEventListener('input', () => {
  if (!stopsInput) return;
  const value = Number(stopsInput.value);
  if (Number.isNaN(value) || value < 0) {
    stopsInput.value = '0';
  }
  calculateEstimate();
});

calculateEstimate();

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const summary = Array.from(formData.entries())
    .filter(([key]) => key !== 'notes')
    .map(([key, value]) => `${key.replace(/-/g, ' ')}: ${value || 'N/A'}`)
    .join('\n');

  const message = `Thanks for planning your ride with Bending Corners!\n\n${summary}\n\nEstimated total: ${estimateValue?.textContent}.\nWe will text you shortly at (501) 349-8972 to confirm.`;
  alert(message);
  bookingForm.reset();
  calculateEstimate();
});

const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const expanded = question.getAttribute('aria-expanded') === 'true';
    question.setAttribute('aria-expanded', String(!expanded));
    const answer = question.nextElementSibling;
    if (answer instanceof HTMLElement) {
      answer.hidden = expanded;
    }
  });
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
