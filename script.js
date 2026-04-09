// Giyim ürünleri verisi - geçici olarak boş
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
        // Boş ürün sayfasi tasarimi
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
                        <p class="text-gray-500">Premium giyim ve aksesuar koleksiyonu hazırlanıyor...</p>
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
    hideAllSections();
    const content = `
        <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div class="text-center mb-12">
                <h2 class="text-5xl font-bold mb-4 text-black">Bize Ulaşın</h2>
                <p class="text-xl text-gray-600">Size en iyi hizmeti sunmak için buradayız</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 mb-12">
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl text-center hover:shadow-lg transition">
                    <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-phone text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3 text-black">Telefon</h3>
                    <p class="text-3xl font-bold text-gray-800 mb-2">530 822 44 18</p>
                    <p class="text-gray-600">Hafta içi: 09:00 - 21:00</p>
                    <p class="text-gray-600">Hafta sonu: 10:00 - 18:00</p>
                </div>
                
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl text-center hover:shadow-lg transition">
                    <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-envelope text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3 text-black">E-posta</h3>
                    <p class="text-xl font-bold text-gray-800 mb-2">hansema003@gmail.com</p>
                    <p class="text-gray-600">24 saat içinde</p>
                    <p class="text-gray-600">hızlı dönüş</p>
                </div>
                
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl text-center hover:shadow-lg transition">
                    <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-map-marker-alt text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-3 text-black">Adres</h3>
                    <p class="text-lg text-gray-800 mb-2">İstanbul</p>
                    <p class="text-gray-600">Türkiye</p>
                    <p class="text-gray-600">Merkez Mağaza</p>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12">
                <div class="bg-black text-white p-10 rounded-2xl">
                    <h3 class="text-3xl font-bold mb-8 text-center">Hızlı Mesaj</h3>
                    <form id="contactForm" class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Adınız Soyadınız" required 
                                   class="w-full px-4 py-4 text-lg rounded-lg bg-white text-black placeholder-gray-500 border-2 border-transparent focus:border-white focus:outline-none">
                            <input type="email" placeholder="E-posta Adresiniz" required 
                                   class="w-full px-4 py-4 text-lg rounded-lg bg-white text-black placeholder-gray-500 border-2 border-transparent focus:border-white focus:outline-none">
                        </div>
                        <input type="tel" placeholder="Telefon Numaranız (Opsiyonel)" 
                               class="w-full px-4 py-4 text-lg rounded-lg bg-white text-black placeholder-gray-500 border-2 border-transparent focus:border-white focus:outline-none">
                        <select required class="w-full px-4 py-4 text-lg rounded-lg bg-white text-black border-2 border-transparent focus:border-white focus:outline-none">
                            <option value="">Konu Seçiniz</option>
                            <option value="siparis">Sipariþ Bilgisi</option>
                            <option value="iade">Ýade ve Deðiþim</option>
                            <option value="urun">Ürün Bilgisi</option>
                            <option value="teknik">Teknik Destek</option>
                            <option value="diger">Diðer</option>
                        </select>
                        <textarea placeholder="Mesajınızı yazın..." required rows="6" 
                                  class="w-full px-4 py-4 text-lg rounded-lg bg-white text-black placeholder-gray-500 border-2 border-transparent focus:border-white focus:outline-none resize-none"></textarea>
                        <div class="flex items-center space-x-4">
                            <input type="checkbox" id="newsletter" class="w-5 h-5 text-white">
                            <label for="newsletter" class="text-white text-sm">Kampanyalardan haberdar olmak istiyorum</label>
                        </div>
                        <button type="submit" class="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-200 transition text-lg">
                            <i class="fas fa-paper-plane mr-3"></i>MESAJI GÖNDER
                        </button>
                    </form>
                </div>
                
                <div class="space-y-8">
                    <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                        <h3 class="text-2xl font-bold mb-6 text-black">Neden Bizi Tercih Etmelisiniz?</h3>
                        <ul class="space-y-4">
                            <li class="flex items-start space-x-3">
                                <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <h4 class="font-bold text-lg text-black">7/24 Müşteri Desteği</h4>
                                    <p class="text-gray-600">Her zaman yanınızdayız</p>
                                </div>
                            </li>
                            <li class="flex items-start space-x-3">
                                <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <h4 class="font-bold text-lg text-black">Hızlı Çözüm</h4>
                                    <p class="text-gray-600">Sorunlarınız anında çözülür</p>
                                </div>
                            </li>
                            <li class="flex items-start space-x-3">
                                <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <h4 class="font-bold text-lg text-black">Güvenli Alışveriş</h4>
                                    <p class="text-gray-600">%100 güvence</p>
                                </div>
                            </li>
                            <li class="flex items-start space-x-3">
                                <i class="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <h4 class="font-bold text-lg text-black">Ücretsiz Kargo</h4>
                                    <p class="text-gray-600">500 TL ve üzeri alışverişlerde</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl">
                        <h3 class="text-2xl font-bold mb-6 text-black">Sosyal Medya</h3>
                        <div class="flex space-x-4">
                            <a href="https://www.instagram.com/hansema003/" target="_blank" class="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                                <i class="fab fa-instagram text-white text-xl"></i>
                            </a>
                            <a href="https://wa.me/905308224418" target="_blank" class="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                                <i class="fab fa-whatsapp text-white text-xl"></i>
                            </a>
                        </div>
                        <p class="text-gray-600 mt-4">Bizi sosyal medyadan takip edebilirsiniz</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = content;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Toggle search modal
function toggleSearch() {
    const modal = document.getElementById('searchModal');
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
        resultsContainer.innerHTML = '<p class="text-gray-500 col-span-full">Sonuç bulunamadı.</p>';
    } else {
        results.forEach(product => {
            const card = createProductCard(product);
            resultsContainer.appendChild(card);
        });
    }
}


// Handle contact form
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    console.log('İletişim formu:', { name, email, message });
    
    showSuccess('Mesajınız gönderildi! En kısa sürede dönüş yapacağız.');
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
    hideAllSections();
    const content = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-4xl font-bold mb-8 text-black">Sıkça Sorulan Sorular</h2>
            <div class="space-y-6">
                <div class="border-b pb-4">
                    <h3 class="font-bold text-xl mb-3 text-black">Siparişim ne zaman kargoya verilir?</h3>
                    <p class="text-gray-600 text-lg">Siparişleriniz 1-3 iş günü içinde kargoya verilir.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-bold text-xl mb-3 text-black">Kargo ücreti ne kadar?</h3>
                    <p class="text-gray-600 text-lg">500 TL ve üzeri alışverişlerde kargo ücretsizdir.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-bold text-xl mb-3 text-black">Ürünleri iade edebilir miyim?</h3>
                    <p class="text-gray-600 text-lg">30 gün içinde koşulsuz iade hakkınız bulunmaktadır.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-bold text-xl mb-3 text-black">Ödeme seçenekleri nelerdir?</h3>
                    <p class="text-gray-600 text-lg">Kredi kartı, banka kartı ve kapıda ödeme seçenekleri mevcuttur.</p>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-bold text-xl mb-3 text-black">Müşteri hizmetlerine nasıl ulaşabilirim?</h3>
                    <p class="text-gray-600 text-lg">530 822 44 18 numaralı telefondan veya hansema003@gmail.com e-posta adresinden ulaşabilirsiniz.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = content;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show returns
function showReturns() {
    hideAllSections();
    const content = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-4xl font-bold mb-8 text-black">İade ve Değişim</h2>
            <div class="space-y-6">
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">İade Koşulları</h3>
                    <ul class="list-disc list-inside text-gray-600 space-y-2 text-lg">
                        <li>Ürünler 30 gün içinde iade edilebilir</li>
                        <li>Ürünlerin kullanılmamış olması gerekir</li>
                        <li>Etiketleri üzerinde olmalıdır</li>
                        <li>Orijinal paketinde iade edilmelidir</li>
                    </ul>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">İade Süreci</h3>
                    <p class="text-gray-600 text-lg mb-4">Müşteri hizmetlerimizi arayarak iade kodu alabilirsiniz.</p>
                    <ol class="list-decimal list-inside text-gray-600 space-y-2 text-lg">
                        <li>Müşteri hizmetlerini arayın (530 822 44 18)</li>
                        <li>İade kodunu alın</li>
                        <li>Ürünü paketleyin</li>
                        <li>Kargo firmasına teslim edin</li>
                        <li>İade onayını bekleyin</li>
                    </ol>
                </div>
                <div class="bg-blue-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Önemli Bilgiler</h3>
                    <p class="text-gray-600 text-lg">İade ücreti alıcıya aittir. Ürün hasarlı veya eksik ise iade kabul edilmez.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = content;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show shipping
function showShipping() {
    hideAllSections();
    const content = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-4xl font-bold mb-8 text-black">Kargo ve Teslimat</h2>
            <div class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-bold text-xl mb-4 text-black">Teslimat Süresi</h3>
                        <ul class="space-y-3 text-gray-600 text-lg">
                            <li>Şehir içi: 1-2 gün</li>
                            <li>Şehir dışı: 2-4 gün</li>
                            <li>Kıbrıs: 3-5 gün</li>
                        </ul>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-bold text-xl mb-4 text-black">Kargo Firmaları</h3>
                        <ul class="space-y-3 text-gray-600 text-lg">
                            <li>Aras Kargo</li>
                            <li>Yurtiçi Kargo</li>
                            <li>MNG Kargo</li>
                        </ul>
                    </div>
                </div>
                <div class="bg-blue-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Kargo Ücretleri</h3>
                    <ul class="space-y-3 text-gray-600 text-lg">
                        <li>500 TL altı: 29.90 TL</li>
                        <li>500 TL ve üzeri: ÜCRETSİZ</li>
                        <li>Kapıda ödeme: +15.90 TL</li>
                    </ul>
                </div>
                <div class="bg-green-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Takip</h3>
                    <p class="text-gray-600 text-lg">Siparişiniz kargoya verildiğinde takip numarası e-posta adresinize gönderilir.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = content;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show about
function showAbout() {
    hideAllSections();
    const content = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-4xl font-bold mb-8 text-black">Hakkımızda</h2>
            <div class="space-y-6">
                <p class="text-gray-600 text-lg leading-relaxed">HANSEMA olarak 2010 yılından bu yana premium giyim sektöründe hizmet vermekteyiz. Kaliteli ürünler, müşteri memnuniyeti ve zamansız tasarım ilkelerimizle öne çıkıyoruz.</p>
                <p class="text-gray-600 text-lg leading-relaxed">Modern ve şık tasarımlarımız ile her yaş grubundan müşterilerimizin beklentilerini karşılamayı hedefliyoruz. Sürdürülebilir üretim ve etik değerler bizim için önemlidir.</p>
                <div class="grid md:grid-cols-3 gap-6 mt-8">
                    <div class="text-center bg-gray-50 p-6 rounded-lg">
                        <div class="text-4xl font-bold text-black mb-2">14+</div>
                        <p class="text-gray-600">Yıllık Deneyim</p>
                    </div>
                    <div class="text-center bg-gray-50 p-6 rounded-lg">
                        <div class="text-4xl font-bold text-black mb-2">50K+</div>
                        <p class="text-gray-600">Mutlu Müşteri</p>
                    </div>
                    <div class="text-center bg-gray-50 p-6 rounded-lg">
                        <div class="text-4xl font-bold text-black mb-2">100+</div>
                        <p class="text-gray-600">Ürün Çeşidi</p>
                    </div>
                </div>
                <div class="bg-black text-white p-6 rounded-lg mt-8">
                    <h3 class="font-bold text-xl mb-3">Misyonumuz</h3>
                    <p class="text-lg">Müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunmak ve alışveriş deneyimlerini özel kılmak.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = content;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show privacy
function showPrivacy() {
    hideAllSections();
    const content = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-4xl font-bold mb-8 text-black">Gizlilik Politikası</h2>
            <div class="space-y-6">
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Kişisel Verilerin Korunması</h3>
                    <p class="text-gray-600 text-lg">Kişisel verileriniz KVKK kapsamında korunmaktadır. Verileriniz sadece sizin izninizle işlenir.</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Veri Kullanımı</h3>
                    <p class="text-gray-600 text-lg">Verileriniz sadece sipariş işlemleri ve müşteri hizmetleri için kullanılır. Hiçbir şekilde üçüncü şahıslarla paylaşılmaz.</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Çerezler</h3>
                    <p class="text-gray-600 text-lg">Sitemizde çerezler kullanılmaktadır. Bu çerezler site deneyiminizi iyileştirmek için kullanılır.</p>
                </div>
                <div class="bg-blue-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Haklarınız</h3>
                    <p class="text-gray-600 text-lg">Verilerinizi görme, düzeltme ve silme hakkınız her zaman vardır. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = content;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Show terms
function showTerms() {
    hideAllSections();
    const content = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 class="text-4xl font-bold mb-8 text-black">Kullanım Koşulları</h2>
            <div class="space-y-6">
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Sözleşme</h3>
                    <p class="text-gray-600 text-lg">Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız siteyi kullanmamalısınız.</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Sorumluluk</h3>
                    <p class="text-gray-600 text-lg">Ürünlerin kullanımından kullanıcı sorumludur. Site üzerindeki içeriklerin telif hakları saklıdır.</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">İade ve Değişim</h3>
                    <p class="text-gray-600 text-lg">İade ve değişim koşulları ürün sayfalarında belirtilmiştir. 30 gün içinde koşulsuz iade hakkı.</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Fiyatlar</h3>
                    <p class="text-gray-600 text-lg">Sitedeki fiyatlar günceldir ancak fiyat hataları düzeltilebilir. KDV dahil fiyatlar belirtilmiştir.</p>
                </div>
                <div class="bg-red-50 p-6 rounded-lg">
                    <h3 class="font-bold text-xl mb-4 text-black">Yasal Düzenlemeler</h3>
                    <p class="text-gray-600 text-lg">Bu koşullar Türk hukukuna tabidir. Anlaşmazlıklar durumunda İstanbul mahkemeleri yetkilidir.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('contactSection').innerHTML = content;
    document.getElementById('contactSection').classList.remove('hidden');
}

// Hide all sections
function hideAllSections() {
    document.getElementById('productsSection').classList.add('hidden');
    document.getElementById('contactSection').classList.add('hidden');
}
