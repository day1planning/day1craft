// script.js - combined final version from your original HTML

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Category filter logic
  const categoryButtons = document.querySelectorAll('.category-btn');
  const products = document.querySelectorAll('.product-item');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });

      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Image click enlarge modal
  const modal = document.createElement('div');
  modal.id = 'image-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modal.style.zIndex = '9999';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.innerHTML = '<img id="modal-img" style="max-width:90%;max-height:90%;border:5px solid #fff;border-radius:10px;">';
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('#modal-img');

  document.querySelectorAll('.product-item img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // AOS animation trigger refresh
  if (window.AOS) {
    AOS.init({ duration: 800, once: true });
  }
});
