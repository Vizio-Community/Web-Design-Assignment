document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 2. Character Counter for Contact Form
    const msgInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (msgInput && charCount) {
        msgInput.addEventListener('input', () => {
            charCount.textContent = msgInput.value.length;
        });
    }

    // 3. Contact Form Submission & Validation
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');

            // Name validation
            if (!nameInput.value.trim()) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }

            // Simple email validation pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }

            // Success feedback
            if (isValid) {
                alert('Thank you for reaching out! We will contact you shortly.');
                form.reset();
                if (charCount) charCount.textContent = '0';
            }
        });
    }

    // 4. Lead Generation Form Handler (Landing Page)
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('leadName');
            const email = document.getElementById('leadEmail');
            const phone = document.getElementById('leadPhone');
            const select = document.getElementById('practiceArea');

            const nameErr = document.getElementById('leadNameError');
            const emailErr = document.getElementById('leadEmailError');
            const phoneErr = document.getElementById('leadPhoneError');
            const selectErr = document.getElementById('leadSelectError');

            // Validation Rules
            if (!name.value.trim()) { nameErr.style.display = 'block'; isValid = false; }
            else { nameErr.style.display = 'none'; }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) { emailErr.style.display = 'block'; isValid = false; }
            else { emailErr.style.display = 'none'; }

            if (!phone.value.trim() || phone.value.trim().length < 7) { phoneErr.style.display = 'block'; isValid = false; }
            else { phoneErr.style.display = 'none'; }

            if (!select.value) { selectErr.style.display = 'block'; isValid = false; }
            else { selectErr.style.display = 'none'; }

            if (isValid) {
                alert('Your consultation request has been received! Our legal team will call you within 24 business hours.');
                leadForm.reset();
            }
        });
    }

    // 5. Accordion Toggle Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isActive = accordionItem.classList.contains('active');

            // Close all open items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = '0px';
                }
                const btn = item.querySelector('.accordion-header');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 30 + "px"; // Includes padding buffer
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // TESTIMONIALS ACCORDION TOGGLE
    document.addEventListener('DOMContentLoaded', () => {
        const testimonialHeaders = document.querySelectorAll('.testimonials .accordion-header');

        testimonialHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const currentItem = header.parentElement;
                const isOpen = currentItem.classList.contains('active');

                // Close all open testimonial items
                document.querySelectorAll('.testimonials .accordion-item').forEach(item => {
                    item.classList.remove('active');
                    const btnSpan = item.querySelector('.accordion-header span:last-child');
                    if (btnSpan) btnSpan.textContent = '+';
                });

                // Toggle current item if it wasn't already open
                if (!isOpen) {
                    currentItem.classList.add('active');
                    const btnSpan = header.querySelector('span:last-child');
                    if (btnSpan) btnSpan.textContent = '−';
                }
            });
        });
    });

    // ==========================================================================
    // SERVICES PAGE: SLIDER, MODAL, & SCROLL ANIMATIONS
    // ==========================================================================

    // 1. Image Slider Carousel Logic
    const slideTrack = id => document.getElementById(id);
    if (slideTrack('sliderTrack')) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                showSlide(parseInt(e.target.dataset.slide));
            });
        });

        // Auto Advance Slides Every 5 Seconds
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // 2. IntersectionObserver Scroll Animations
    const scrollItems = document.querySelectorAll('.scroll-reveal');
    if (scrollItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });

        scrollItems.forEach(item => observer.observe(item));
    }

    // 3. Modal Popup & In-Modal Character Counter
    const modal = document.getElementById('inquiryModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const selectedServiceInput = document.getElementById('selectedService');
    const modalMsgInput = document.getElementById('modalMessage');
    const modalCharCount = document.getElementById('modalCharCount');

    if (modal) {
        // Open Modal from Service Inquire Buttons
        document.querySelectorAll('.btn-service-inquire').forEach(btn => {
            btn.addEventListener('click', () => {
                const serviceName = btn.dataset.service;
                if (modalTitle) modalTitle.textContent = `Inquire About ${serviceName}`;
                if (selectedServiceInput) selectedServiceInput.value = serviceName;
                modal.classList.add('active');
            });
        });

        // Close Modal Controls
        const closeModal = () => modal.classList.remove('active');
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Modal Character Counter
        if (modalMsgInput && modalCharCount) {
            modalMsgInput.addEventListener('input', () => {
                modalCharCount.textContent = modalMsgInput.value.length;
            });
        }

        // Modal Form Validation and Submission
        const modalForm = document.getElementById('modalForm');
        if (modalForm) {
            modalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                const name = document.getElementById('modalName');
                const email = document.getElementById('modalEmail');
                const nameErr = document.getElementById('modalNameError');
                const emailErr = document.getElementById('modalEmailError');

                if (!name.value.trim()) { nameErr.style.display = 'block'; isValid = false; }
                else { nameErr.style.display = 'none'; }

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value.trim())) { emailErr.style.display = 'block'; isValid = false; }
                else { emailErr.style.display = 'none'; }

                if (isValid) {
                    alert(`Thank you! Your inquiry regarding ${selectedServiceInput.value || 'our legal services'} has been sent successfully.`);
                    modalForm.reset();
                    if (modalCharCount) modalCharCount.textContent = '0';
                    closeModal();
                }
            });
        }
    }


});