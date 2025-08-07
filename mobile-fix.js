// Mobile device background fix
document.addEventListener('DOMContentLoaded', function() {
    // Detect if we're on a real mobile device (not dev tools)
    function isRealMobileDevice() {
        // Check for touch capability AND mobile user agent
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobileUA = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.screen.width <= 480;
        
        // Must have all three: touch, mobile UA, and small screen
        return hasTouch && isMobileUA && isSmallScreen;
    }
    
    // Apply mobile-specific background fixes
    if (isRealMobileDevice()) {
        const body = document.body;
        
        // Override background settings for real mobile devices
        body.style.backgroundAttachment = 'scroll';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center center';
        body.style.backgroundRepeat = 'no-repeat';
        
        // Add a class for additional mobile-specific styling
        body.classList.add('real-mobile-device');
        
        console.log('Real mobile device detected - applying background fixes');
    } else {
        console.log('Desktop or dev tools detected - keeping original background');
    }
});
