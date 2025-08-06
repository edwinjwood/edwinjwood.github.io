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
    
    // Function to check if we're on the About Me page and get current tab
    function getCurrentAboutMeTabIndex() {
        if (currentPath !== 'aboutme.html') return null;
        
        const activeTab = document.querySelector('.dot-indicators [role="tab"][aria-selected="true"]');
        if (!activeTab) return 0; // Default to first tab
        
        const allTabs = document.querySelectorAll('.dot-indicators [role="tab"]');
        return Array.from(allTabs).indexOf(activeTab);
    }
    
    // Function to check if we're on the LAYR services page and get current tab
    function getCurrentTabIndex() {
        if (currentPath !== 'layr.html') return null;
        
        const activeTab = document.querySelector('.tab-list [role="tab"][aria-selected="true"]');
        if (!activeTab) return 0; // Default to first tab
        
        const allTabs = document.querySelectorAll('.tab-list [role="tab"]');
        return Array.from(allTabs).indexOf(activeTab);
    }
    
    // Function to check if page swipe should be allowed
    function shouldAllowPageSwipe(direction) {
        // For About Me page, check current tab
        if (currentPath === 'aboutme.html') {
            const currentTabIndex = getCurrentAboutMeTabIndex();
            if (currentTabIndex === null) return true;
            
            // Only allow next page swipe if on last tab (index 3 = "The Survivor")
            if (direction === 'next') {
                return currentTabIndex === 3;
            }
            
            // Only allow previous page swipe if on first tab (index 0 = "The Builder") 
            if (direction === 'prev') {
                return currentTabIndex === 0;
            }
            
            return false;
        }
        
        // For LAYR services page, check current tab
        if (currentPath === 'layr.html') {
            const currentTabIndex = getCurrentTabIndex();
            if (currentTabIndex === null) return true;
            
            // Only allow next page swipe if on last tab (index 3 = "R")
            if (direction === 'next') {
                return currentTabIndex === 3;
            }
            
            // Only allow previous page swipe if on first tab (index 0 = "L") 
            if (direction === 'prev') {
                return currentTabIndex === 0;
            }
            
            return false;
        }
        
        // For other pages, always allow
        return true;
    }
    
    // Add swipe navigation (but not to services page tabs area)
    const body = document.body;
    
    body.addEventListener('touchstart', function(e) {
        // Don't interfere with tab navigation areas
        if (e.target.closest('.tab-list') || 
            e.target.closest('[role="tabpanel"]') ||
            e.target.closest('.dot-indicators')) {
            return;
        }
        
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });
    
    body.addEventListener('touchend', function(e) {
        // Don't interfere with tab navigation areas
        if (e.target.closest('.tab-list') || 
            e.target.closest('[role="tabpanel"]') ||
            e.target.closest('.dot-indicators')) {
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
            
            if (dx > 0 && currentIndex > 0 && shouldAllowPageSwipe('prev')) {
                // Swipe right - go to previous page (only if allowed)
                targetPage = pages[currentIndex - 1];
            } else if (dx < 0 && currentIndex < pages.length - 1 && shouldAllowPageSwipe('next')) {
                // Swipe left - go to next page (only if allowed)
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
