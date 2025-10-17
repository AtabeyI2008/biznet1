// RESTAURANTS MANAGEMENT SYSTEM
class RestaurantsSystem {
    constructor() {
        this.restaurants = [];
        this.filteredRestaurants = [];
        this.currentFilters = {
            type: 'all',
            cuisine: '',
            location: '',
            priceRange: '',
            jobType: '',
            features: [],
            services: [],
            hours: [],
            payment: []
        };
        this.currentSort = 'rating';
        this.currentPage = 1;
        this.restaurantsPerPage = 8;
        this.init();
    }

    init() {
        this.loadRestaurants();
        this.setupEventListeners();
        this.renderRestaurants();
        console.log('🍽️ Restaurants system initialized');
    }

    loadRestaurants() {
        this.restaurants = JSON.parse(localStorage.getItem('biznet_restaurants')) || this.getSampleRestaurants();
        this.filteredRestaurants = [...this.restaurants];
    }

    getSampleRestaurants() {
        return [
            {
                id: 1,
                name: 'Lezzet Restoran',
                type: 'restaurant',
                cuisine: 'turkish',
                location: 'Bakı',
                activeJobs: 8,
                description: 'Ən ləziz türk mətbəxi. Ən yaxşı keyfiyyət və xidmət. 5 ildir bazar lideri.',
                logo: 'https://cdn-icons-png.flaticon.com/512/878/878052.png',
                rating: 4.8,
                reviewCount: 234,
                features: ['delivery', 'takeaway', 'terrace', 'parking', 'wifi', 'alcohol'],
                services: ['fine-dining', 'family', 'catering'],
                hours: '24h',
                payment: ['cash', 'card', 'online'],
                jobs: [
                    { position: 'Aşpaz', salary: '₼ 800-1200' },
                    { position: 'Ofisiant', salary: '₼ 400-600' },
                    { position: 'Kassir', salary: '₼ 350-500' }
                ],
                priceRange: '₼₼',
                workingHours: {
                    monday: '09:00 - 00:00',
                    tuesday: '09:00 - 00:00',
                    wednesday: '09:00 - 00:00',
                    thursday: '09:00 - 00:00',
                    friday: '09:00 - 02:00',
                    saturday: '09:00 - 02:00',
                    sunday: '09:00 - 00:00'
                },
                featured: true,
                premium: true,
                delivery: true,
                phone: '+994 12 345 67 89',
                address: 'Nizami küçəsi 123'
            },
            {
                id: 2,
                name: 'Fresh Market',
                type: 'market',
                cuisine: 'local',
                location: 'Gəncə',
                activeJobs: 5,
                description: 'Təzə tərəvəz, meyvə və ərzaq məhsulları. Ən yaxşı qiymətlər.',
                logo: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
                rating: 4.6,
                reviewCount: 156,
                features: ['parking'],
                services: ['family'],
                hours: '07:00 - 23:00',
                payment: ['cash', 'card'],
                jobs: [
                    { position: 'Satış köməkçisi', salary: '₼ 350-450' },
                    { position: 'Kassir', salary: '₼ 300-400' },
                    { position: 'Anbar işçisi', salary: '₼ 400-500' }
                ],
                priceRange: '₼',
                workingHours: {
                    monday: '07:00 - 23:00',
                    tuesday: '07:00 - 23:00',
                    wednesday: '07:00 - 23:00',
                    thursday: '07:00 - 23:00',
                    friday: '07:00 - 23:00',
                    saturday: '07:00 - 23:00',
                    sunday: '08:00 - 22:00'
                },
                featured: false,
                premium: false,
                delivery: false,
                phone: '+994 22 345 67 89',
                address: 'Şah İsmayıl Xətai pr. 45'
            },
            {
                id: 3,
                name: 'Pizza Palace',
                type: 'restaurant',
                cuisine: 'italian',
                location: 'Bakı',
                activeJobs: 6,
                description: 'Ən ləziz italyan pizzaları. Həqiqi italyan reseptləri.',
                logo: 'https://cdn-icons-png.flaticon.com/512/6978/6978255.png',
                rating: 4.7,
                reviewCount: 189,
                features: ['delivery', 'takeaway', 'wifi'],
                services: ['family', 'buffet'],
                hours: '10:00 - 00:00',
                payment: ['cash', 'card', 'online'],
                jobs: [
                    { position: 'Pizza aşpazı', salary: '₼ 600-900' },
                    { position: 'Ofisiant', salary: '₼ 400-550' }
                ],
                priceRange: '₼₼',
                workingHours: {
                    monday: '10:00 - 00:00',
                    tuesday: '10:00 - 00:00',
                    wednesday: '10:00 - 00:00',
                    thursday: '10:00 - 00:00',
                    friday: '10:00 - 01:00',
                    saturday: '10:00 - 01:00',
                    sunday: '10:00 - 00:00'
                },
                featured: true,
                premium: false,
                delivery: true,
                phone: '+994 12 987 65 43',
                address: 'Füzuli küçəsi 78'
            },
            {
                id: 4,
                name: 'Sushi Master',
                type: 'restaurant',
                cuisine: 'asian',
                location: 'Bakı',
                activeJobs: 4,
                description: 'Ən təzə balıq və ənənəvi yapon texnikaları. Professional şeflər.',
                logo: 'https://cdn-icons-png.flaticon.com/512/3082/3082019.png',
                rating: 4.9,
                reviewCount: 267,
                features: ['delivery', 'takeaway', 'wifi', 'alcohol'],
                services: ['fine-dining'],
                hours: '11:00 - 23:00',
                payment: ['cash', 'card', 'online'],
                jobs: [
                    { position: 'Suşi şefi', salary: '₼ 1200-1800' },
                    { position: 'Ofisiant', salary: '₼ 500-700' }
                ],
                priceRange: '₼₼₼',
                workingHours: {
                    monday: '11:00 - 23:00',
                    tuesday: '11:00 - 23:00',
                    wednesday: '11:00 - 23:00',
                    thursday: '11:00 - 23:00',
                    friday: '11:00 - 00:00',
                    saturday: '11:00 - 00:00',
                    sunday: '12:00 - 22:00'
                },
                featured: true,
                premium: true,
                delivery: true,
                phone: '+994 12 555 44 33',
                address: 'Neftçilər pr. 156'
            },
            {
                id: 5,
                name: 'Burger House',
                type: 'fastfood',
                cuisine: 'american',
                location: 'Sumqayıt',
                activeJobs: 3,
                description: 'Ən dadlı burgerlər və kartof fri. Sürətli xidmət.',
                logo: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
                rating: 4.5,
                reviewCount: 134,
                features: ['delivery', 'takeaway'],
                services: ['fastfood'],
                hours: '08:00 - 02:00',
                payment: ['cash', 'card'],
                jobs: [
                    { position: 'Burger aşpazı', salary: '₼ 400-600' },
                    { position: 'Kassir', salary: '₼ 300-450' }
                ],
                priceRange: '₼',
                workingHours: {
                    monday: '08:00 - 02:00',
                    tuesday: '08:00 - 02:00',
                    wednesday: '08:00 - 02:00',
                    thursday: '08:00 - 02:00',
                    friday: '08:00 - 03:00',
                    saturday: '08:00 - 03:00',
                    sunday: '08:00 - 01:00'
                },
                featured: false,
                premium: false,
                delivery: true,
                phone: '+994 18 123 45 67',
                address: 'M.Ə.Rəsulzadə küçəsi 89'
            },
            {
                id: 6,
                name: 'Coffee Lab',
                type: 'cafe',
                cuisine: 'european',
                location: 'Bakı',
                activeJobs: 4,
                description: 'Xüsusi qovrulmuş kofe çeşidləri. Rahat atmosfer.',
                logo: 'https://cdn-icons-png.flaticon.com/512/924/924514.png',
                rating: 4.6,
                reviewCount: 178,
                features: ['wifi', 'terrace'],
                services: ['cafe'],
                hours: '07:00 - 23:00',
                payment: ['cash', 'card', 'online'],
                jobs: [
                    { position: 'Barista', salary: '₼ 500-700' },
                    { position: 'Ofisiant', salary: '₼ 400-550' }
                ],
                priceRange: '₼₼',
                workingHours: {
                    monday: '07:00 - 23:00',
                    tuesday: '07:00 - 23:00',
                    wednesday: '07:00 - 23:00',
                    thursday: '07:00 - 23:00',
                    friday: '07:00 - 00:00',
                    saturday: '08:00 - 00:00',
                    sunday: '08:00 - 22:00'
                },
                featured: false,
                premium: true,
                delivery: false,
                phone: '+994 12 777 88 99',
                address: 'R.Behbudov küçəsi 34'
            }
        ];
    }

    setupEventListeners() {
        // Quick filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickFilter(e.target);
            });
        });

        // Advanced filters
        document.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.handleAdvancedFilter(e.target);
            });
        });

        // Checkbox filters
        document.querySelectorAll('.checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxFilter(e.target);
            });
        });
    }

    handleQuickFilter(button) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        button.classList.add('active');
        
        const filterType = button.dataset.type;
        this.applyQuickFilter(filterType);
    }

    applyQuickFilter(filterType) {
        if (filterType === 'all') {
            this.filteredRestaurants = [...this.restaurants];
        } else {
            this.filteredRestaurants = this.restaurants.filter(restaurant => 
                restaurant.type === filterType
            );
        }
        
        this.renderRestaurants();
    }

    handleAdvancedFilter(select) {
        const filterName = select.id.replace('Filter', '').toLowerCase();
        const value = select.value;
        
        this.currentFilters[filterName] = value;
    }

    handleCheckboxFilter(checkbox) {
        const dataAttribute = Object.keys(checkbox.dataset)[0];
        const value = checkbox.dataset[dataAttribute];
        
        if (!this.currentFilters[dataAttribute]) {
            this.currentFilters[dataAttribute] = [];
        }
        
        if (checkbox.checked) {
            this.currentFilters[dataAttribute].push(value);
        } else {
            this.currentFilters[dataAttribute] = this.currentFilters[dataAttribute].filter(item => item !== value);
        }
    }

    applyFilters() {
        this.filteredRestaurants = this.restaurants.filter(restaurant => {
            // Type filter
            if (this.currentFilters.type !== 'all' && restaurant.type !== this.currentFilters.type) {
                return false;
            }
            
            // Cuisine filter
            if (this.currentFilters.cuisine && restaurant.cuisine !== this.currentFilters.cuisine) {
                return false;
            }
            
            // Location filter
            if (this.currentFilters.location && restaurant.location.toLowerCase() !== this.currentFilters.location) {
                return false;
            }
            
            // Features filter
            if (this.currentFilters.features.length > 0) {
                const hasAllFeatures = this.currentFilters.features.every(feature => 
                    restaurant.features.includes(feature)
                );
                if (!hasAllFeatures) return false;
            }
            
            return true;
        });
        
        this.sortRestaurants();
        this.renderRestaurants();
        this.updateResultsInfo();
    }

    handleSortChange(sortType) {
        this.currentSort = sortType;
        this.applyFilters();
    }

    sortRestaurants() {
        switch(this.currentSort) {
            case 'rating':
                this.filteredRestaurants.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // Əlavə edilə bilər
                break;
            case 'jobs':
                this.filteredRestaurants.sort((a, b) => b.activeJobs - a.activeJobs);
                break;
            case 'name':
                this.filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }

    resetFilters() {
        this.currentFilters = {
            type: 'all',
            cuisine: '',
            location: '',
            priceRange: '',
            jobType: '',
            features: [],
            services: [],
            hours: [],
            payment: []
        };
        
        document.querySelectorAll('.filter-select').forEach(select => {
            select.value = '';
        });
        
        document.querySelectorAll('.checkbox input').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector('.filter-btn[data-type="all"]').classList.add('active');
        
        this.filteredRestaurants = [...this.restaurants];
        this.renderRestaurants();
        this.updateResultsInfo();
    }

    renderRestaurants() {
        const restaurantsGrid = document.getElementById('restaurantsGrid');
        if (!restaurantsGrid) return;

        const startIndex = (this.currentPage - 1) * this.restaurantsPerPage;
        const endIndex = startIndex + this.restaurantsPerPage;
        const restaurantsToShow = this.filteredRestaurants.slice(startIndex, endIndex);

        if (restaurantsToShow.length === 0) {
            restaurantsGrid.innerHTML = this.getNoRestaurantsHTML();
            return;
        }

        restaurantsGrid.innerHTML = restaurantsToShow.map(restaurant => this.getRestaurantHTML(restaurant)).join('');
    }

    getRestaurantHTML(restaurant) {
        const cuisineNames = {
            'turkish': 'Türk',
            'italian': 'İtalyan',
            'asian': 'Asiya',
            'american': 'Amerikan',
            'european': 'Avropa',
            'local': 'Yerli'
        };

        const typeNames = {
            'restaurant': 'Restoran',
            'market': 'Market',
            'cafe': 'Kafe',
            'fastfood': 'Fast Food'
        };

        return `
            <div class="restaurant-card ${restaurant.featured ? 'featured' : ''} ${restaurant.premium ? 'premium' : ''}">
                ${restaurant.premium ? '<div class="premium-badge">PREMIUM</div>' : ''}
                
                <div class="restaurant-header">
                    <img src="${restaurant.logo}" alt="${restaurant.name}" class="restaurant-logo">
                    <div class="restaurant-info">
                        <h3 class="restaurant-name">${restaurant.name}</h3>
                        <div class="restaurant-type">${typeNames[restaurant.type]} • ${cuisineNames[restaurant.cuisine]} mətbəxi</div>
                        
                        <div class="restaurant-rating">
                            <span class="rating-stars">${this.getStarRating(restaurant.rating)}</span>
                            <span class="rating-count">${restaurant.rating} (${restaurant.reviewCount} rəy)</span>
                        </div>

                        <div class="restaurant-meta">
                            <span class="restaurant-location">📍 ${restaurant.location}</span>
                            <span class="restaurant-cuisine">🍽️ ${cuisineNames[restaurant.cuisine]}</span>
                            <span class="restaurant-jobs">💼 ${restaurant.activeJobs} açıq vəzifə</span>
                        </div>
                    </div>
                </div>

                ${restaurant.delivery ? '<div class="delivery-info">🚚 Çatdırılma xidməti mövcuddur</div>' : ''}

                <p class="restaurant-description">${restaurant.description}</p>

                <div class="restaurant-features">
                    ${restaurant.features.map(feature => {
                        const featureIcons = {
                            'delivery': '🚚',
                            'takeaway': '📦',
                            'terrace': '🌿',
                            'parking': '🅿️',
                            'wifi': '📶',
                            'alcohol': '🍷'
                        };
                        return `<span class="feature-tag">${featureIcons[feature]} ${feature}</span>`;
                    }).join('')}
                </div>

                <div class="working-hours">
                    <div class="hours-title">⏰ İş saatları</div>
                    <div class="hours-list">
                        <div class="hour-item">
                            <span>B.e - C.ə</span>
                            <span>${restaurant.workingHours.monday}</span>
                        </div>
                        <div class="hour-item">
                            <span>Şənbə</span>
                            <span>${restaurant.workingHours.saturday}</span>
                        </div>
                        <div class="hour-item">
                            <span>Bazar</span>
                            <span>${restaurant.workingHours.sunday}</span>
                        </div>
                    </div>
                </div>

                <div class="restaurant-jobs-list">
                    <div class="jobs-title">📋 Açıq Vəzifələr</div>
                    <div class="job-items">
                        ${restaurant.jobs.map(job => `
                            <div class="job-item">
                                <span class="job-position">${job.position}</span>
                                <span class="job-salary">${job.salary}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="restaurant-footer">
                    <div class="price-range">${restaurant.priceRange}</div>
                    <div class="restaurant-actions">
                        <a href="tel:${restaurant.phone}" class="view-menu-btn">
                            📞 Zəng et
                        </a>
                        <a href="jobs.html?restaurant=${restaurant.id}" class="apply-jobs-btn">
                            💼 Müraciət et
                        </a>
                        <a href="messages.html?to=restaurant_${restaurant.id}" class="contact-btn">
                            💌 Mesaj göndər
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    getNoRestaurantsHTML() {
        return `
            <div class="no-restaurants">
                <div class="no-restaurants-icon">🍽️</div>
                <h3>Heç bir restoran və ya market tapılmadı</h3>
                <p>Filter parametrlərini dəyişin və ya daha sonra yoxlayın</p>
                <button class="reset-filters-btn" onclick="restaurantsSystem.resetFilters()">Filterləri Sıfırla</button>
            </div>
        `;
    }

    getStarRating(rating) {
        const fullStars = '★'.repeat(Math.floor(rating));
        const halfStar = rating % 1 >= 0.5 ? '⭐' : '';
        const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
        return fullStars + halfStar + emptyStars;
    }

    updateResultsInfo() {
        const resultsInfo = document.querySelector('.results-info');
        if (resultsInfo) {
            const count = this.filteredRestaurants.length;
            resultsInfo.innerHTML = `
                <h3>${count} restoran və market tapıldı</h3>
                <p>Filterləri tətbiq etdiniz</p>
            `;
        }
    }
}

// Initialize restaurants system
document.addEventListener('DOMContentLoaded', () => {
    window.restaurantsSystem = new RestaurantsSystem();
});