document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            const translateY = scrollPosition * 0.3;
            heroSection.style.backgroundPositionY = `-${translateY}px`;
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = 'var(--accent-color)';
    progressBar.style.zIndex = '2000';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.1s';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
    
    // Add floating elements animation
    const addFloatingAnimation = () => {
        const floatingElements = document.querySelectorAll('.hero-image img, .coach-image img');
        
        floatingElements.forEach((element, index) => {
            // Create a wrapper for the floating animation
            const wrapper = document.createElement('div');
            wrapper.className = 'floating-wrapper';
            wrapper.style.display = 'inline-block';
            wrapper.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
            
            // Replace the element with the wrapper containing the element
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        });
        
        // Add the floating animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0px);
                }
                100% {
                    transform: translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addFloatingAnimation();
    
    // Add scroll-triggered counter animation for feature cards
    const addCounterAnimation = () => {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            // Add a counter element to each card
            const counter = document.createElement('div');
            counter.className = 'feature-counter';
            counter.textContent = '0';
            counter.style.fontSize = '3rem';
            counter.style.fontWeight = 'bold';
            counter.style.color = 'var(--primary-color)';
            counter.style.marginBottom = '1rem';
            counter.style.opacity = '0.3';
            
            // Insert counter at the beginning of the card
            card.insertBefore(counter, card.firstChild);
            
            // Set up counter animation when card becomes visible
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetNumber = (index + 1) * 25;
                        let currentNumber = 0;
                        
                        const interval = setInterval(() => {
                            currentNumber += 1;
                            counter.textContent = currentNumber;
                            
                            if (currentNumber >= targetNumber) {
                                clearInterval(interval);
                                counter.textContent = `${targetNumber}+`;
                            }
                        }, 30);
                        
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });
            
            counterObserver.observe(card);
        });
    };
    
    addCounterAnimation();
    
    // Add typing animation for hero heading
    const addTypingAnimation = () => {
        const heroHeading = document.querySelector('.hero-content h1:first-child');
        const originalText = heroHeading.innerHTML;
        
        // Clear the heading text
        heroHeading.innerHTML = '';
        
        // Create a span for the cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.innerHTML = '|';
        cursor.style.animation = 'blink 1s step-end infinite';
        
        // Add the cursor style
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            @keyframes blink {
                from, to { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(cursorStyle);
        
        // Add the cursor to the heading
        heroHeading.appendChild(cursor);
        
        // Type the text character by character
        let charIndex = 0;
        const typeText = () => {
            if (charIndex < originalText.length) {
                // Insert the next character before the cursor
                heroHeading.insertBefore(
                    document.createTextNode(originalText.charAt(charIndex)),
                    cursor
                );
                charIndex++;
                setTimeout(typeText, 100);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
    };
    
    addTypingAnimation();
});