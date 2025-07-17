// Verified EmailJS Configuration with your actual IDs
const EMAILJS_USER_ID = 'QdlG2tmiq0uepBrfI';
const EMAILJS_SERVICE_ID = 'service_spmxcwc';
const EMAILJS_BOOKING_TEMPLATE_ID = 'template_v1i8jde';
const WHATSAPP_NUMBER = '2348183756754'; // Nigerian number without + or 00 prefix

// Track EmailJS initialization state
let emailjsInitialized = false;

// Improved modal function
function showModal(modalId, msg, isError = false) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error(`Modal ${modalId} not found`);
    return;
  }

  const messageElement = modal.querySelector('span');
  if (messageElement) {
    messageElement.textContent = msg;
    messageElement.className = isError ? 'error-message' : 'success-message';
  }

  modal.classList.add('show');
  setTimeout(() => modal.classList.remove('show'), 5000);
}

// Initialize EmailJS with proper error handling
async function initializeEmailJS() {
  if (!window.emailjs) {
    console.error('EmailJS library not loaded');
    return false;
  }

  try {
    await emailjs.init(EMAILJS_USER_ID);
    emailjsInitialized = true;
    console.log('EmailJS successfully initialized');
    return true;
  } catch (error) {
    console.error('EmailJS initialization failed:', error);
    return false;
  }
}

// Nigerian phone number validation
function isValidNigerianPhone(phone) {
  return /^(\+?234|0)?[789][01]\d{8}$/.test(phone);
}

// Booking form handler
async function handleBookingFormSubmit(e) {
  e.preventDefault();
  
  // Get form values safely
  const formElements = e.target.elements;
  const formData = {
    name: formElements.bookingName?.value.trim() || '',
    email: formElements.bookingEmail?.value.trim() || '',
    phone: formElements.bookingPhone?.value.trim() || '',
    service: formElements.bookingService?.value || '',
    date: formElements.bookingDate?.value || '',
    details: formElements.bookingDetails?.value.trim() || 'No details provided'
  };

  // Enhanced validation with specific error messages
  if (!formData.name) {
    showModal('bookingModal', 'Please enter your full name', true);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    showModal('bookingModal', 'Please enter a valid email address', true);
    return;
  }

  if (!isValidNigerianPhone(formData.phone)) {
    showModal('bookingModal', 'Please enter a valid Nigerian phone number (e.g., 08123456789)', true);
    return;
  }

  if (!formData.service) {
    showModal('bookingModal', 'Please select a service', true);
    return;
  }

  if (!formData.date) {
    showModal('bookingModal', 'Please select a date', true);
    return;
  }

  try {
    // Ensure EmailJS is ready
    if (!emailjsInitialized) {
      const initialized = await initializeEmailJS();
      if (!initialized) throw new Error('EmailJS not available');
    }

    // Send email via EmailJS
    const emailResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_BOOKING_TEMPLATE_ID,
      formData
    );
    
    console.log('EmailJS response:', emailResponse);

    // Prepare WhatsApp message
    const whatsappMessage = `New Booking Enquiry:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Date: ${formData.date}
Details: ${formData.details}`;

    // Open WhatsApp
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );

    // Success handling
    showModal('bookingModal', 'Booking submitted successfully! We will contact you shortly.');
    e.target.reset();

  } catch (error) {
    console.error('Booking submission error:', error);
    
    let errorMessage = 'Failed to send booking. Please try again.';
    if (error.status === 400) errorMessage = 'Invalid data - please check your inputs';
    if (error.status === 429) errorMessage = 'Too many requests - please wait a moment';
    if (error.message.includes('Network Error')) errorMessage = 'Network issue - check your connection';
    
    showModal('bookingModal', errorMessage, true);
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async () => {
  // Load EmailJS if not already loaded
  if (!window.emailjs) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = async () => {
      await initializeEmailJS();
    };
    document.head.appendChild(script);
  } else {
    await initializeEmailJS();
  }

  // Attach form handler
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingFormSubmit);
  }
});