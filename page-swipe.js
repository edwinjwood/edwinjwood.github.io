// Cross-page swipe navigation
document.addEventListener('DOMContentLoaded', function() {
    // Define page navigation order
    const pages = [
        'index.html',
        'aboutme.html', 
        'layr.html',
        'contact.html'
    ];
    
    // Get current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = pages.indexOf(currentPath);
    
    if (currentIndex === -1) return; // Exit if not a main page
    
    let touchStartX = null;
    let touchEndX = null;
    let touchStartY = null;
    let touchEndY = null;
    
    // Add swipe navigation (but not to services page tabs area)
    const body = document.body;
    
    body.addEventListener('touchstart', function(e) {
        // Don't interfere with services page tab navigation
        if (e.target.closest('.tab-list') || e.target.closest('[role="tabpanel"]')) {
            return;
        }
        
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });
    
    body.addEventListener('touchend', function(e) {
        // Don't interfere with services page tab navigation
        if (e.target.closest('.tab-list') || e.target.closest('[role="tabpanel"]')) {
            return;
        }
        
        if (touchStartX === null || touchStartY === null) return;
        
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        
        // Only navigate if horizontal swipe is dominant and significant
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 80) {
            let targetPage = null;
            
            if (dx > 0 && currentIndex > 0) {
                // Swipe right - go to previous page
                targetPage = pages[currentIndex - 1];
            } else if (dx < 0 && currentIndex < pages.length - 1) {
                // Swipe left - go to next page  
                targetPage = pages[currentIndex + 1];
            }
            
            if (targetPage) {
                // Smooth fade transition
                const main = document.getElementById('main') || document.querySelector('main');
                if (main) {
                    main.style.transition = 'opacity 0.3s ease-in-out';
                    main.style.opacity = '0';
                    
                    setTimeout(() => {
                        window.location.href = targetPage;
                    }, 300);
                } else {
                    window.location.href = targetPage;
                }
            }
        }
        
        touchStartX = null;
        touchEndX = null;
        touchStartY = null;
        touchEndY = null;
    }, { passive: true });
});
