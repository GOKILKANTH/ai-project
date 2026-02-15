document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const cartCountEl = document.getElementById('cartCount');
  let cartCount = 0;

  // Theme handling
  const themeSelect = document.getElementById('themeSelect');
  const savedTheme = localStorage.getItem('bike_sale_theme') || 'default';
  if(savedTheme && document.body) document.body.setAttribute('data-theme', savedTheme);
  if(themeSelect){
    themeSelect.value = savedTheme;
    themeSelect.addEventListener('change', (e)=>{
      const t = e.target.value || 'default';
      document.body.setAttribute('data-theme', t);
      localStorage.setItem('bike_sale_theme', t);
    });
  }

  // Theme picker panel and swatches (preview on hover, click to select)
  const themePickerBtn = document.getElementById('themePickerBtn');
  const themePanel = document.getElementById('themePanel');
  const closeThemePanel = document.getElementById('closeThemePanel');
  let currentTheme = savedTheme || 'default';

  function openPanel(){
    if(!themePanel) return;
    themePanel.setAttribute('aria-hidden','false');
    themePickerBtn.setAttribute('aria-expanded','true');
  }
  function closePanel(){
    if(!themePanel) return;
    themePanel.setAttribute('aria-hidden','true');
    themePickerBtn.setAttribute('aria-expanded','false');
    // ensure saved theme is applied
    document.body.setAttribute('data-theme', currentTheme);
  }
  if(themePickerBtn){
    themePickerBtn.addEventListener('click', openPanel);
  }
  if(closeThemePanel){
    closeThemePanel.addEventListener('click', closePanel);
  }

  document.querySelectorAll('.swatch').forEach(s => {
    const themeName = s.dataset.theme;
    s.addEventListener('mouseenter', ()=>{
      document.body.setAttribute('data-theme', themeName);
    });
    s.addEventListener('mouseleave', ()=>{
      document.body.setAttribute('data-theme', currentTheme);
    });
    s.addEventListener('click', ()=>{
      currentTheme = themeName;
      localStorage.setItem('bike_sale_theme', themeName);
      if(themeSelect) themeSelect.value = themeName;
      document.body.setAttribute('data-theme', themeName);
      closePanel();
    });
    s.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Enter' || ev.key === ' ') s.click();
    });
  });

  menuToggle.addEventListener('click', ()=>{
    if(nav.style.display === 'block') nav.style.display = '';
    else nav.style.display = 'block';
  });

  document.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', ()=>{
      cartCount += 1;
      cartCountEl.textContent = cartCount;
      btn.textContent = 'Added';
      setTimeout(()=> btn.textContent = 'Add to Cart', 1200);
    });
  });
});
