// Admin dashboard: password login, sidebar navigation, edit/save all content, image upload, reset

const ADMIN_PASSWORD = "kelechi";

function getContent() {
  return window.naijaGetContent ? window.naijaGetContent() : {};
}
function setContent(obj) {
  localStorage.setItem('naijaContent', JSON.stringify(obj));
}

function showSection(section) {
  document.querySelectorAll('.admin-section').forEach(sec => sec.style.display = 'none');
  document.querySelector(`#admin${section.charAt(0).toUpperCase()+section.slice(1)}Section`).style.display = 'block';
}

function renderHomeSection(content) {
  const el = document.getElementById('adminHomeSection');
  el.innerHTML = `
    <h2>Edit Homepage</h2>
    <form id="homeEditForm">
      <label>Hero Title</label>
      <input name="heroTitle" value="${content.hero.title}">
      <label>Hero Subtitle</label>
      <input name="heroSubtitle" value="${content.hero.subtitle}">
      <label>Hero Button Text</label>
      <input name="heroCTA" value="${content.hero.cta}">
      <label>Hero Background Image URL</label>
      <input name="heroBg" value="${content.hero.bg}">
      <label>Intro Text</label>
      <textarea name="introText">${content.intro.text}</textarea>
      <label>Intro Image URL</label>
      <input name="introImg" value="${content.intro.image}">
      <label>Services Overview Text</label>
      <input name="servicesIntro" value="${content.servicesIntro}">
      <label>CTA Title</label>
      <input name="ctaTitle" value="${content.cta.title}">
      <label>CTA Button Text</label>
      <input name="ctaBtn" value="${content.cta.btn}">
      <label>Footer Text</label>
      <input name="footer" value="${content.footer}">
      <button type="submit">Save</button>
    </form>
    <h3>Testimonials</h3>
    <ul id="testimonialAdminList"></ul>
    <form id="addTestimonialForm">
      <label>Name</label><input name="tName" required>
      <label>Text</label><input name="tText" required>
      <button type="submit">Add Testimonial</button>
    </form>
  `;
  // Testimonials
  const tList = el.querySelector('#testimonialAdminList');
  tList.innerHTML = '';
  content.testimonials.forEach((t,i) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${t.name}</strong>: "${t.text}" <button data-idx="${i}" class="delT">Delete</button>`;
    tList.appendChild(li);
  });
  tList.querySelectorAll('.delT').forEach(btn => btn.onclick = function(){
    content.testimonials.splice(btn.dataset.idx,1);
    setContent(content); renderHomeSection(content);
  });
  // Add Testimonial
  el.querySelector('#addTestimonialForm').onsubmit = function(ev){
    ev.preventDefault();
    const n = this.tName.value.trim(), txt = this.tText.value.trim();
    if(n && txt){ content.testimonials.push({name:n,text:txt}); setContent(content); renderHomeSection(content);}
    this.reset();
  };
  // Save homepage
  el.querySelector('#homeEditForm').onsubmit = function(ev){
    ev.preventDefault();
    content.hero.title = this.heroTitle.value;
    content.hero.subtitle = this.heroSubtitle.value;
    content.hero.cta = this.heroCTA.value;
    content.hero.bg = this.heroBg.value;
    content.intro.text = this.introText.value;
    content.intro.image = this.introImg.value;
    content.servicesIntro = this.servicesIntro.value;
    content.cta.title = this.ctaTitle.value;
    content.cta.btn = this.ctaBtn.value;
    content.footer = this.footer.value;
    setContent(content);
    alert('Homepage updated!');
  };
}

function renderServicesSection(content) {
  const el = document.getElementById('adminServicesSection');
  el.innerHTML = `
    <h2>Edit Services</h2>
    <div class="service-admin-list" id="serviceAdminList"></div>
    <form id="addServiceForm">
      <label>Title</label><input name="title" required>
      <label>Description</label><input name="desc" required>
      <label>Image URL</label><input name="img" required>
      <button type="submit">Add Service</button>
    </form>
  `;
  const sList = el.querySelector('#serviceAdminList');
  sList.innerHTML = '';
  content.services.forEach((s,i) => {
    const div = document.createElement('div');
    div.className = 'service-admin-card';
    div.innerHTML = `<img src="${s.image}" alt=""><div><strong>${s.title}</strong><div>${s.description}</div></div>
      <div class="service-admin-controls">
        <button data-idx="${i}" class="upBtn">&#8593;</button>
        <button data-idx="${i}" class="downBtn">&#8595;</button>
        <button data-idx="${i}" class="editBtn">Edit</button>
        <button data-idx="${i}" class="delBtn">Delete</button>
      </div>`;
    sList.appendChild(div);
  });
  // Controls
  sList.querySelectorAll('.upBtn').forEach(btn => btn.onclick = function(){
    let i = +btn.dataset.idx;
    if(i>0){ [content.services[i-1], content.services[i]] = [content.services[i], content.services[i-1]]; setContent(content); renderServicesSection(content);}
  });
  sList.querySelectorAll('.downBtn').forEach(btn => btn.onclick = function(){
    let i = +btn.dataset.idx;
    if(i<content.services.length-1){ [content.services[i+1], content.services[i]] = [content.services[i], content.services[i+1]]; setContent(content); renderServicesSection(content);}
  });
  sList.querySelectorAll('.delBtn').forEach(btn => btn.onclick = function(){
    let i = +btn.dataset.idx;
    content.services.splice(i,1); setContent(content); renderServicesSection(content);
  });
  sList.querySelectorAll('.editBtn').forEach(btn => btn.onclick = function(){
    let i = +btn.dataset.idx, s = content.services[i];
    let title = prompt("Edit title", s.title);
    if(title!==null) s.title = title;
    let desc = prompt("Edit description", s.description);
    if(desc!==null) s.description = desc;
    let img = prompt("Edit image URL", s.image);
    if(img!==null) s.image = img;
    setContent(content); renderServicesSection(content);
  });
  el.querySelector('#addServiceForm').onsubmit = function(ev){
    ev.preventDefault();
    const t = this.title.value.trim(), d = this.desc.value.trim(), img = this.img.value.trim();
    if(t && d && img){ content.services.push({title:t,description:d,image:img}); setContent(content); renderServicesSection(content);}
    this.reset();
  };
}

function renderBookingSection(content) {
  const el = document.getElementById('adminBookingSection');
  el.innerHTML = `
    <h2>Edit Booking Page</h2>
    <form id="bookingEditForm">
      <label>Booking Title</label>
      <input name="bTitle" value="${content.booking.title}">
      <label>Booking Subtitle</label>
      <textarea name="bSubtitle">${content.booking.subtitle}</textarea>
      <button type="submit">Save</button>
    </form>
  `;
  el.querySelector('#bookingEditForm').onsubmit = function(ev){
    ev.preventDefault();
    content.booking.title = this.bTitle.value;
    content.booking.subtitle = this.bSubtitle.value;
    setContent(content);
    alert('Booking page updated!');
  };
}

function renderContactSection(content) {
  const el = document.getElementById('adminContactSection');
  el.innerHTML = `
    <h2>Edit Contact Page</h2>
    <form id="contactEditForm">
      <label>Contact Title</label>
      <input name="cTitle" value="${content.contact.title}">
      <label>Contact Info Text</label>
      <textarea name="cInfo">${content.contact.info}</textarea>
      <button type="submit">Save</button>
    </form>
    <h3>Contact List</h3>
    <ul id="contactAdminList"></ul>
    <form id="addContactItemForm">
      <label>Type (phone, email, address, social)</label><input name="type" required>
      <label>Label</label><input name="label" required>
      <label>Value</label><input name="value" required>
      <label>Link (for social, optional)</label><input name="link">
      <button type="submit">Add Item</button>
    </form>
  `;
  // List
  const cList = el.querySelector('#contactAdminList');
  cList.innerHTML = '';
  content.contact.list.forEach((item,i) => {
    let txt = `<strong>${item.label}</strong>: ${item.value}`;
    if(item.type==='social') txt += ` (<a href="${item.link}" target="_blank">${item.link}</a>)`;
    cList.innerHTML += `<li>${txt} <button data-idx="${i}" class="delC">Delete</button></li>`;
  });
  cList.querySelectorAll('.delC').forEach(btn => btn.onclick = function(){
    content.contact.list.splice(btn.dataset.idx,1); setContent(content); renderContactSection(content);
  });
  el.querySelector('#addContactItemForm').onsubmit = function(ev){
    ev.preventDefault();
    let t = this.type.value.trim(), l = this.label.value.trim(), v = this.value.value.trim(), link = this.link.value.trim();
    if(t && l && v){ content.contact.list.push({type:t,label:l,value:v,link}); setContent(content); renderContactSection(content);}
    this.reset();
  };
  el.querySelector('#contactEditForm').onsubmit = function(ev){
    ev.preventDefault();
    content.contact.title = this.cTitle.value;
    content.contact.info = this.cInfo.value;
    setContent(content);
    alert('Contact page updated!');
  };
}

// Login logic
document.addEventListener('DOMContentLoaded', function () {
  const loginBox = document.getElementById('adminLoginBox');
  const dash = document.getElementById('adminDashboard');
  let loginForm = document.getElementById('adminLoginForm');
  let loginError = document.getElementById('adminLoginError');
  if (loginForm) {
    loginForm.onsubmit = function(ev){
      ev.preventDefault();
      if(document.getElementById('adminPassword').value === ADMIN_PASSWORD){
        loginBox.style.display = "none";
        dash.style.display = "";
        setupDashboard();
      } else {
        loginError.textContent = "Incorrect password.";
      }
    };
  }
});

function setupDashboard() {
  let content = getContent();
  // Sidebar navigation
  document.querySelectorAll('.sidebar-btn').forEach(btn => {
    btn.onclick = function(){
      document.querySelectorAll('.sidebar-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      let sec = btn.dataset.section;
      showSection(sec);
      if(sec==='home') renderHomeSection(content);
      if(sec==='services') renderServicesSection(content);
      if(sec==='booking') renderBookingSection(content);
      if(sec==='contact') renderContactSection(content);
    };
  });
  // Default to home
  showSection('home');
  renderHomeSection(content);
  // Reset
  const resetBtn = document.getElementById('resetBtn');
  if(resetBtn) {
    resetBtn.onclick = function(){
      if(confirm('Reset all content to default?')){
        localStorage.removeItem('naijaContent');
        alert('Content reset! Reloading...');
        location.reload();
      }
    };
  }
}