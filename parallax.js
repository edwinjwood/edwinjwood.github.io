// Simple parallax effect for floating through space feel
document.addEventListener('DOMContentLoaded', function() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2; // Subtle parallax rate
        
        // Apply parallax to the body background
        document.body.style.backgroundPosition = `center ${rate}px`;
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only apply on larger screens where background-attachment: fixed works better
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick, { passive: true });
    }
});
