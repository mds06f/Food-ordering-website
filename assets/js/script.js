'use strict';

const header = document.getElementById('header');
const mobileNav = document.getElementById('mobile-nav');
const menuOpenBtn = document.getElementById('menu-open-btn');
const menuCloseBtn = document.getElementById('menu-close-btn');
const backToTopBtn = document.getElementById('back-to-top');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
  mobileNav.classList.remove('translate-x-full');
  mobileNav.classList.add('translate-x-0');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileNav.classList.remove('translate-x-0');
  mobileNav.classList.add('translate-x-full');
  document.body.style.overflow = '';
}

menuOpenBtn.addEventListener('click', openMobileMenu);
menuCloseBtn.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileNav.classList.contains('translate-x-full')) {
    closeMobileMenu();
  }
});

let lastScrollY = 0;

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }

  lastScrollY = scrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });

handleScroll();

function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal-up');
  const windowHeight = window.innerHeight;

  elements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = windowHeight - 80;

    if (elementTop < revealPoint) {
      el.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('text-sinopia');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('text-sinopia');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightActiveNav, { passive: true });

const reservationForm = document.getElementById('reservation-form');

if (reservationForm) {
  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const personCount = document.getElementById('person-count').value;
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;

    if (!personCount || !date || !time) {
      // Simple shake animation for empty fields
      this.querySelectorAll('input').forEach(input => {
        if (!input.value) {
          input.classList.add('border-red-500');
          input.style.animation = 'shake 0.5s ease';
          setTimeout(() => {
            input.classList.remove('border-red-500');
            input.style.animation = '';
          }, 1000);
        }
      });
      return;
    }

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `
      <ion-icon name="checkmark-circle" class="text-xl"></ion-icon>
      <span>Table Booked!</span>
    `;
    btn.classList.add('bg-green-600');
    btn.classList.remove('bg-sinopia');
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('bg-green-600');
      btn.classList.add('bg-sinopia');
      btn.disabled = false;
      this.reset();
    }, 3000);
  });
}

const heroShapes = document.querySelectorAll('.animate-float, .animate-float-delayed');

if (window.innerWidth > 768) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    heroShapes.forEach((shape, i) => {
      const factor = (i + 1) * 0.5;
      shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);
