// Shopping App - Interactive Features

// Initialize Shopping Cart
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(productId, productName, price) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity++;
        } else {
            this.items.push({
                id: productId,
                name: productName,
                price: price,
                quantity: 1
            });
        }
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${productName} added to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartCount();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const total = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = total;
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }

    showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// Initialize Wishlist
class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('wishlist')) || [];
    }

    addItem(productId) {
        if (!this.items.includes(productId)) {
            this.items.push(productId);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    removeItem(productId) {
        this.items = this.items.filter(id => id !== productId);
        this.saveWishlist();
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    isInWishlist(productId) {
        return this.items.includes(productId);
    }
}

// Product Filter System
class ProductFilter {
    constructor() {
        this.filters = {
            priceRange: [0, 1000],
            categories: [],
            rating: 0
        };
    }

    applyFilters(products) {
        return products.filter(product => {
            const priceMatch = product.price >= this.filters.priceRange[0] && 
                             product.price <= this.filters.priceRange[1];
            const categoryMatch = this.filters.categories.length === 0 || 
                                this.filters.categories.includes(product.category);
            const ratingMatch = product.rating >= this.filters.rating;

            return priceMatch && categoryMatch && ratingMatch;
        });
    }

    setPriceRange(min, max) {
        this.filters.priceRange = [min, max];
    }

    setCategories(categories) {
        this.filters.categories = categories;
    }

    setRating(rating) {
        this.filters.rating = rating;
    }
}

// Search functionality
class SearchBar {
    constructor() {
        this.searchInput = document.querySelector('input[placeholder="Search products..."]');
        this.setupSearch();
    }

    setupSearch() {
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(this.searchInput.value);
                }
            });

            this.searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    performSearch(query) {
        if (query.length > 0) {
            console.log(`Searching for: ${query}`);
            // Add your search logic here
        }
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.categoryMenu = document.getElementById('category-menu');
        this.setupMenu();
    }

    setupMenu() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.categoryMenu.classList.toggle('hidden');
                this.categoryMenu.classList.toggle('md:flex');
            });

            // Close menu when clicking on a link
            const links = this.categoryMenu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    this.categoryMenu.classList.add('hidden');
                });
            });
        }
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.setupSmoothScroll();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// Lazy Loading Images
class LazyLoader {
    constructor() {
        this.setupLazyLoading();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Form Validation
class FormValidator {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    static validatePassword(password) {
        return password.length >= 8;
    }
}

// Analytics Tracking
class Analytics {
    static trackEvent(eventName, eventData = {}) {
        console.log(`Event: ${eventName}`, eventData);
        // Send to your analytics service
    }

    static trackPageView(pageName) {
        console.log(`Page View: ${pageName}`);
        // Send to your analytics service
    }
}

// Rating System
class RatingSystem {
    constructor() {
        this.setupRatings();
    }

    setupRatings() {
        document.querySelectorAll('.rating-container').forEach(container => {
            const stars = container.querySelectorAll('.star');
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    this.setRating(stars, index + 1);
                    Analytics.trackEvent('product_rated', { rating: index + 1 });
                });

                star.addEventListener('mouseover', () => {
                    this.highlightStars(stars, index);
                });
            });

            container.addEventListener('mouseleave', () => {
                const currentRating = container.dataset.rating;
                this.highlightStars(stars, currentRating - 1);
            });
        });
    }

    setRating(stars, rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    highlightStars(stars, index) {
        stars.forEach((star, i) => {
            if (i <= index) {
                star.classList.add('hover');
            } else {
                star.classList.remove('hover');
            }
        });
    }
}

// Initialize All
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    const cart = new ShoppingCart();
    const wishlist = new Wishlist();
    const filter = new ProductFilter();
    const search = new SearchBar();
    const menu = new MobileMenu();
    const scroll = new SmoothScroll();
    const lazyLoader = new LazyLoader();

    // Setup Add to Cart buttons
    document.querySelectorAll('button:has(i.fa-shopping-cart)').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.text-2xl').textContent.replace('$', '');
            const price = parseFloat(priceText);
            
            cart.addItem(index, productName, price);

            // Visual feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
            this.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.backgroundColor = '';
            }, 1500);

            Analytics.trackEvent('add_to_cart', { 
                product: productName, 
                price: price 
            });
        });
    });

    // Setup Wishlist buttons
    document.querySelectorAll('button:has(i.fa-heart)').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('text-red-500');
            this.classList.toggle('text-gray-600');
            Analytics.trackEvent('wishlist_toggled');
        });
    });

    // Newsletter subscription
    const newsletterBtn = document.querySelector('button:has-text("Subscribe")');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = this.previousElementSibling.value;
            if (FormValidator.validateEmail(email)) {
                cart.showNotification('Successfully subscribed to newsletter!');
                this.previousElementSibling.value = '';
                Analytics.trackEvent('newsletter_subscribed', { email: email });
            } else {
                cart.showNotification('Please enter a valid email address');
            }
        });
    }

    // Sort functionality
    document.querySelector('select').addEventListener('change', function(e) {
        console.log('Sorting by:', e.target.value);
        Analytics.trackEvent('products_sorted', { sortBy: e.target.value });
    });

    // Track page view
    Analytics.trackPageView('Shopping App - Home');
});

// Service Worker Registration (for offline support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
