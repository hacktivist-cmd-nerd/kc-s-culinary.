# Nigerian Catering Company Static Website

## Overview

This project delivers a high-performance, visually sophisticated static website for a Nigerian catering company. It is built **entirely with HTML, CSS, and vanilla JavaScript**. All administrative content management and data persistence is handled through the browser's `localStorage`. The site is mobile-first, fully responsive, and features rich interactivity and animation—**without any frameworks or back-end**.

---

## Folder Structure

```
/
├── index.html
├── services.html
├── booking.html
├── contact.html
├── admin.html
├── assets/
│   ├── images/
│   │   └── ... (high-res food & event images)
│   ├── fonts/
│   │   └── ... (webfonts for serif/sans-serif)
│   └── icons/
│       └── ... (svg/png icons)
├── css/
│   ├── main.css
│   ├── admin.css
│   └── fonts.css
├── js/
│   ├── content.js         # Loads & injects site content from localStorage
│   ├── animations.js      # Handles scroll, parallax, and hover effects
│   ├── forms.js           # Booking/contact form logic, EmailJS/WhatsApp
│   ├── admin.js           # Admin dashboard logic (edit/save content)
│   └── utils.js           # Shared utility functions
└── README.md
```

---

## Site Pages

| File            | Purpose                                                                                         |
|-----------------|------------------------------------------------------------------------------------------------|
| `index.html`    | Homepage: Hero section, intro, testimonials, CTA.                                              |
| `services.html` | Services grid: Editable via admin, flexbox grid, dynamic content.                              |
| `booking.html`  | Booking form: Connects to EmailJS and WhatsApp, modal confirmation, client-side validation.    |
| `contact.html`  | Contact form: EmailJS, clickable info, social links.                                           |
| `admin.html`    | Static CMS: Password-protected, full edit rights for all content, sidebar navigation.          |

---

## Key Features

- **Elegant, Minimal UI:** Clean layouts, ample white space, modern typography (serif for headings, sans-serif for body).
- **Color Palette:**  
  - Background: `#F8F5EE`  
  - Text/Accents: `#4A3C38`  
  - Highlight: `#6A8E67`
- **Mobile-First:** Distinct optimized mobile layouts, touch-friendly nav, and components.
- **CSS Grid & Flexbox:**  
  - Main page layouts with CSS Grid.  
  - Components (cards, nav, testimonials, etc.) with Flexbox.
- **Rich Animations:**  
  - On-scroll fade/slide-in (IntersectionObserver).  
  - Parallax backgrounds (JS/CSS).  
  - Subtle hover transitions.
- **Smooth Interactions:**  
  - Smooth scrolling navigation.  
  - Clickable phone/email/social.  
  - Inline modal confirmations.
- **Static CMS (Admin):**  
  - Password-protected dashboard.  
  - Edit/add/reorder all content and images.  
  - Changes persist via `localStorage`.  
  - Sidebar navigation for content sections.
- **Data Flow:**  
  - All site pages dynamically fetch and render content from `localStorage`.  
  - On first load (no admin edits), site loads default seed data.
- **Forms:**  
  - All forms have inline JS validation.  
  - Booking and contact forms send via EmailJS and WhatsApp.  
  - No page reloads; confirmation modals auto-close after 5s.

---

## Setup & Deployment

### 1. **Local Development**

1. Clone or unzip the folder.
2. Place all provided images into `/assets/images/`.
3. Open `index.html` in your browser to preview.

### 2. **Hosting**

- The site is 100% static—simply upload all files/folders to any static web host (e.g., Netlify, Vercel, GitHub Pages, or cPanel).
- No server configuration required.

### 3. **Admin Access**

- Open `/admin.html`.
- Enter the provided admin password (see below).
- You may now edit all site content. Changes are saved instantly and persist across sessions in your browser's `localStorage`.
- To reset all content to defaults, use the "Reset Content" button in the admin dashboard.

**Default Admin Password:**  
```
cateringSuperSecure2024
```
*(Change this in `admin.js` if needed.)*

---

## Instructions for Admins

1. Visit `/admin.html` and log in.
2. Use the sidebar to switch between editing homepage, services, booking info, and contact info.
3. Upload new images or update text as needed.
4. All changes instantly update the live site (reload other pages to see changes).
5. Use "Reset" to restore all default content (careful: this erases all edits).

---

## Customization & Extending

- **Images:** Replace images in `/assets/images/` and update via the admin dashboard.
- **Fonts:** Update or add webfonts in `/assets/fonts/` and reference in `fonts.css`.
- **EmailJS/WhatsApp:**  
  - Update the EmailJS service/user IDs in `forms.js`.  
  - Set the WhatsApp recipient number in `forms.js`.

---

## Browser Support

- Fully tested on Chrome, Firefox, Safari, and Edge (latest versions).

---

## Credits

- All code and assets are original or provided for this project.
- Icons from [Feather Icons](https://feathericons.com/) (open source).
- Font families: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (serif), [Montserrat](https://fonts.google.com/specimen/Montserrat) (sans-serif).

---

## License

MIT License (edit as appropriate for your project).

---

## Questions?

Contact the web developer or use the admin dashboard's "Support" link.
