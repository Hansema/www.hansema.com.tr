// Google Authentication System
(function() {
    'use strict';

    // User session storage
    let currentUser = null;

    // Initialize auth system
    function initAuth() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('hansema_user');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateUserUI();
        }
    }

    // Save user session
    function saveUserSession(user) {
        currentUser = user;
        localStorage.setItem('hansema_user', JSON.stringify(user));
        updateUserUI();
    }

    // Update UI based on user state
    function updateUserUI() {
        const userButton = document.querySelector('button[onclick="toggleAuth()"]');
        if (userButton && currentUser) {
            userButton.innerHTML = `
                <div class="flex items-center space-x-2">
                    <img src="${currentUser.picture}" alt="${currentUser.name}" class="w-8 h-8 rounded-full">
                    <span class="text-gray-300">${currentUser.name}</span>
                    <i class="fas fa-chevron-down text-gray-300"></i>
                </div>
            `;
            userButton.setAttribute('onclick', 'showUserMenu()');
        }
    }

    // Show user menu
    function showUserMenu() {
        // Create dropdown menu
        const menu = document.createElement('div');
        menu.className = 'absolute right-4 top-16 bg-white rounded-lg shadow-lg p-4 z-50';
        menu.innerHTML = `
            <div class="flex items-center space-x-3 mb-4 pb-4 border-b">
                <img src="${currentUser.picture}" alt="${currentUser.name}" class="w-10 h-10 rounded-full">
                <div>
                    <p class="font-bold text-black">${currentUser.name}</p>
                    <p class="text-sm text-gray-600">${currentUser.email}</p>
                </div>
            </div>
            <div class="space-y-2">
                <button onclick="showProfile()" class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-black">
                    <i class="fas fa-user mr-2"></i>Profilim
                </button>
                <button onclick="showOrders()" class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-black">
                    <i class="fas fa-shopping-bag mr-2"></i>Sipariþlerim
                </button>
                <button onclick="showSettings()" class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-black">
                    <i class="fas fa-cog mr-2"></i>Ayarlar
                </button>
                <button onclick="logout()" class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600">
                    <i class="fas fa-sign-out-alt mr-2"></i>Çýkýþ Yap
                </button>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', closeUserMenu);
        }, 100);
    }

    // Close user menu
    function closeUserMenu(e) {
        const menu = document.querySelector('.absolute.right-4.top-16');
        if (menu && !menu.contains(e.target)) {
            menu.remove();
            document.removeEventListener('click', closeUserMenu);
        }
    }

    // Login functions
    window.loginWithGoogle = function() {
        // Simulate Google login
        const user = {
            id: 'google_' + Date.now(),
            name: 'Google Kullanýcýsý',
            email: 'kullanici@gmail.com',
            picture: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=ffffff',
            provider: 'google',
            loginTime: new Date().toISOString()
        };
        
        saveUserSession(user);
        showSuccess('Google ile giriþ yapýldý!');
        toggleAuth();
    };

    window.loginWithApple = function() {
        // Simulate Apple login
        const user = {
            id: 'apple_' + Date.now(),
            name: 'Apple Kullanýcýsý',
            email: 'user@icloud.com',
            picture: 'https://ui-avatars.com/api/?name=Apple+User&background=000000&color=ffffff',
            provider: 'apple',
            loginTime: new Date().toISOString()
        };
        
        saveUserSession(user);
        showSuccess('Apple ile giriþ yapýldý!');
        toggleAuth();
    };

    // Registration function
    window.showRegistration = function() {
        const modal = document.getElementById('authModal');
        const modalContent = modal.querySelector('.max-w-md');
        
        modalContent.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Kayýt Ol</h3>
                <button onclick="toggleAuth()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <form id="registrationForm" class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="Ad" required class="luxury-input w-full px-4 py-3 rounded-lg">
                    <input type="text" name="lastName" placeholder="Soyad" required class="luxury-input w-full px-4 py-3 rounded-lg">
                </div>
                <input type="email" name="email" placeholder="E-posta" required class="luxury-input w-full px-4 py-3 rounded-lg">
                <input type="password" name="password" placeholder="Þifre" required class="luxury-input w-full px-4 py-3 rounded-lg">
                <input type="password" name="confirmPassword" placeholder="Þifre Tekrar" required class="luxury-input w-full px-4 py-3 rounded-lg">
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="terms" required class="w-4 h-4">
                    <label for="terms" class="text-sm text-gray-600">
                        <a href="#" onclick="showTerms()" class="text-black hover:underline">Kullaným Koþullarý</a>'ný kabul ediyorum
                    </label>
                </div>
                <button type="submit" class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                    KAYIT OL
                </button>
            </form>
            <div class="mt-6 space-y-4">
                <div class="text-center text-sm text-gray-600">veya</div>
                <button onclick="loginWithGoogle()" class="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.75 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google ile Kayýt Ol</span>
                </button>
                <button onclick="loginWithApple()" class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.8-.54-2.53-1.47-.73-.93-1.13-2.14-1.13-3.47 0-1.33.4-2.54 1.13-3.47.73-.93 1.19-2.14 2.53-1.47 1.34.67 2.22 1.23 3.05 2.47.83 1.24 1.3 2.67 1.3 4.19 0 1.52-.47 2.95-1.3 4.19-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.8-.54-2.53-1.47zM12 2.5c1.33 0 2.52.4 3.47 1.13.95.73 2.14 1.13 3.47 1.13 1.33 0 2.54-.4 3.47-1.13.95-.73 1.13-2.14 1.13-3.47 0-1.33-.4-2.52-1.13-3.47-.95-.95-2.14-1.13-3.47-1.13-1.33 0-2.52.4-3.47 1.13-.95.73-1.13 2.14-1.13 3.47 0 1.33.4 2.52 1.13 3.47.95.73 2.14 1.13 3.47 1.13z"/>
                    </svg>
                    <span>Apple ile Kayýt Ol</span>
                </button>
            </div>
            <div class="mt-6 text-center text-sm text-gray-600">
                Zaten hesabýnýz var mý? <a href="#" onclick="showLogin()" class="text-black hover:underline">Giriþ Yap</a>
            </div>
        `;
        
        // Add form handler
        document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
    };

    // Show login form
    window.showLogin = function() {
        const modal = document.getElementById('authModal');
        const modalContent = modal.querySelector('.max-w-md');
        
        modalContent.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">Giriþ Yap</h3>
                <button onclick="toggleAuth()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <form id="loginForm" class="space-y-4">
                <input type="email" name="email" placeholder="E-posta" required class="luxury-input w-full px-4 py-3 rounded-lg">
                <input type="password" name="password" placeholder="Þifre" required class="luxury-input w-full px-4 py-3 rounded-lg">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <input type="checkbox" id="remember" class="w-4 h-4">
                        <label for="remember" class="text-sm text-gray-600">Beni hatýrla</label>
                    </div>
                    <a href="#" onclick="showForgotPassword()" class="text-sm text-black hover:underline">Þifremi Unuttum</a>
                </div>
                <button type="submit" class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                    GÝRÞÞ YAP
                </button>
            </form>
            <div class="mt-6 space-y-4">
                <div class="text-center text-sm text-gray-600">veya</div>
                <button onclick="loginWithGoogle()" class="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.75 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google ile Giriþ Yap</span>
                </button>
                <button onclick="loginWithApple()" class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center space-x-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.8-.54-2.53-1.47-.73-.93-1.13-2.14-1.13-3.47 0-1.33.4-2.54 1.13-3.47.73-.93 1.19-2.14 2.53-1.47 1.34.67 2.22 1.23 3.05 2.47.83 1.24 1.3 2.67 1.3 4.19 0 1.52-.47 2.95-1.3 4.19-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.8-.54-2.53-1.47zM12 2.5c1.33 0 2.52.4 3.47 1.13.95.73 2.14 1.13 3.47 1.13 1.33 0 2.54-.4 3.47-1.13.95-.73 1.13-2.14 1.13-3.47 0-1.33-.4-2.52-1.13-3.47-.95-.95-2.14-1.13-3.47-1.13-1.33 0-2.52.4-3.47 1.13-.95.73-1.13 2.14-1.13 3.47 0 1.33.4 2.52 1.13 3.47.95.73 2.14 1.13 3.47 1.13z"/>
                    </svg>
                    <span>Apple ile Giriþ Yap</span>
                </button>
            </div>
            <div class="text-center text-sm text-gray-600">
                Hesabýnýz yok mu? <a href="#" onclick="showRegistration()" class="text-black hover:underline">Kayýt Ol</a>
            </div>
        `;
        
        // Add form handler
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    };

    // Handle registration
    function handleRegistration(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Simulate registration
        const user = {
            id: 'user_' + Date.now(),
            name: formData.get('firstName') + ' ' + formData.get('lastName'),
            email: formData.get('email'),
            picture: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.get('firstName') + '+' + formData.get('lastName')) + '&background=000000&color=ffffff',
            provider: 'email',
            loginTime: new Date().toISOString()
        };
        
        saveUserSession(user);
        showSuccess('Kayýt baþarýlý! Hoþ geldiniz.');
        toggleAuth();
    }

    // Handle login
    function handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Simulate login
        const user = {
            id: 'user_' + Date.now(),
            name: 'Test Kullanýcý',
            email: formData.get('email'),
            picture: 'https://ui-avatars.com/api/?name=Test+User&background=000000&color=ffffff',
            provider: 'email',
            loginTime: new Date().toISOString()
        };
        
        saveUserSession(user);
        showSuccess('Giriþ baþarýlý! Hoþ geldiniz.');
        toggleAuth();
    }

    // Logout function
    window.logout = function() {
        currentUser = null;
        localStorage.removeItem('hansema_user');
        
        // Reset UI
        const userButton = document.querySelector('button[onclick="showUserMenu()"]');
        if (userButton) {
            userButton.innerHTML = '<i class="fas fa-user text-xl"></i>';
            userButton.setAttribute('onclick', 'toggleAuth()');
        }
        
        showSuccess('Çýkýþ yapýldý.');
    };

    // Profile functions
    window.showProfile = function() {
        showSuccess('Profil sayfasý gösteriliyor...');
    };

    window.showOrders = function() {
        showSuccess('Sipariþlerim sayfasý gösteriliyor...');
    };

    window.showSettings = function() {
        showSuccess('Ayarlar sayfasý gösteriliyor...');
    };

    window.showForgotPassword = function() {
        showSuccess('Þifre yenileme linki gönderildi!');
    };

    // Check if user is logged in
    window.isLoggedIn = function() {
        return currentUser !== null;
    };

    // Get current user
    window.getCurrentUser = function() {
        return currentUser;
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        initAuth();
    }
})();
