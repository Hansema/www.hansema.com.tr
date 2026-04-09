# HANSEMA - Premium Giyim Mağazası

## Hakkında
HANSEMA, 2010 yılından bu yana premium giyim ve aksesuar sektöründe hizmet veren modern bir e-ticaret platformudur. Zamansız tasarımlar, kaliteli ürünler ve müşteri memnuniyeti ilkelerimizle öne çıkıyoruz.

## İletişim Bilgileri
- **Telefon:** 530 822 44 18
- **E-posta:** hansema003@gmail.com
- **Adres:** Merkezi, Bahçelievler, İstanbul
- **Çalışma Saatleri:** Hafta İçi 09:00-21:00, Hafta Sonu 10:00-20:00

## Sosyal Medya
- **Instagram:** https://www.instagram.com/hansema003/

## Teknolojiler
- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Icons:** Font Awesome 6.4.0
- **Responsive:** Mobil ve tablet uyumlu tasarım
- **Tarayıcı:** Modern tarayıcılarla tam uyumlu

## Özellikler
- **Ürün Kategorileri:** Elbise, Gömlek, Pantolon, Ceket, Ayakkabı, Çanta
- **Filtreleme:** Kategoriye göre, yeni ürünler, indirimli ürünler
- **Arama:** Ürün adına ve açıklamasına göre arama
- **Sepet:** Dinamik sepet yönetimi
- **Ödeme:** Güvenli kredi kartı ödeme sistemi
- **Giriş:** Google ve Apple ile hızlı giriş
- **Renk Paleti:** Siyah, Beyaz, Gri - Modern ve elit görünüm

## Tasarım Felsefesi
- **Minimalist:** Sade ve modern tasarım anlayışı
- **Premium:** Lüks ve kaliteli hissiyat
- **Kullanıcı Odaklı:** Kolay kullanım ve akıcı navigasyon
- **Responsive:** Tüm cihazlarda mükemmel görünüm

## Kurulum ve Çalıştırma

1. **Dosyaları İndir:**
   ```bash
   git clone [repository-url]
   cd hansema
   ```

2. **Local Sunucu Başlat:**
   ```bash
   # Python ile
   python -m http.server 8000
   
   # Veya Node.js ile
   npx serve
   
   # Veya PHP ile
   php -S localhost:8000
   ```

3. **Tarayıcıda Aç:**
   ```
   http://localhost:8000
   ```

## Kullanım
1. **Ana Sayfa:** HANSEMA logosuna tıklayarak ana sayfaya dönün
2. **Ürünleri Keşfedin:** "Koleksiyonu Keşfet" butonu ile ürünleri görün
3. **Arama Yapın:** Arama ikonu ile ürünleri bulun
4. **Detay İnceleyin:** Ürünlere tıklayarak detayları görün
5. **Sepete Ekleyin:** Beden ve renk seçerek sepete ekleyin
6. **Güvenli Ödeme:** Sepeti onaylayıp ödeme yapın

## Geliştirme

### Yeni Ürün Ekleme
```javascript
const yeniUrun = {
    id: products.length + 1,
    name: "Yeni Ürün Adı",
    price: 1999.99,
    image: "https://picsum.photos/seed/yeni/400/500.jpg",
    description: "Ürün açıklaması",
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Siyah", "Beyaz"],
    isNew: true,
    discount: 15
};
products.push(yeniUrun);
```

### Yeni Kategori Ekleme
```javascript
// products.js dosyasında kategorileri güncelleyin
const yeniKategori = "accessories";
```

## Lisans
 2026 HANSEMA - Tüm hakları saklıdır.

---

HANSEMA - Zamansız Şıklık, Modern Tasarımsi/
├── index.html          # Ana sayfa
├── script.js           # JavaScript fonksiyonları
└── README.md          # Bu dosya

- **HTML5**: Modern HTML yapısı
- **Tailwind CSS**: Responsive ve modern stil
- **Vanilla JavaScript**: Saf JavaScript ile dinamik fonksiyonlar
- **Font Awesome**: İkon kütüphanesi

## Özellik Detayları

### Ödeme Sistemi
- Kart numarası formatlama (1234 5678 9012 3456)
- Son kullanma tarihi formatlama (MM/YY)
- CVV kodu doğrulama
- Form validasyonu

### Sepet Özellikleri
- Ürün ekleme/çıkarma
- Miktar artırma/azaltma
- Toplam fiyat hesaplama
- Sepet sayacı

### İletişim
- Telefon, e-posta, adres bilgileri
- İletişim formu
- Çalışma saatleri

## Özelleştirme

### Renk Teması
Renkleri değiştirmek için `index.html` dosyasındaki CSS değişkenlerini güncelleyin:
```css
.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Ürün Verileri
`script.js` dosyasındaki `products` dizisini düzenleyerek ürünleri güncelleyebilirsiniz.

## Güvenlik

- Form validasyonları
- Kart bilgisi formatlama
- XSS koruması
- HTTPS önerisi

## Lisans

Bu proje MIT lisansı ile korunmaktadır.
