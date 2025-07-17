// Loads content from localStorage and injects into each page.
// If no content, loads default seed data (editable via admin.js).

(function () {
  const defaultContent = {
    hero: {
      title: "Delighting Lagos with Authentic Nigerian Flavours",
      subtitle: "Premier catering for weddings, corporate events, and special occasions.",
      cta: "Book a Consultation",
      bg: "assets/images/hero-default.jpg"
    },
    intro: {
      text: "Kc's Culinary, we bring the heart of Nigerian cuisine to your table. From classic jollof to gourmet suya, our passionate chefs deliver unforgettable experiences for every celebration.",
      image: "assets/images/intro-default.jpg"
    },
    servicesIntro: "Explore our range of catering services, tailored for every event and taste.",
    services: [
      {
        title: "Full-Service Event Catering",
        description: "Comprehensive catering for weddings, birthdays, and corporate galas.",
        image: "assets/images/service1.jpg"
      },
      {
        title: "Corporate Lunch Delivery",
        description: "Fresh, flavourful Nigerian meals delivered to your workplace daily.",
        image: "assets/images/cooperate.jpeg"
      },
      {
        title: "Private Chef Experience",
        description: "Personal chefs for intimate dinners and exclusive gatherings.",
        image: "assets/images/service3.jpg"
      }
    ],
    testimonials: [
      { name: "Chinwe O.", text: "The food was heavenly and the service outstanding. Highly recommended!" },
      { name: "Adebola C.", text: "Professional and reliable. Our guests are still raving about the suya!" }
    ],
    cta: {
      title: "Experience Nigeria's Culinary Heritage",
      btn: "Book Now"
    },
    footer: "© 2025 Kc's Culinary. All rights reserved.",
    booking: {
      title: "Book Your Catering",
      subtitle: "Let us help make your event unforgettable. Fill out the form below to get started."
    },
    contact: {
      title: "Contact Us",
      info: "We'd love to hear from you! Reach out for quotes, questions, or to discuss your next event.",
      list: [
        { type: "phone", label: "Phone", value: "+234 801 234 5678" },
        { type: "email", label: "Email", value: "info@naijacaterers.ng" },
        { type: "address", label: "Office", value: "123 Victoria Island, Lagos, Nigeria" },
        { type: "social", label: "Instagram", value: "@naijacaterers", link: "https://instagram.com/naijacaterers" }
      ]
    }
  };

  // Utility to get/set content in localStorage
  function getContent() {
    let data = localStorage.getItem('naijaContent');
    if (!data) {
      localStorage.setItem('naijaContent', JSON.stringify(defaultContent));
      return JSON.parse(JSON.stringify(defaultContent));
    }
    try {
      return JSON.parse(data);
    } catch {
      return JSON.parse(JSON.stringify(defaultContent));
    }
  }

  window.naijaGetContent = getContent;

  // ===== PAGE INJECTION LOGIC =====
  document.addEventListener('DOMContentLoaded', function () {
    const content = getContent();

    // INDEX PAGE
    if (document.getElementById('heroTitle')) {
      document.getElementById('heroTitle').textContent = content.hero.title;
      document.getElementById('heroSubtitle').textContent = content.hero.subtitle;
      document.getElementById('heroCTA').textContent = content.hero.cta;
      document.getElementById('heroSection').style.backgroundImage = `url('${content.hero.bg}')`;
      document.getElementById('introText').textContent = content.intro.text;
      document.getElementById('introImage').src = content.intro.image;
      // Services preview (first 2)
      const servicesPreview = document.getElementById('servicesPreview');
      if (servicesPreview) {
        servicesPreview.innerHTML = '';
        content.services.slice(0, 2).forEach(s => {
          const card = document.createElement('div');
          card.className = 'service-card';
          card.innerHTML = `<img src="${s.image}" alt="${s.title}"><div class="service-card-content"><h3 class="service-card-title">${s.title}</h3><p class="service-card-desc">${s.description}</p></div>`;
          servicesPreview.appendChild(card);
        });
      }
      // Testimonials
      const testimonialsList = document.getElementById('testimonialsList');
      if (testimonialsList) {
        testimonialsList.innerHTML = '';
        content.testimonials.forEach(t => {
          const div = document.createElement('div');
          div.className = 'testimonial';
          div.innerHTML = `<p>"${t.text}"</p><span class="testimonial-name">– ${t.name}</span>`;
          testimonialsList.appendChild(div);
        });
      }
      document.getElementById('ctaTitle').textContent = content.cta.title;
      document.getElementById('ctaBtn').textContent = content.cta.btn;
    }

    // SERVICES PAGE
    if (document.getElementById('servicesGrid')) {
      document.getElementById('servicesIntro').textContent = content.servicesIntro;
      const grid = document.getElementById('servicesGrid');
      grid.innerHTML = '';
      content.services.forEach((s, idx) => {
        const card = document.createElement('div');
        card.className = 'service-card scroll-animate';
        card.setAttribute('data-animate', 'fade-up');
        card.innerHTML = `<img src="${s.image}" alt="${s.title}"><div class="service-card-content"><h3 class="service-card-title">${s.title}</h3><p class="service-card-desc">${s.description}</p></div>`;
        grid.appendChild(card);
      });
    }

    // BOOKING PAGE
    if (document.getElementById('bookingTitle')) {
      document.getElementById('bookingTitle').textContent = content.booking.title;
      document.getElementById('bookingSubtitle').textContent = content.booking.subtitle;
      // Populate service dropdown
      const serviceSelect = document.getElementById('bookingService');
      if (serviceSelect) {
        serviceSelect.innerHTML = content.services.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
      }
    }

    // CONTACT PAGE
    if (document.getElementById('contactTitle')) {
      document.getElementById('contactTitle').textContent = content.contact.title;
      document.getElementById('contactInfo').textContent = content.contact.info;
      const contactList = document.getElementById('contactList');
      if (contactList) {
        contactList.innerHTML = '';
        content.contact.list.forEach(item => {
          let html = '';
          if (item.type === "phone") {
            html = `<li><strong>${item.label}:</strong> <a href="tel:${item.value.replace(/\s+/g, '')}">${item.value}</a></li>`;
          } else if (item.type === "email") {
            html = `<li><strong>${item.label}:</strong> <a href="mailto:${item.value}">${item.value}</a></li>`;
          } else if (item.type === "address") {
            html = `<li><strong>${item.label}:</strong> ${item.value}</li>`;
          } else if (item.type === "social") {
            html = `<li><strong>${item.label}:</strong> <a href="${item.link}" target="_blank">${item.value}</a></li>`;
          }
          contactList.innerHTML += html;
        });
      }
    }

    // FOOTER (all pages)
    if (document.getElementById('footerText')) {
      document.getElementById('footerText').textContent = content.footer;
    }

    // Responsive nav
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
      });
    }
  });
})();
