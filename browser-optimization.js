// Tarayıcı Optimizasyon ve Uyumluluk Sistemi
class BrowserOptimizer {
    constructor() {
        this.browserInfo = this.detectBrowser();
        this.optimizations = this.getOptimizations();
    }

    // Tarayıcı tespiti
    detectBrowser() {
        const userAgent = navigator.userAgent;
        const browserData = {
            name: 'unknown',
            version: 'unknown',
            engine: 'unknown',
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
        };

        // Chrome
        if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
            browserData.name = 'chrome';
            browserData.version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'unknown';
        }
        // Firefox
        else if (/Firefox/.test(userAgent)) {
            browserData.name = 'firefox';
            browserData.version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'unknown';
        }
        // Safari
        else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
            browserData.name = 'safari';
            browserData.version = userAgent.match(/Version\/(\d+)/)?.[1] || 'unknown';
        }
        // Edge
        else if (/Edg/.test(userAgent)) {
            browserData.name = 'edge';
            browserData.version = userAgent.match(/Edg\/(\d+)/)?.[1] || 'unknown';
        }
        // Opera
        else if (/Opera/.test(userAgent)) {
            browserData.name = 'opera';
            browserData.version = userAgent.match(/Opera\/(\d+)/)?.[1] || 'unknown';
        }
        // Opera GX
        else if (/OPR/.test(userAgent)) {
            browserData.name = 'opera-gx';
            browserData.version = userAgent.match(/OPR\/(\d+)/)?.[1] || 'unknown';
        }
        // Yandex
        else if (/YaBrowser/.test(userAgent)) {
            browserData.name = 'yandex';
            browserData.version = userAgent.match(/YaBrowser\/(\d+)/)?.[1] || 'unknown';
        }

        return browserData;
    }

    // Tarayıcıya özel optimizasyonlar
    getOptimizations() {
        const optimizations = {
            chrome: {
                prefetch: true,
                lazyLoad: true,
                serviceWorker: true,
                compression: true,
                cache: true
            },
            firefox: {
                prefetch: true,
                lazyLoad: true,
                compression: true,
                cache: true
            },
            safari: {
                prefetch: false,
                lazyLoad: true,
                compression: false,
                cache: true,
                webkitOptimizations: true
            },
            edge: {
                prefetch: true,
                lazyLoad: true,
                compression: true,
                cache: true
            },
            opera: {
                prefetch: true,
                lazyLoad: true,
                compression: true,
                cache: true,
                turboMode: true
            },
            'opera-gx': {
                prefetch: true,
                lazyLoad: true,
                compression: true,
                cache: true,
                gxFeatures: true,
                ramOptimizer: true
            },
            yandex: {
                prefetch: true,
                lazyLoad: true,
                compression: true,
                cache: true,
                turboMode: true,
                russianOptimizations: true
            }
        };

        return optimizations[this.browserInfo.name] || optimizations.chrome;
    }

    // Optimizasyonları uygula
    applyOptimizations() {
        const opt = this.optimizations;
        
        // Service Worker kaydı
        if (opt.serviceWorker && 'serviceWorker' in navigator) {
            this.registerServiceWorker();
        }

        // Prefetch için linkler oluştur
        if (opt.prefetch) {
            this.createPrefetchLinks();
        }

        // Lazy loading için resimleri optimize et
        if (opt.lazyLoad) {
            this.enableLazyLoading();
        }

        // Cache optimizasyonu
        if (opt.cache) {
            this.enableCaching();
        }

        // Compression için meta tagler
        if (opt.compression) {
            this.enableCompression();
        }

        // Safari WebKit optimizasyonları
        if (opt.webkitOptimizations) {
            this.enableWebKitOptimizations();
        }

        // Opera GX özel optimizasyonları
        if (opt.gxFeatures) {
            this.enableOperaGXFeatures();
        }

        // Opera Turbo modu
        if (opt.turboMode) {
            this.enableTurboMode();
        }

        // Yandex optimizasyonları
        if (opt.russianOptimizations) {
            this.enableYandexOptimizations();
        }

        // Mobil optimizasyonları
        if (this.browserInfo.isMobile) {
            this.enableMobileOptimizations();
        }

        console.log(`${this.browserInfo.name} ${this.browserInfo.version} için optimizasyonlar uygulandı`);
    }

    // Service Worker kaydı
    registerServiceWorker() {
        const swCode = `
            const CACHE_NAME = 'hansema-v1';
            const urlsToCache = [
                '/',
                '/index.html',
                '/script.js',
                '/style.css'
            ];

            self.addEventListener('install', event => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            return cache.addAll(urlsToCache);
                        })
                );
            });

            self.addEventListener('fetch', event => {
                event.respondWith(
                    caches.match(event.request)
                        .then(response => {
                            return response || fetch(event.request);
                        })
                );
            });
        `;

        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(swUrl)
                .then(registration => console.log('Service Worker kaydedildi:', registration))
                .catch(error => console.error('Service Worker hatası:', error));
        }
    }

    // Prefetch linkleri oluştur
    createPrefetchLinks() {
        const importantPages = [
            '/contact',
            '/products',
            '/cart',
            '/payment'
        ];

        importantPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    }

    // Lazy loading etkinleştir
    enableLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
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
    }

    // Cache optimizasyonu
    enableCaching() {
        // Cache-Control header'ları için meta tagler
        const cacheMeta = document.createElement('meta');
        cacheMeta.httpEquiv = 'Cache-Control';
        cacheMeta.content = 'public, max-age=31536000';
        document.head.appendChild(cacheMeta);
    }

    // Compression aktif et
    enableCompression() {
        const compressionMeta = document.createElement('meta');
        compressionMeta.httpEquiv = 'Content-Encoding';
        compressionMeta.content = 'gzip';
        document.head.appendChild(compressionMeta);
    }

    // Safari WebKit optimizasyonları
    enableWebKitOptimizations() {
        // Safari için özel CSS optimizasyonları
        const style = document.createElement('style');
        style.textContent = `
            img {
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                transform: translateZ(0);
            }
            
            .product-card {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
        `;
        document.head.appendChild(style);
    }

    // Opera GX özellikleri
    enableOperaGXFeatures() {
        // Opera GX RAM optimizer
        const operaGXMeta = document.createElement('meta');
        operaGXMeta.name = 'opera-gx-features');
        operaGXMeta.content = 'ram-optimizer, battery-saver, free-vpn';
        document.head.appendChild(operaGXMeta);
    }

    // Turbo modu
    enableTurboMode() {
        const turboMeta = document.createElement('meta');
        turboMeta.name = 'turbo-mode';
        turboMeta.content = 'on';
        document.head.appendChild(turboMeta);
    }

    // Yandex optimizasyonları
    enableYandexOptimizations() {
        // Yandex Browser için özel optimizasyonlar
        const yandexMeta = document.createElement('meta');
        yandexMeta.name = 'yandex-verification';
        yandexMeta.content = 'hansema-verification-code';
        document.head.appendChild(yandexMeta);

        // Cyrillic destek
        const style = document.createElement('style');
        style.textContent = `
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
        `;
        document.head.appendChild(style);
    }

    // Mobil optimizasyonları
    enableMobileOptimizations() {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);

        // Touch optimizasyonları
        const style = document.createElement('style');
        style.textContent = `
            button {
                min-height: 44px;
                min-width: 44px;
                touch-action: manipulation;
            }
            
            .product-card {
                -webkit-tap-highlight-color: transparent;
                tap-highlight-color: transparent;
            }
        `;
        document.head.appendChild(style);
    }

    // Performans izleme
    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Sayfa Yükleme Performansı:', {
                    'Yükleme Süresi': perfData.loadEventEnd - perfData.navigationStart,
                    'DOM Hazır': perfData.domContentLoadedEventEnd - perfData.navigationStart,
                    'İlk Boyama': perfData.loadEventEnd - perfData.navigationStart
                });
            });
        }
    }
}

// Tarayıcı optimizasyonunu başlat
document.addEventListener('DOMContentLoaded', () => {
    const optimizer = new BrowserOptimizer();
    optimizer.applyOptimizations();
    optimizer.monitorPerformance();
});

// Tarayıcı bilgilerini global olarak erişilebilir yap
window.browserOptimizer = new BrowserOptimizer();
