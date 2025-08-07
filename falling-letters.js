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

    // Set different fade delays for each letter
    const fadeSettings = [
        { delay: 0 },      // L
        { delay: 150 },    // A
        { delay: 300 },    // Y
        { delay: 450 }     // R
    ];

    function fadeOut() {
        if (isAnimating) return; // Prevent animation if already animating
        
        animationTriggered = true;
        isAnimating = true;
        
        // Start letter fade out animations with staggered delays
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.remove('fade-in');
                letter.classList.add('fade-out');
            }, fadeSettings[index].delay);
        });

        // Hide the title page after all letters have faded
        setTimeout(() => {
            titlePage.style.display = 'none';
            isAnimating = false; // Animation complete
        }, 1200); // Allow time for all letters to fade
    }

    function fadeIn() {
        if (isAnimating) return; // Prevent animation if already animating
        
        animationTriggered = false;
        isAnimating = true;
        titlePage.style.display = 'flex';
        
        // Start letters as faded out
        letters.forEach((letter) => {
            letter.classList.remove('fade-in');
            letter.classList.add('fade-out');
        });
        
        // Fade letters back in with staggered delays (reverse order for variety)
        setTimeout(() => {
            letters.forEach((letter, index) => {
                const reverseIndex = letters.length - 1 - index;
                setTimeout(() => {
                    letter.classList.remove('fade-out');
                    letter.classList.add('fade-in');
                }, fadeSettings[reverseIndex].delay);
            });
            isAnimating = false; // Animation complete
        }, 100); // Small delay before starting fade in
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
        
        // For initial page loads, be more lenient with velocity requirements
        const isInitialVisit = !animationTriggered && currentScrollY === 0;
        const minVelocity = isInitialVisit ? 5 : (isMobile ? 15 : 10); // Much lower threshold for first scroll
        
        // Skip velocity check if we're close to trigger point (make it more responsive)
        const isNearTrigger = !animationTriggered && contentRect.top <= viewportHeight + (triggerDistance * 2);
        if (!isNearTrigger && scrollVelocity < minVelocity) {
            lastScrollY = currentScrollY;
            return;
        }
        
        // Scrolling down - fade out when content comes into view
        if (scrollDirection === 'down' && !animationTriggered) {
            if (contentRect.top <= viewportHeight + triggerDistance) {
                fadeOut();
            }
        }
        // Scrolling up - fade in when we're near the top
        else if (scrollDirection === 'up' && animationTriggered) {
            if (currentScrollY < topThreshold) {
                fadeIn();
            }
        }
        
        lastScrollY = currentScrollY;
    }

    // Initial calculation and state setup
    // No longer need calculateConvergencePoints for fade effect
    
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
            letters.forEach((letter) => {
                letter.classList.remove('fade-in');
                letter.classList.add('fade-out');
            });
        } else {
            // We're at the top, ensure title is visible
            animationTriggered = false;
            titlePage.style.display = 'flex';
            letters.forEach((letter) => {
                letter.classList.add('fade-in');
                letter.classList.remove('fade-out');
            });
        }
    }
    
    // Initialize the correct state based on scroll position
    initializeState();

    // Recalculate on resize - not needed for fade effect but kept for future use
    // window.addEventListener('resize', calculateConvergencePoints);

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
