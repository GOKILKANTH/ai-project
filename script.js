document.addEventListener('DOMContentLoaded', function(){
  // ===== Theme System =====
  const themeSelect = document.getElementById('themeSelect');
  const savedTheme = localStorage.getItem('bike_sale_theme') || 'default';
  
  // Apply saved theme on page load
  if(savedTheme !== 'default') {
    document.body.setAttribute('data-theme', savedTheme);
  }
  
  if(themeSelect) {
    themeSelect.value = savedTheme;
    themeSelect.addEventListener('change', function(e){
      const theme = e.target.value;
      
      if(theme === 'default') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', theme);
      }
      
      localStorage.setItem('bike_sale_theme', theme);
    });
  }
  
  // ===== Cart Functionality =====
  const cartBtn = document.getElementById('cartBtn');
  const cartCountEl = document.getElementById('cartCount');
  
  // Initialize cart display
  const initialStats = DatabaseManager.getCartStats();
  cartCountEl.textContent = initialStats.totalItems;
  
  let cartCount = initialStats.totalItems;
  
  // Add to cart buttons
  document.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', function(){
      const productName = this.closest('.card').querySelector('h3').textContent;
      const productPrice = parseFloat(this.closest('.card').querySelector('.price').textContent.replace('$', ''));
      const productId = this.getAttribute('data-id');
      const productImage = this.closest('.card').querySelector('img').src;
      
      // Create product object and add to database
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
      };
      
      DatabaseManager.addToCart(product);
      
      // Update cart count
      const stats = DatabaseManager.getCartStats();
      cartCountEl.textContent = stats.totalItems;
      
      // Visual feedback
      btn.textContent = 'Added! ✓';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 1500);
    });
  });
  
  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  
  if(menuToggle){
    menuToggle.addEventListener('click', function(){
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '100%';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.flexDirection = 'column';
      nav.style.background = '#ffffff';
      nav.style.borderBottom = '1px solid #e2e8f0';
      nav.style.padding = '1rem';
      nav.style.gap = '0.5rem';
    });
  }
  
  // ===== Filter Products =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function(){
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter cards
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if(filter === 'all' || category === filter){
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // ===== Contact Form =====
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      
      const formMessage = document.getElementById('formMessage');
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone')?.value || '';
      
      // Save customer data to database
      DatabaseManager.addCustomer({
        name: name,
        email: email,
        phone: phone
      });
      
      // Simulate form submission
      formMessage.textContent = 'Thank you, ' + name + '! We\'ll get back to you at ' + email + ' shortly.';
      formMessage.className = 'form-message success';
      
      // Reset form
      setTimeout(() => {
        contactForm.reset();
        formMessage.textContent = '';
        formMessage.className = 'form-message';
      }, 3000);
    });
  }
  
  // ===== Active Navigation Link =====
  const navLinks = document.querySelectorAll('.nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if(href === currentPage || (href === 'index.html' && currentPage === '')){
      link.classList.add('active');
    }
  });
});
