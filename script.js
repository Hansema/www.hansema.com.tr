// Giyim ürünleri verisi - geçici olarak boþ
let products = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
});

// Render products
function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        // Boþ ürün sayfasi tasarimi
        const emptyState = document.createElement('div');
        emptyState.className = 'col-span-full text-center py-16';
        emptyState.innerHTML = `
            <div class="max-w-2xl mx-auto">
                <div class="mb-8">
                    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-shopping-bag text-4xl text-gray-400"></i>
                    </div>
                    <h2 class="text-3xl font-bold mb-4 text-black">Henüz Ürün Yok</h2>
                    <p class="text-xl text-gray-600 mb-8">Yakinda harika ürünler eklenecek!</p>
                    <div class="space-y-4">
                        <p class="text-gray-500">Premium giyim ve aksesuar koleksiyonu hazirlaniyor...</p>
                        <div class="flex justify-center space-x-4">
                            <div class="text-center">
                                <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                                    <i class="fas fa-crown text-white"></i>
                                </div>
                                <p class="text-sm text-gray-600">Kaliteli</p>
                            </div>
                            <div class="text-center">
                                <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                                    <i class="fas fa-star text-white"></i>
                                </div>
                                <p class="text-sm text-gray-600">Özel</p>
                            </div>
                            <div class="text-center">
                                <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                                    <i class="fas fa-gem text-white"></i>
                                </div>
                                <p class="text-sm text-gray-600">Premium</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8">
                        <button onclick="showContact()" class="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                            <i class="fas fa-bell mr-2"></i>HABER VER
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(emptyState);
        return;
    }
    
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300';
    
    const discount = product.discount || 0;
    const discountedPrice = product.price * (1 - discount / 100);
    
    card.innerHTML = `
        <div class="product-image relative overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover">
            ${product.isNew ? '<span class="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">YENI</span>' : ''}
            ${discount > 0 ? `<span class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">-%${discount}</span>` : ''}
        </div>
        <div class="p-4">
            <h3 class="text-lg font-bold mb-2">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-4">${product.description}</p>
            <div class="flex items-center justify-between mb-4">
                <div>
                    <span class="text-2xl font-bold text-black">TL${discountedPrice.toFixed(2)}</span>
                    ${discount > 0 ? `<span class="text-gray-400 line-through ml-2">TL${product.price.toFixed(2)}</span>` : ''}
                </div>
            </div>
            <button onclick="showProductDetail(${product.id})" class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                <i class="fas fa-eye mr-2"></i>DETAYLAR
            </button>
        </div>
    `;
    
    return card;
}

// Show product detail modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    const discount = product.discount || 0;
    const discountedPrice = product.price * (1 - discount / 100);
    document.getElementById('modalProductPrice').textContent = `TL${discountedPrice.toFixed(2)}`;
    document.getElementById('modalProductOldPrice').textContent = discount > 0 ? `TL${product.price.toFixed(2)}` : '';
    
    // Add sizes
    const sizesContainer = document.getElementById('modalProductSizes');
    sizesContainer.innerHTML = '';
    product.sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'px-4 py-2 border border-gray-300 rounded hover:bg-black hover:text-white transition';
        sizeBtn.textContent = size;
        sizeBtn.onclick = () => selectSize(sizeBtn, size);
        sizesContainer.appendChild(sizeBtn);
    });
    
    // Add colors
    const colorsContainer = document.getElementById('modalProductColors');
    colorsContainer.innerHTML = '';
    product.colors.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'px-4 py-2 border border-gray-300 rounded hover:bg-black hover:text-white transition';
        colorBtn.textContent = color;
        colorBtn.onclick = () => selectColor(colorBtn, color);
        colorsContainer.appendChild(colorBtn);
    });
    
    modal.classList.remove('hidden');
}

// Close product detail modal
function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

// Select size
function selectSize(btn, size) {
    document.querySelectorAll('#modalProductSizes button').forEach(b => b.classList.remove('bg-black', 'text-white'));
    btn.classList.add('bg-black', 'text-white');
}

// Select color
function selectColor(btn, color) {
    document.querySelectorAll('#modalProductColors button').forEach(b => b.classList.remove('bg-black', 'text-white'));
    btn.classList.add('bg-black', 'text-white');
}

// Filter by category
function filterByCategory(category) {
    // Update active category button
    document.querySelectorAll('.category-pill').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderProducts(category);
    showSection('products');
}

// Show section
function showSection(section) {
    // Hide all sections
    document.getElementById('productsSection').classList.add('hidden');
    document.getElementById('contactSection').classList.add('hidden');
    
    // Show selected section
    document.getElementById(section + 'Section').classList.remove('hidden');
}

// Show products
function showProducts() {
    showSection('products');
}

// Show contact
function showContact() {
    showSection('contact');
}

// Toggle search modal
function toggleSearch() {
    const modal = document.getElementById('searchModal');
    modal.classList.toggle('hidden');
}

// Toggle auth modal
function toggleAuth() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!searchTerm) {
        resultsContainer.innerHTML = '<p class="text-gray-500 col-span-full">Arama için bir kelime girin...</p>';
        return;
    }
    
    const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-500 col-span-full">Sonuç bulunamadi.</p>';
    } else {
        results.forEach(product => {
            const card = createProductCard(product);
            resultsContainer.appendChild(card);
        });
    }
}

// Login with Google
function loginWithGoogle() {
    console.log('Google ile giriþ yapiliyor...');
    showSuccess('Google ile giriþ yapildi!');
    toggleAuth();
}

// Login with Apple
function loginWithApple() {
    console.log('Apple ile giriþ yapiliyor...');
    showSuccess('Apple ile giriþ yapildi!');
    toggleAuth();
}

// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    console.log('Iletiþim formu:', { name, email, message });
    
    showSuccess('Mesajiniz gönderildi! En kisa sürede dönüþ yapacaðiz.');
    e.target.reset();
}

// Show success modal
function showSuccess(message) {
    const modal = document.getElementById('successModal');
    document.getElementById('successMessage').textContent = message;
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show FAQ
function showFAQ() {
    console.log('FAQ sayfasi gösteriliyor...');
}

// Show returns
function showReturns() {
    console.log('Iade sayfasi gösteriliyor...');
}

// Show shipping
function showShipping() {
    console.log('Kargo sayfasi gösteriliyor...');
}

// Show about
function showAbout() {
    console.log('Hakkimizda sayfasi gösteriliyor...');
}

// Show privacy
function showPrivacy() {
    console.log('Gizlilik politikasi gösteriliyor...');
}

// Show terms
function showTerms() {
    console.log('Kullanim koþullari gösteriliyor...');
}
