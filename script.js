// Giyim ürünleri verisi
let products = [
    {
        id: 1,
        name: "Siyah İpek Elbise",
        price: 2899.99,
        image: "https://picsum.photos/seed/dress1/400/500.jpg",
        description: "Zarif ipek elbise, özel tasarım",
        category: "dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Siyah", "Bordo"],
        isNew: true
    },
    {
        id: 2,
        name: "Beyaz Gömlek",
        price: 899.99,
        image: "https://picsum.photos/seed/shirt1/400/500.jpg",
        description: "Klasik pamuk gömlek, slim fit",
        category: "shirts",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Beyaz", "Mavi", "Gri"],
        isNew: false
    },
    {
        id: 3,
        name: "Siyah Pantolon",
        price: 1599.99,
        image: "https://picsum.photos/seed/pants1/400/500.jpg",
        description: "Modern kesim siyah pantolon",
        category: "pants",
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Siyah", "Lacivert"],
        isNew: false
    },
    {
        id: 4,
        name: "Deri Ceket",
        price: 4299.99,
        image: "https://picsum.photos/seed/jacket1/400/500.jpg",
        description: "Geri deri ceket, kaliteli işçilik",
        category: "jackets",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Siyah", "Kahve"],
        isNew: true,
        discount: 20
    },
    {
        id: 5,
        name: "Topuklu Ayakkabı",
        price: 1899.99,
        image: "https://picsum.photos/seed/shoes1/400/500.jpg",
        description: "Şık topuklu ayakkabı, konforlu",
        category: "shoes",
        sizes: ["36", "37", "38", "39", "40", "41"],
        colors: ["Siyah", "Nude", "Kırmızı"],
        isNew: false
    },
    {
        id: 6,
        name: "Deri Çanta",
        price: 3299.99,
        image: "https://picsum.photos/seed/bag1/400/500.jpg",
        description: "El yapımı deri çanta, geniş iç hacim",
        category: "bags",
        sizes: ["One Size"],
        colors: ["Siyah", "Kahve", "Bej"],
        isNew: true
    },
    {
        id: 7,
        name: "Midi Boy Elbise",
        price: 2199.99,
        image: "https://picsum.photos/seed/dress2/400/500.jpg",
        description: "Yazlık midi elbise, çiçek desenli",
        category: "dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Pembe", "Mavi", "Yeşil"],
        isNew: false,
        discount: 30
    },
    {
        id: 8,
        name: "Oxford Gömlek",
        price: 1199.99,
        image: "https://picsum.photos/seed/shirt2/400/500.jpg",
        description: "Oxford kumaş gömlek, casual stil",
        category: "shirts",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Beyaz", "Mavi", "Gri"],
        isNew: false
    },
    {
        id: 9,
        name: "Kot Pantolon",
        price: 999.99,
        image: "https://picsum.photos/seed/pants2/400/500.jpg",
        description: "Slim fit kot pantolon, mavi",
        category: "pants",
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Mavi", "Siyah"],
        isNew: false
    },
    {
        id: 10,
        name: "Trençkot",
        price: 2499.99,
        image: "https://picsum.photos/seed/jacket2/400/500.jpg",
        description: "Klasik trençkot, zamansız tasarım",
        category: "jackets",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Bej", "Siyah"],
        isNew: true
    },
    {
        id: 11,
        name: "Sneaker",
        price: 799.99,
        image: "https://picsum.photos/seed/shoes2/400/500.jpg",
        description: "Konforlu sneaker, günlük kullanım",
        category: "shoes",
        sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
        colors: ["Beyaz", "Siyah", "Gri"],
        isNew: false,
        discount: 25
    },
    {
        id: 12,
        name: "Sırt Çantası",
        price: 699.99,
        image: "https://picsum.photos/seed/bag2/400/500.jpg",
        description: "Pratik sırt çantası, çok cepli",
        category: "bags",
        sizes: ["One Size"],
        colors: ["Siyah", "Gri", "Mavi"],
        isNew: false
    }
];

let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    
    // Payment form validation
    document.getElementById('paymentForm').addEventListener('submit', handlePayment);
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    
    // Card number formatting
    document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
    document.getElementById('cardExpiry').addEventListener('input', formatCardExpiry);
    document.getElementById('cardCVV').addEventListener('input', formatCardCVV);
});

// Render products
function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    let filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card rounded-lg overflow-hidden';
        
        const discountedPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2);
        
        productCard.innerHTML = `
            <div class="relative">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover">
                </div>
                ${product.isNew ? '<div class="absolute top-4 left-4 premium-badge px-3 py-1 rounded-full text-xs font-bold">YENİ</div>' : ''}
                ${product.discount ? `<div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">-%${product.discount}</div>` : ''}
            </div>
            <div class="p-6">
                <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                
                <div class="mb-4">
                    <p class="text-xs text-gray-500 mb-2">Beden:</p>
                    <div class="flex flex-wrap gap-2">
                        ${product.sizes.map(size => `<button class="size-btn px-3 py-1 rounded text-xs">${size}</button>`).join('')}
                    </div>
                </div>
                
                <div class="flex items-center justify-between mb-4">
                    <div>
                        ${product.discount ? `<span class="text-gray-400 line-through text-sm mr-2">₺${product.price.toFixed(2)}</span>` : ''}
                        <span class="text-2xl font-bold gold-accent">₺${discountedPrice}</span>
                    </div>
                </div>
                
                <button onclick="addToCart(${product.id})" class="w-full dark-gray text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                    <i class="fas fa-shopping-bag mr-2"></i>SEPETE EKLE
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    renderCart();
    showSuccessMessage('Ürün sepete eklendi!');
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Sepetiniz boş</p>';
        cartTotal.textContent = '₺0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'flex items-center justify-between bg-gray-50 p-4 rounded-lg';
        cartItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">₺${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full transition">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full transition">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                <span class="font-semibold">₺${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 transition">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `₺${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
            updateCartCount();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartCount();
}

// Show products section
function showProducts() {
    hideAllSections();
    document.getElementById('productsSection').classList.remove('hidden');
}

// Show cart
function toggleCart() {
    const cartSection = document.getElementById('cartSection');
    const paymentSection = document.getElementById('paymentSection');
    const contactSection = document.getElementById('contactSection');
    const productsSection = document.getElementById('productsSection');
    
    if (cartSection.classList.contains('hidden')) {
        hideAllSections();
        cartSection.classList.remove('hidden');
        renderCart();
    } else {
        cartSection.classList.add('hidden');
        productsSection.classList.remove('hidden');
    }
}

// Show payment
function showPayment() {
    if (cart.length === 0) {
        showSuccessMessage('Sepetiniz boş!');
        return;
    }
    
    hideAllSections();
    document.getElementById('paymentSection').classList.remove('hidden');
    renderOrderSummary();
}

// Render order summary
function renderOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const paymentTotal = document.getElementById('paymentTotal');
    
    orderSummary.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'flex justify-between text-sm';
        orderItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₺${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummary.appendChild(orderItem);
        total += item.price * item.quantity;
    });
    
    paymentTotal.textContent = `₺${total.toFixed(2)}`;
}

// Show contact
function showContact() {
    hideAllSections();
    document.getElementById('contactSection').classList.remove('hidden');
}


// Filter by category
function filterByCategory(category) {
    // Update active category button
    document.querySelectorAll('.category-pill').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Filter products based on category
    let filteredProducts = products;
    if (category === 'new') {
        filteredProducts = products.filter(p => p.isNew);
    } else if (category === 'discount') {
        filteredProducts = products.filter(p => p.discount);
    } else if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    // Render filtered products with animation
    const productsGrid = document.getElementById('productsGrid');
    
    // Fade out current products
    productsGrid.style.transition = 'all 0.3s ease';
    productsGrid.style.opacity = '0';
    productsGrid.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        productsGrid.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card rounded-lg overflow-hidden';
            productCard.style.opacity = '0';
            productCard.style.transform = 'translateY(20px)';
            
            const discountedPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2);
            
            productCard.innerHTML = `
                <div class="relative">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover">
                    </div>
                    ${product.isNew ? '<div class="absolute top-4 left-4 premium-badge px-3 py-1 rounded-full text-xs font-bold">YENİ</div>' : ''}
                    ${product.discount ? `<div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">-%${product.discount}</div>` : ''}
                </div>
                <div class="p-6">
                    <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                    
                    <div class="mb-4">
                        <p class="text-xs text-gray-500 mb-2">Beden:</p>
                        <div class="flex flex-wrap gap-2">
                            ${product.sizes.map(size => `<button class="size-btn px-3 py-1 rounded text-xs">${size}</button>`).join('')}
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            ${product.discount ? `<span class="text-gray-400 line-through text-sm mr-2">₺${product.price.toFixed(2)}</span>` : ''}
                            <span class="text-2xl font-bold text-black">₺${discountedPrice}</span>
                        </div>
                    </div>
                    
                    <button onclick="showProductDetail(${JSON.stringify(product).replace(/"/g, '&quot;')})" class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                        <i class="fas fa-shopping-bag mr-2"></i>SEPETE EKLE
                    </button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
        
        // Update section title
        const titles = {
            'all': 'Premium Koleksiyon',
            'dresses': 'Elbiseler',
            'shirts': 'Gömlekler',
            'pants': 'Pantolonlar',
            'jackets': 'Ceketler',
            'shoes': 'Ayakkabılar',
            'bags': 'Çantalar',
            'women': 'Kadın Giyim',
            'men': 'Erkek Giyim',
            'accessories': 'Aksesuarlar',
            'new': 'Yeni Sezon',
            'discount': 'İndirimli Ürünler'
        };
        
        document.querySelector('#productsSection h2').textContent = titles[category] || 'Ürünler';
        
        // Show products section
        hideAllSections();
        document.getElementById('productsSection').classList.remove('hidden');
        
        // Animate products appearing
        setTimeout(() => {
            const cards = productsGrid.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 100);
    }, 300);
}

// Hide all sections
function hideAllSections() {
    document.getElementById('productsSection').classList.add('hidden');
    document.getElementById('cartSection').classList.add('hidden');
    document.getElementById('paymentSection').classList.add('hidden');
    document.getElementById('contactSection').classList.add('hidden');
}

// Show specific section
function showSection(section) {
    hideAllSections();
    document.getElementById(section + 'Section').classList.remove('hidden');
}

// Show FAQ
function showFAQ() {
    hideAllSections();
    const faqContent = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-8">Sıkça Sorulan Sorular</h2>
            <div class="space-y-6">
                <div class="border-b pb-4">
                    <h3 class="font-bold text-lg mb-2">Siparişim ne zaman kargoya verilir?</h3>
                    <p class="text-gray-600">Siparişleriniz 1-3 iş günü içinde kargoya verilir.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-bold text-lg mb-2">Kargo ücreti ne kadar?</h3>
                    <p class="text-gray-600">500 TL ve üzeri alışverişlerde kargo ücretsizdir.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-bold text-lg mb-2">Ürünleri iade edebilir miyim?</h3>
                    <p class="text-gray-600">30 gün içinde koşulsuz iade hakkınız bulunmaktadır.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = faqContent;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show Returns
function showReturns() {
    hideAllSections();
    const returnsContent = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-8">İade ve Değişim</h2>
            <div class="space-y-6">
                <div>
                    <h3 class="font-bold text-lg mb-2">İade Koşulları</h3>
                    <ul class="list-disc list-inside text-gray-600 space-y-2">
                        <li>Ürünler 30 gün içinde iade edilebilir</li>
                        <li>Ürünlerin kullanılmamış olması gerekir</li>
                        <li>Etiketleri üzerinde olmalıdır</li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">İade Süreci</h3>
                    <p class="text-gray-600">Müşteri hizmetlerimizi arayarak iade kodu alabilirsiniz.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = returnsContent;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show Shipping
function showShipping() {
    hideAllSections();
    const shippingContent = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-8">Kargo ve Teslimat</h2>
            <div class="space-y-6">
                <div>
                    <h3 class="font-bold text-lg mb-2">Teslimat Süresi</h3>
                    <p class="text-gray-600">Şehir içi 1-2 gün, şehir dışı 2-4 gün içinde teslimat.</p>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">Kargo Firmaları</h3>
                    <p class="text-gray-600">Aras Kargo, Yurtiçi Kargo ve MNG Kargo ile gönderim yapılmaktadır.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = shippingContent;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show About
function showAbout() {
    hideAllSections();
    const aboutContent = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-8">Hakkımızda</h2>
            <div class="space-y-6">
                <p class="text-gray-600">HANSEMA olarak 2010 yılından bu yana premium giyim sektöründe hizmet vermekteyiz.</p>
                <p class="text-gray-600">Kaliteli ürünler, müşteri memnuniyeti ve zamansız tasarım ilkelerimizle öne çıkıyoruz.</p>
                <div class="grid md:grid-cols-3 gap-6 mt-8">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-black mb-2">14+</div>
                        <p class="text-gray-600">Yıllık Deneyim</p>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-black mb-2">50K+</div>
                        <p class="text-gray-600">Mutlu Müşteri</p>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-black mb-2">100+</div>
                        <p class="text-gray-600">Ürün Çeşidi</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = aboutContent;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show Privacy
function showPrivacy() {
    hideAllSections();
    const privacyContent = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-8">Gizlilik Politikası</h2>
            <div class="space-y-6">
                <div>
                    <h3 class="font-bold text-lg mb-2">Kişisel Verilerin Korunması</h3>
                    <p class="text-gray-600">Kişisel verileriniz KVKK kapsamında korunmaktadır.</p>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">Veri Kullanımı</h3>
                    <p class="text-gray-600">Verileriniz sadece sipariş işlemleri ve müşteri hizmetleri için kullanılır.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = privacyContent;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show Terms
function showTerms() {
    hideAllSections();
    const termsContent = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-8">Kullanım Koşulları</h2>
            <div class="space-y-6">
                <div>
                    <h3 class="font-bold text-lg mb-2">Sözleşme</h3>
                    <p class="text-gray-600">Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.</p>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2">Sorumluluk</h3>
                    <p class="text-gray-600">Ürünlerin kullanımından kullanıcı sorumludur.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = termsContent;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Toggle Search Modal
function toggleSearch() {
    const modal = document.getElementById('searchModal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        document.getElementById('searchInput').focus();
    }
}

// Toggle Auth Modal
function toggleAuth() {
    document.getElementById('authModal').classList.toggle('hidden');
}

// Perform Search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchTerm) {
        searchResults.innerHTML = '<p class="text-gray-500 text-center col-span-full">Lütfen arama kelimesi girin</p>';
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    searchResults.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<p class="text-gray-500 text-center col-span-full">Ürün bulunamadı</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card rounded-lg overflow-hidden cursor-pointer';
        productCard.onclick = () => showProductDetail(product);
        
        const discountedPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2);
        
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                ${product.isNew ? '<div class="absolute top-2 left-2 premium-badge px-2 py-1 rounded text-xs font-bold">YENİ</div>' : ''}
                ${product.discount ? `<div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-%${product.discount}</div>` : ''}
            </div>
            <div class="p-4">
                <h4 class="font-bold text-sm mb-2">${product.name}</h4>
                <p class="text-gray-600 text-xs mb-2">${product.description}</p>
                <div class="flex items-center justify-between">
                    <div>
                        ${product.discount ? `<span class="text-gray-400 line-through text-xs mr-1">₺${product.price.toFixed(2)}</span>` : ''}
                        <span class="text-lg font-bold text-black">₺${discountedPrice}</span>
                    </div>
                </div>
            </div>
        `;
        searchResults.appendChild(productCard);
    });
}

// Login with Google
function loginWithGoogle() {
    showSuccessMessage('Google ile giriş yapılıyor...');
    setTimeout(() => {
        document.getElementById('authModal').classList.add('hidden');
        showSuccessMessage('Başarıyla giriş yapıldı!');
    }, 1500);
}

// Login with Apple
function loginWithApple() {
    showSuccessMessage('Apple ile giriş yapılıyor...');
    setTimeout(() => {
        document.getElementById('authModal').classList.add('hidden');
        showSuccessMessage('Başarıyla giriş yapıldı!');
    }, 1500);
}

// Show Product Detail Modal
function showProductDetail(product) {
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    const discountedPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2);
    document.getElementById('modalProductPrice').textContent = `₺${discountedPrice}`;
    
    if (product.discount) {
        document.getElementById('modalProductOldPrice').textContent = `₺${product.price.toFixed(2)}`;
        document.getElementById('modalProductOldPrice').style.display = 'block';
    } else {
        document.getElementById('modalProductOldPrice').style.display = 'none';
    }
    
    // Add sizes
    const sizesContainer = document.getElementById('modalProductSizes');
    sizesContainer.innerHTML = '';
    product.sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'size-btn px-3 py-1 rounded text-xs border';
        sizeBtn.textContent = size;
        sizeBtn.onclick = () => {
            document.querySelectorAll('#modalProductSizes .size-btn').forEach(btn => btn.classList.remove('selected'));
            sizeBtn.classList.add('selected');
        };
        sizesContainer.appendChild(sizeBtn);
    });
    
    // Add colors
    const colorsContainer = document.getElementById('modalProductColors');
    colorsContainer.innerHTML = '';
    product.colors.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'w-8 h-8 rounded-full border-2 border-gray-300';
        colorBtn.style.backgroundColor = getColorHex(color);
        colorBtn.title = color;
        colorBtn.onclick = () => {
            document.querySelectorAll('#modalProductColors button').forEach(btn => btn.classList.remove('ring-2', 'ring-black'));
            colorBtn.classList.add('ring-2', 'ring-black');
        };
        colorsContainer.appendChild(colorBtn);
    });
    
    document.getElementById('productModal').classList.remove('hidden');
}

// Close Product Modal
function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

// Get Color Hex
function getColorHex(colorName) {
    const colors = {
        'Siyah': '#000000',
        'Beyaz': '#FFFFFF',
        'Mavi': '#0000FF',
        'Kırmızı': '#FF0000',
        'Yeşil': '#00FF00',
        'Sarı': '#FFFF00',
        'Mor': '#800080',
        'Turuncu': '#FFA500',
        'Pembe': '#FFC0CB',
        'Gri': '#808080',
        'Lacivert': '#000080',
        'Kahve': '#8B4513',
        'Bej': '#F5F5DC',
        'Nude': '#E3B891'
    };
    return colors[colorName] || '#CCCCCC';
}

// Add to Cart from Modal
function addToCartFromModal() {
    const selectedSize = document.querySelector('#modalProductSizes .size-btn.selected');
    if (!selectedSize) {
        showSuccessMessage('Lütfen beden seçin!');
        return;
    }
    showSuccessMessage('Ürün sepete eklendi!');
    closeProductModal();
}

// Update product cards to show detail modal
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    
    // Update product cards to be clickable
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('onclick').match(/\d+/)[0]);
                const product = products.find(p => p.id === productId);
                showProductDetail(product);
            });
        });
    }, 100);
});

// Scroll to top with animation
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Animate transition to products with products
function showProducts() {
    hideAllSections();
    document.getElementById('productsSection').classList.remove('hidden');
    
    // Animate products appearing
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.style.opacity = '0';
    productsGrid.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        productsGrid.style.transition = 'all 0.5s ease';
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
    }, 100);
}

// Add search input enter key handler
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Handle payment
function handlePayment(e) {
    e.preventDefault();
    
    // Simulate payment processing
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVV = document.getElementById('cardCVV').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    
    // Basic validation
    if (!cardName || !cardNumber || !cardExpiry || !cardCVV || !email || !address) {
        showSuccessMessage('Lütfen tüm alanları doldurun!');
        return;
    }
    
    // Simulate payment processing
    setTimeout(() => {
        showSuccessMessage('Ödemeniz başarıyla alındı! Siparişiniz işleniyor.');
        cart = [];
        updateCartCount();
        document.getElementById('paymentForm').reset();
        setTimeout(() => {
            showProducts();
        }, 2000);
    }, 1500);
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    showSuccessMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    e.target.reset();
}

// Format card number
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

// Format card expiry
function formatCardExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
}

// Format card CVV
function formatCardCVV(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
}

// Show success message
function showSuccessMessage(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

// Add new product function (for admin use)
function addProduct(name, price, description, imageUrl) {
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: parseFloat(price),
        image: imageUrl || `https://picsum.photos/seed/product${products.length + 1}/300/300.jpg`,
        description: description
    };
    products.push(newProduct);
    renderProducts();
    showSuccessMessage('Ürün başarıyla eklendi!');
}

// Remove product function (for admin use)
function removeProduct(productId) {
    products = products.filter(p => p.id !== productId);
    cart = cart.filter(item => item.id !== productId);
    renderProducts();
    updateCartCount();
    showSuccessMessage('Ürün başarıyla silindi!');
}

// Search products
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p class="text-gray-500 text-center py-8 col-span-full">Ürün bulunamadı</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-lg overflow-hidden';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-purple-600">₺${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}
