// FREELANCERS MANAGEMENT SYSTEM
class FreelancersSystem {
    constructor() {
        this.freelancers = [];
        this.filteredFreelancers = [];
        this.currentFilters = {
            serviceType: '',
            skill: '',
            price: '',
            experience: '',
            rating: [],
            features: [],
            delivery: [],
            payment: []
        };
        this.currentSort = 'rating';
        this.currentPage = 1;
        this.freelancersPerPage = 8;
        this.init();
    }

    init() {
        this.loadFreelancers();
        this.setupEventListeners();
        this.renderFreelancers();
        console.log('👨‍💻 Freelancers system initialized');
    }

    loadFreelancers() {
        this.freelancers = JSON.parse(localStorage.getItem('biznet_freelancers')) || this.getSampleFreelancers();
        this.filteredFreelancers = [...this.freelancers];
    }

    getSampleFreelancers() {
        return [
            {
                id: 1,
                name: 'Əli Məmmədov',
                title: 'Senior Full Stack Developer',
                location: 'Bakı',
                rate: '₼ 60/saat',
                rating: 4.9,
                completedJobs: 127,
                description: '5 illik təcrübəli full stack developer. React, Node.js, MongoDB ixtisasım. 100+ layihə tamamlamışam. Temiz kod və sürətli çatdırılma təmin edirəm.',
                image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'AWS'],
                availability: 'Hazırdır',
                online: true,
                proVerified: true,
                english: true,
                delivery: '24h',
                payment: ['hourly', 'fixed'],
                featured: true,
                premium: true,
                joinDate: '2023-05-15'
            },
            {
                id: 2,
                name: 'Aysel Həsənova',
                title: 'UI/UX Dizayner',
                location: 'Gəncə',
                rate: '₼ 45/saat',
                rating: 4.8,
                completedJobs: 89,
                description: 'Kreativ UI/UX dizayner. İstifadəçi təcrübəsinə yüksək diqqət. Modern və funksional interfeyslər hazırlayıram.',
                image: 'https://cdn-icons-png.flaticon.com/512/4320/4320369.png',
                skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
                availability: '1 həftə içində',
                online: false,
                proVerified: true,
                english: true,
                delivery: '3days',
                payment: ['fixed', 'milestone'],
                featured: false,
                premium: false,
                joinDate: '2023-08-22'
            },
            {
                id: 3,
                name: 'Rəşad İsmayılov',
                title: 'Digital Marketinq Eksperti',
                location: 'Bakı',
                rate: '₼ 55/saat',
                rating: 4.7,
                completedJobs: 156,
                description: 'SEO, Google Ads və sosial media marketinqi üzrə ekspert. Rəqabətli axtarış nəticələrində yüksəlmə təmin edirəm.',
                image: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
                skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Content Strategy'],
                availability: 'Hazırdır',
                online: true,
                proVerified: true,
                english: true,
                russian: true,
                delivery: '1week',
                payment: ['hourly', 'milestone'],
                featured: true,
                premium: true,
                joinDate: '2023-03-10'
            },
            {
                id: 4,
                name: 'Günay Əliyeva',
                title: 'Məzmun Yazıçısı & Tərcüməçi',
                location: 'Sumqayıt',
                rate: '₼ 30/saat',
                rating: 4.6,
                completedJobs: 203,
                description: 'Professional məzmun yazıçısı və tərcüməçi. SEO uyğun mətnlər, blog yazıları, tərcümələr. Sürətli və keyfiyyətli iş.',
                image: 'https://cdn-icons-png.flaticon.com/512/4320/4320367.png',
                skills: ['Content Writing', 'SEO Writing', 'Translation', 'Proofreading', 'Blogging'],
                availability: 'Hazırdır',
                online: true,
                proVerified: false,
                english: true,
                russian: true,
                delivery: 'flexible',
                payment: ['fixed', 'hourly'],
                featured: false,
                premium: false,
                joinDate: '2023-11-05'
            },
            {
                id: 5,
                name: 'Orxan Cəfərov',
                title: 'Mobil Application Developer',
                location: 'Bakı',
                rate: '₼ 70/saat',
                rating: 4.9,
                completedJobs: 94,
                description: 'iOS və Android üçün native və cross-platform mobil tətbiqlər hazırlayıram. React Native və Flutter ixtisasım.',
                image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
                availability: '2 gün içində',
                online: false,
                proVerified: true,
                english: true,
                delivery: '1week',
                payment: ['fixed', 'milestone'],
                featured: true,
                premium: true,
                joinDate: '2023-06-18'
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
        
        const filterType = button.textContent.trim();
        this.applyQuickFilter(filterType);
    }

    applyQuickFilter(filterType) {
        switch(filterType) {
            case 'Hamısı':
                this.filteredFreelancers = [...this.freelancers];
                break;
            case 'Ən Yaxşılar':
                this.filteredFreelancers = this.freelancers.filter(f => f.rating >= 4.5);
                break;
            case 'Yeni':
                this.filteredFreelancers = this.freelancers.filter(f => {
                    const joinDate = new Date(f.joinDate);
                    const today = new Date();
                    const diffTime = Math.abs(today - joinDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 30;
                });
                break;
            case 'Premium':
                this.filteredFreelancers = this.freelancers.filter(f => f.premium);
                break;
            case 'Online':
                this.filteredFreelancers = this.freelancers.filter(f => f.online);
                break;
            case 'Yerli':
                this.filteredFreelancers = this.freelancers.filter(f => f.location === 'Bakı');
                break;
        }
        
        this.renderFreelancers();
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
        this.filteredFreelancers = this.freelancers.filter(freelancer => {
            // Service type filter
            if (this.currentFilters.serviceType && freelancer.title.toLowerCase().indexOf(this.currentFilters.serviceType.toLowerCase()) === -1) {
                return false;
            }
            
            // Skill filter
            if (this.currentFilters.skill && !freelancer.skills.some(skill => 
                skill.toLowerCase().includes(this.currentFilters.skill.toLowerCase()))) {
                return false;
            }
            
            // Rating filter
            if (this.currentFilters.rating.length > 0) {
                const minRating = Math.min(...this.currentFilters.rating.map(r => parseInt(r)));
                if (freelancer.rating < minRating) {
                    return false;
                }
            }
            
            // Features filter
            if (this.currentFilters.features.length > 0) {
                const hasAllFeatures = this.currentFilters.features.every(feature => 
                    freelancer[feature] === true
                );
                if (!hasAllFeatures) return false;
            }
            
            return true;
        });
        
        this.sortFreelancers();
        this.renderFreelancers();
        this.updateResultsInfo();
    }

    handleSortChange(sortType) {
        this.currentSort = sortType;
        this.applyFilters();
    }

    sortFreelancers() {
        switch(this.currentSort) {
            case 'rating':
                this.filteredFreelancers.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredFreelancers.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
                break;
            case 'price-high':
                this.filteredFreelancers.sort((a, b) => this.extractRate(b) - this.extractRate(a));
                break;
            case 'price-low':
                this.filteredFreelancers.sort((a, b) => this.extractRate(a) - this.extractRate(b));
                break;
            case 'completed':
                this.filteredFreelancers.sort((a, b) => b.completedJobs - a.completedJobs);
                break;
        }
    }

    extractRate(freelancer) {
        const rateMatch = freelancer.rate.match(/(\d+)/);
        return rateMatch ? parseInt(rateMatch[1]) : 0;
    }

    resetFilters() {
        this.currentFilters = {
            serviceType: '',
            skill: '',
            price: '',
            experience: '',
            rating: [],
            features: [],
            delivery: [],
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
        
        document.querySelector('.filter-btn').classList.add('active');
        
        this.filteredFreelancers = [...this.freelancers];
        this.renderFreelancers();
        this.updateResultsInfo();
    }

    renderFreelancers() {
        const freelancersGrid = document.getElementById('freelancersGrid');
        if (!freelancersGrid) return;

        const startIndex = (this.currentPage - 1) * this.freelancersPerPage;
        const endIndex = startIndex + this.freelancersPerPage;
        const freelancersToShow = this.filteredFreelancers.slice(startIndex, endIndex);

        if (freelancersToShow.length === 0) {
            freelancersGrid.innerHTML = this.getNoFreelancersHTML();
            return;
        }

        freelancersGrid.innerHTML = freelancersToShow.map(freelancer => this.getFreelancerHTML(freelancer)).join('');
    }

    getFreelancerHTML(freelancer) {
        const isSaved = this.isFreelancerSaved(freelancer.id);
        const savedClass = isSaved ? 'saved' : '';
        
        return `
            <div class="freelancer-card ${freelancer.featured ? 'featured' : ''} ${freelancer.premium ? 'premium' : ''}">
                ${freelancer.online ? '<div class="online-status">Online</div>' : ''}
                
                <div class="freelancer-header">
                    <img src="${freelancer.image}" alt="${freelancer.name}" class="freelancer-avatar">
                    <div class="freelancer-info">
                        <h3 class="freelancer-name">
                            ${freelancer.name}
                            ${freelancer.proVerified ? '<span class="verification-badge">✅ Pro</span>' : ''}
                        </h3>
                        <div class="freelancer-title">${freelancer.title}</div>
                        <div class="freelancer-meta">
                            <span class="freelancer-location">📍 ${freelancer.location}</span>
                            <span class="freelancer-rating">⭐ ${freelancer.rating} (${freelancer.completedJobs} iş)</span>
                            <span class="freelancer-jobs">✅ ${freelancer.completedJobs} tamamlanmış iş</span>
                        </div>
                    </div>
                </div>
                
                <p class="freelancer-description">${freelancer.description}</p>
                
                <div class="freelancer-skills">
                    ${freelancer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                
                <div class="freelancer-footer">
                    <div class="freelancer-pricing">
                        <div class="freelancer-rate">${freelancer.rate}</div>
                        <div class="freelancer-availability">${freelancer.availability}</div>
                    </div>
                    
                    <div class="freelancer-actions">
                        <button class="save-freelancer-btn ${savedClass}" data-freelancer-id="${freelancer.id}">
                            ${isSaved ? '★' : '☆'}
                        </button>
                        <a href="profile.html?id=${freelancer.id}" class="view-profile-btn">
                            👁️ Profilə bax
                        </a>
                        <a href="messages.html?to=${freelancer.id}" class="contact-btn">
                            💌 Əlaqə
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    getNoFreelancersHTML() {
        return `
            <div class="no-freelancers">
                <div class="no-freelancers-icon">🔍</div>
                <h3>Heç bir freelancer tapılmadı</h3>
                <p>Filter parametrlərini dəyişin və ya daha sonra yoxlayın</p>
                <button class="reset-filters-btn" onclick="freelancersSystem.resetFilters()">Filterləri Sıfırla</button>
            </div>
        `;
    }

    isFreelancerSaved(freelancerId) {
        const savedFreelancers = JSON.parse(localStorage.getItem('biznet_saved_freelancers')) || [];
        return savedFreelancers.includes(freelancerId);
    }

    updateResultsInfo() {
        const resultsInfo = document.querySelector('.results-info');
        if (resultsInfo) {
            const count = this.filteredFreelancers.length;
            resultsInfo.innerHTML = `
                <h3>${count} freelancer tapıldı</h3>
                <p>Filterləri tətbiq etdiniz</p>
            `;
        }
    }
}

// Initialize freelancers system
document.addEventListener('DOMContentLoaded', () => {
    window.freelancersSystem = new FreelancersSystem();
});