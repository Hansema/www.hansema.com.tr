// Browser optimization and performance enhancements
(function() {
    'use strict';

    // Browser detection
    function detectBrowser() {
        const userAgent = navigator.userAgent;
        const vendor = navigator.vendor || '';
        
        if (/chrome|crios/i.test(userAgent) && /google inc/i.test(vendor)) {
            return 'chrome';
        } else if (/firefox/i.test(userAgent)) {
            return 'firefox';
        } else if (/safari/i.test(userAgent) && /apple computer/i.test(vendor)) {
            return 'safari';
        } else if (/edg/i.test(userAgent)) {
            return 'edge';
        } else if (/opera|opr/i.test(userAgent)) {
            return 'opera';
        } else if (/yabrowser/i.test(userAgent)) {
            return 'yandex';
        } else {
            return 'unknown';
        }
    }

    // Mobile detection
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Apply browser-specific optimizations
    function applyBrowserOptimizations() {
        const browser = detectBrowser();
        const mobile = isMobile();
        
        switch(browser) {
            case 'safari':
                // Safari specific optimizations
                document.body.style.webkitFontSmoothing = 'antialiased';
                break;
            case 'opera':
            case 'opera gx':
                // Opera specific optimizations
                document.body.style.textRendering = 'optimizeLegibility';
                break;
            case 'yandex':
                // Yandex specific optimizations
                document.body.style.fontDisplay = 'swap';
                break;
        }
        
        if (mobile) {
            // Mobile optimizations
            document.body.classList.add('mobile-optimized');
            // Reduce animations on mobile
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        }
    }

    // Lazy loading for images
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Service Worker registration
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }

    // Performance monitoring
    function setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            });
        }
    }

    // Initialize optimizations
    function init() {
        applyBrowserOptimizations();
        setupLazyLoading();
        registerServiceWorker();
        setupPerformanceMonitoring();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
