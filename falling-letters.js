// Pulsar Blip Letters Animation
document.addEventListener('DOMContentLoaded', function() {
    const letters = document.querySelectorAll('.letter');
    const contentSection = document.querySelector('.content-reveal');
    const titlePage = document.querySelector('.title-page');
    const companyTitle = document.querySelector('.company-title');
    let animationTriggered = false;
    let lastScrollY = window.scrollY;
    let scrollTimeout = null;
    let scrollDirection = null;
    let scrollVelocity = 0;
    let isAnimating = false;

    // Set different blip durations for each letter
    const blipSettings = [
        { duration: '0.8s', delay: 0 },      // L
        { duration: '0.8s', delay: 100 },    // A
        { duration: '0.8s', delay: 200 },    // Y
        { duration: '0.8s', delay: 300 }     // R
    ];

    // Calculate convergence point (center of the title)
    function calculateConvergencePoints() {
        const titleRect = companyTitle.getBoundingClientRect();
        const centerX = titleRect.width / 2;
        const centerY = titleRect.height / 2;

        letters.forEach((letter, index) => {
            const letterRect = letter.getBoundingClientRect();
            const titleOffsetRect = companyTitle.getBoundingClientRect();
            
            // Calculate relative position of letter within title
            const letterCenterX = letterRect.left - titleOffsetRect.left + letterRect.width / 2;
            const letterCenterY = letterRect.top - titleOffsetRect.top + letterRect.height / 2;
            
            // Calculate distance to center
            const deltaX = centerX - letterCenterX;
            const deltaY = centerY - letterCenterY;
            
            // Set CSS custom properties for convergence
            letter.style.setProperty('--converge-x', `${deltaX}px`);
            letter.style.setProperty('--converge-y', `${deltaY}px`);
            letter.style.setProperty('--blip-duration', blipSettings[index].duration);
        });
    }

    function blipOut() {
        if (isAnimating) return; // Prevent animation if already animating
        
        animationTriggered = true;
        isAnimating = true;
        calculateConvergencePoints();
        
        // Start letter convergence animations with staggered delays
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.remove('blip-in');
                letter.classList.add('blip-out');
            }, blipSettings[index].delay);
        });

        // Trigger pulsar effect after all letters have converged
        setTimeout(() => {
            companyTitle.classList.add('pulsar');
        }, 800);

        // Hide the title page after pulsar effect completes
        setTimeout(() => {
            titlePage.style.display = 'none';
            companyTitle.classList.remove('pulsar');
            isAnimating = false; // Animation complete
        }, 1800);
    }

    function blipIn() {
        if (isAnimating) return; // Prevent animation if already animating
        
        animationTriggered = false;
        isAnimating = true;
        titlePage.style.display = 'flex';
        calculateConvergencePoints();
        
        // Reset letters to converged state (invisible at center)
        letters.forEach((letter) => {
            letter.classList.remove('blip-in');
            letter.classList.add('blip-out');
            letter.style.opacity = '0';
            letter.style.transform = `translateX(${letter.style.getPropertyValue('--converge-x')}) translateY(${letter.style.getPropertyValue('--converge-y')}) scale(0)`;
        });
        
        // First show the converged point
        companyTitle.classList.add('converged-point');
        
        // After showing the converged point, explode letters out with staggered delays (reverse order)
        setTimeout(() => {
            companyTitle.classList.remove('converged-point');
            letters.forEach((letter, index) => {
                const reverseIndex = letters.length - 1 - index;
                setTimeout(() => {
                    letter.classList.remove('blip-out');
                    letter.classList.add('blip-in');
                    letter.style.opacity = '';
                    letter.style.transform = '';
                }, blipSettings[reverseIndex].delay);
            });
            isAnimating = false; // Animation complete
        }, 300); // Show converged point for 300ms then explode
    }

    function checkScroll() {
        const currentScrollY = window.scrollY;
        const contentRect = contentSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll velocity and direction
        const scrollDelta = currentScrollY - lastScrollY;
        scrollVelocity = Math.abs(scrollDelta);
        
        // Determine scroll direction with momentum consideration
        if (scrollDelta > 5) {
            scrollDirection = 'down';
        } else if (scrollDelta < -5) {
            scrollDirection = 'up';
        }
        // If scroll delta is small, keep previous direction to handle momentum
        
        // Skip if we're currently animating
        if (isAnimating) {
            lastScrollY = currentScrollY;
            return;
        }
        
        // More robust mobile detection and thresholds
        const isMobile = viewportHeight < 700 || window.innerWidth < 768;
        const triggerDistance = isMobile ? 100 : 150; // Reduced for faster trigger
        const topThreshold = isMobile ? 200 : 150;
        
        // Require minimum scroll velocity to prevent jitter
        const minVelocity = isMobile ? 15 : 10;
        if (scrollVelocity < minVelocity) {
            lastScrollY = currentScrollY;
            return;
        }
        
        // Scrolling down - blip out when content comes into view
        if (scrollDirection === 'down' && !animationTriggered) {
            if (contentRect.top <= viewportHeight + triggerDistance) {
                blipOut();
            }
        }
        // Scrolling up - blip in when we're near the top
        else if (scrollDirection === 'up' && animationTriggered) {
            if (currentScrollY < topThreshold) {
                blipIn();
            }
        }
        
        lastScrollY = currentScrollY;
    }

    // Initial calculation and state setup
    calculateConvergencePoints();
    
    // Check initial scroll position to set correct state
    function initializeState() {
        const currentScrollY = window.scrollY;
        const contentRect = contentSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isMobile = viewportHeight < 700 || window.innerWidth < 768;
        const topThreshold = isMobile ? 200 : 150;
        
        // If we're scrolled past the top threshold, start with title hidden
        if (currentScrollY >= topThreshold) {
            animationTriggered = true;
            titlePage.style.display = 'none';
            companyTitle.classList.remove('pulsar');
            letters.forEach((letter) => {
                letter.classList.remove('blip-in');
                letter.classList.add('blip-out');
            });
        } else {
            // We're at the top, ensure title is visible
            animationTriggered = false;
            titlePage.style.display = 'flex';
            letters.forEach((letter) => {
                letter.classList.add('blip-in');
                letter.classList.remove('blip-out');
            });
        }
    }
    
    // Initialize the correct state based on scroll position
    initializeState();

    // Recalculate on resize
    window.addEventListener('resize', calculateConvergencePoints);

    // Debounced scroll handler for better mobile performance
    function debouncedCheckScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Immediate check for responsive feel
        checkScroll();
        
        // Debounced check to prevent rapid firing
        scrollTimeout = setTimeout(() => {
            checkScroll();
        }, 50);
    }

    // Check scroll position with debouncing
    window.addEventListener('scroll', debouncedCheckScroll, { passive: true });
    
    // Remove touchmove listener as it can cause conflicts
    // window.addEventListener('touchmove', checkScroll, { passive: true });
    
    // Initial check in case pillars are already in view
    checkScroll();
});
