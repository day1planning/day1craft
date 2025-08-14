// Loader animation
const loader = document.getElementById('loader');
const navLinks = document.querySelectorAll('header .nav a[href^="#"]');
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    loader.classList.add('active');
    setTimeout(()=> loader.classList.remove('active'), 500);
  });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.fromTo(el,
    { y: 28, opacity: 0 },
    {
      y: 0, opacity: 1, duration: .8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );
});

// Hero entrance
gsap.from('.hero .content', { y: 24, opacity: 0, duration: 1, ease: 'power2.out', delay: .15 });

// Parallax overlay
const overlay = document.querySelector('.hero .overlay');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - .5) * 6;
  const y = (e.clientY / window.innerHeight - .5) * 6;
  overlay.style.transform = `translate(${x}px, ${y}px)`;
});

// Tilt cards
document.querySelectorAll('[data-tilt]').forEach(card => {
  let rect;
  const damp = 20;
  function handleMove(e){
    rect = rect || card.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    card.style.transform = `rotateX(${(-dy*damp)}deg) rotateY(${(dx*damp)}deg) translateY(-6px)`;
  }
  function reset(){ card.style.transform = 'translateY(0)'; rect = null; }
  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', reset);
  card.addEventListener('mouseenter', () => card.style.transition = 'transform .12s ease');
});

// Smooth scroll offset
const OFFSET = 76;
function scrollWithOffset(hash){
  const el = document.querySelector(hash);
  if(!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', function(e){
    const hash = this.getAttribute('href');
    if(hash.length > 1){
      e.preventDefault();
      scrollWithOffset(hash);
      history.pushState(null, "", hash);
    }
  });
});
