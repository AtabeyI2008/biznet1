// COMPANIES MANAGEMENT SYSTEM
class CompaniesSystem {
    constructor() {
        this.companies = [];
        this.filteredCompanies = [];
        this.currentPage = 1;
        this.companiesPerPage = 9;
        this.init();
    }

    init() {
        this.loadCompanies();
        this.setupEventListeners();
        this.renderCompanies();
        console.log('🏢 Companies system initialized');
    }

    loadCompanies() {
        this.companies = JSON.parse(localStorage.getItem('biznet_companies')) || this.getSampleCompanies();
        this.filteredCompanies = [...this.companies];
    }

    getSampleCompanies() {
        return [
            {
                id: 1,
                name: 'TechCorp MMC',
                industry: 'IT & Texnologiya',
                location: 'Bakı',
                size: '101-500',
                activeJobs: 15,
                description: 'Rəqəmsal transformasiya və innovativ texnoloji həllər üzrə aparıcı şirkət. 10 ildən çox təcrübə.',
                logo: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
                rating: 4.8,
                reviewCount: 124,
                specialties: ['Veb Development', 'Mobil Tətbiqlər', 'AI & ML', 'Cloud Solutions'],
                benefits: ['Sığorta', 'Yemək', 'Bonus', 'Təlim'],
                featured: true,
                premium: true,
                founded: 2014,
                employees: 250,
                projects: 500,
                website: 'https://techcorp.az',
                email: 'career@techcorp.az'
            },
            {
                id: 2,
                name: 'Creative Studio',
                industry: 'Dizayn & Marketinq',
                location: 'Gəncə',
                size: '11-50',
                activeJobs: 8,
                description: 'Yaradıcı dizayn həlləri və brend strateqiyaları üzrə ixtisaslaşmış studiya.',
                logo: 'https://cdn-icons-png.flaticon.com/512/1995/1995511.png',
                rating: 4.6,
                reviewCount: 89,
                specialties: ['UI/UX Dizayn', 'Qrafik Dizayn', 'Branding', 'Digital Marketinq'],
                benefits: ['Yemək', 'Təlim', 'Esnek saat'],
                featured: false,
                premium: false,
                founded: 2018,
                employees: 35,
                projects: 200,
                website: 'https://creativestudio.az',
                email: 'info@creativestudio.az'
            },
            {
                id: 3,
                name: 'MarketPro',
                industry: 'Digital Marketinq',
                location: 'Bakı',
                size: '51-100',
                activeJobs: 12,
                description: 'SEO, SEM və sosial media marketinqi üzrə ekspert komanda. Rəqəmsal böyümə üçün həllər.',
                logo: 'https://cdn-icons-png.flaticon.com/512/3142/3142787.png',
                rating: 4.7,
                reviewCount: 156,
                specialties: ['SEO', 'Google Ads', 'SMM', 'Content Marketinq'],
                benefits: ['Sığorta', 'Bonus', 'Karyera inkişafı', 'Yemək'],
                featured: true,
                premium: true,
                founded: 2016,
                employees: 80,
                projects: 350,
                website: 'https://marketpro.az',
                email: 'hr@marketpro.az'
            },
            {
                id: 4,
                name: 'SalesHouse',
                industry: 'Satış & Biznes',
                location: 'Sumqayıt',
                size: '101-500',
                activeJobs: 6,
                description: 'Satış strategiyaları və biznes inkişafı üzrə lider şirkət. 5 ildir bazar lideri.',
                logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                rating: 4.5,
                reviewCount: 78,
                specialties: ['Satış Strategiyaları', 'Biznes Development', 'Müştəri Xidməti'],
                benefits: ['Yüksək bonus', 'Karyera imkanları', 'Yemək'],
                featured: false,
                premium: false,
                founded: 2019,
                employees: 150,
                projects: 180,
                website: 'https://saleshouse.az',
                email: 'careers@saleshouse.az'
            },
            {
                id: 5,
                name: 'FinanceTrust Bank',
                industry: 'Maliyyə & Bankçılıq',
                location: 'Bakı',
                size: '500+',
                activeJobs: 25,
                description: 'Azərbaycanın etibarlı banklarından biri. 20 ildən çox təcrübə.',
                logo: 'https://cdn-icons-png.flaticon.com/512/259/259399.png',
                rating: 4.4,
                reviewCount: 234,
                specialties: ['Bankçılıq', 'İnvestisiya', 'Kredit', 'Maliyyə Xidmətləri'],
                benefits: ['Sığorta', 'Yemək', 'Nəqliyyat', 'Əlavə tətillər'],
                featured: true,
                premium: true,
                founded: 2003,
                employees: 1200,
                projects: null,
                website: 'https://financetrust.az',
                email: 'hr@financetrust.az'
            },
            {
                id: 6,
                name: 'HealthCare Plus',
                industry: 'Səhiyyə',
                location: 'Bakı',
                size: '201-500',
                activeJobs: 18,
                description: 'Müasir tibbi xidmətlər və səhiyyə həlləri üzrə aparıcı şirkət.',
                logo: 'https://cdn-icons-png.flaticon.com/512/2966/2966323.png',
                rating: 4.9,
                reviewCount: 189,
                specialties: ['Tibb Xidmətləri', 'Həkimlik', 'Tibb Bacısı', 'Laboratoriya'],
                benefits: ['Sığorta', 'Yemək', 'Nəqliyyat', 'Tibb xidməti'],
                featured: false,
                premium: true,
                founded: 2015,
                employees: 300,
                projects: null,
                website: 'https://healthcareplus.az',
                email: 'careers@healthcareplus.az'
            },
            {
                id: 7,
                name: 'EduSmart',
                industry: 'Təhsil',
                location: 'Bakı',
                size: '51-100',
                activeJobs: 10,
                description: 'İnnovativ təhsil həlləri və peşəkar təlimlər üzrə ixtisaslaşmış mərkəz.',
                logo: 'https://cdn-icons-png.flaticon.com/512/1940/1940611.png',
                rating: 4.7,
                reviewCount: 95,
                specialties: ['Təhsil', 'Təlim', 'Konsaltinq', 'Karyera İnkişafı'],
                benefits: ['Təlim', 'Karyera inkişafı', 'Yemək', 'Esnek saat'],
                featured: true,
                premium: false,
                founded: 2017,
                employees: 65,
                projects: 120,
                website: 'https://edusmart.az',
                email: 'info@edusmart.az'
            },
            {
                id: 8,
                name: 'Logistics Pro',
                industry: 'Logistika',
                location: 'Bakı',
                size: '101-500',
                activeJobs: 14,
                description: 'Beynəlxalq logistika və daşıma xidmətləri üzrə aparıcı şirkət.',
                logo: 'https://cdn-icons-png.flaticon.com/512/2692/2692887.png',
                rating: 4.5,
                reviewCount: 112,
                specialties: ['Logistika', 'Daşıma', 'Anbar', 'Təchizat Zənciri'],
                benefits: ['Sığorta', 'Yemək', 'Nəqliyyat', 'Bonus'],
                featured: false,
                premium: false,
                founded: 2012,
                employees: 180,
                projects: null,
                website: 'https://logisticspro.az',
                email: 'hr@logisticspro.az'
            },
            {
                id: 9,
                name: 'RealEstate Experts',
                industry: 'Daşınmaz Əmlak',
                location: 'Bakı',
                size: '11-50',
                activeJobs: 7,
                description: 'Daşınmaz əmlak bazarında peşəkar xidmətlər və konsaltinq.',
                logo: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
                rating: 4.8,
                reviewCount: 67,
                specialties: ['Daşınmaz Əmlak', 'Konsaltinq', 'Satış', 'Kirayə'],
                benefits: ['Yüksək komissiya', 'Yemək', 'Karyera imkanları'],
                featured: false,
                premium: true,
                founded: 2020,
                employees: 25,
                projects: 80,
                website: 'https://realestateexperts.az',
                email: 'info@realestateexperts.az'
            }
        ];
    }

    setupEventListeners() {
        // Follow company buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.follow-company-btn')) {
                this.handleFollowCompany(e.target.closest('.follow-company-btn'));
            }
        });

        // View jobs buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-jobs-btn')) {
                this.handleViewJobs(e.target.closest('.view-jobs-btn'));
            }
        });

        // Contact company buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.contact-company-btn')) {
                this.handleContactCompany(e.target.closest('.contact-company-btn'));
            }
        });
    }

    renderCompanies() {
        const companiesGrid = document.getElementById('companiesGrid');
        if (!companiesGrid) return;

        const startIndex = (this.currentPage - 1) * this.companiesPerPage;
        const endIndex = startIndex + this.companiesPerPage;
        const companiesToShow = this.filteredCompanies.slice(startIndex, endIndex);

        if (companiesToShow.length === 0) {
            companiesGrid.innerHTML = this.getNoCompaniesHTML();
            return;
        }

        companiesGrid.innerHTML = companiesToShow.map(company => this.getCompanyHTML(company)).join('');
    }

    getCompanyHTML(company) {
        const isFollowing = this.isCompanyFollowing(company.id);
        const followingClass = isFollowing ? 'following' : '';
        
        return `
            <div class="company-card ${company.featured ? 'featured' : ''} ${company.premium ? 'premium' : ''}">
                ${company.premium ? '<div class="premium-badge">PREMIUM</div>' : ''}
                
                <div class="company-header">
                    <img src="${company.logo}" alt="${company.name}" class="company-logo">
                    <h3 class="company-name">${company.name}</h3>
                    <div class="company-industry">${company.industry}</div>
                    
                    <div class="company-rating">
                        <span class="rating-stars">${this.getStarRating(company.rating)}</span>
                        <span class="rating-count">${company.rating} (${company.reviewCount} rəy)</span>
                    </div>
                </div>

                <div class="company-meta">
                    <span class="company-location">📍 ${company.location}</span>
                    <span class="company-size">👥 ${company.size} işçi</span>
                    <span class="company-jobs">💼 ${company.activeJobs} açıq vəzifə</span>
                </div>

                <p class="company-description">${company.description}</p>

                <div class="company-specialties">
                    ${company.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>

                <div class="company-stats">
                    <div class="stat-item">
                        <span class="stat-number">${company.founded}</span>
                        <span class="stat-label">Qurulub</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${company.employees}</span>
                        <span class="stat-label">İşçi</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${company.projects || '-'}</span>
                        <span class="stat-label">Layihə</span>
                    </div>
                </div>

                <div class="company-benefits">
                    ${company.benefits.map(benefit => `
                        <div class="benefit-item">
                            <span>✅</span>
                            <span>${benefit}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="company-footer">
                    <button class="follow-company-btn ${followingClass}" data-company-id="${company.id}">
                        ${isFollowing ? '✓ İzlənilir' : '+ İzlə'}
                    </button>
                    <a href="jobs.html?company=${company.id}" class="view-jobs-btn">
                        👁️ Vəzifələrə bax
                    </a>
                    <a href="messages.html?to=company_${company.id}" class="contact-company-btn">
                        💌 Əlaqə
                    </a>
                </div>
            </div>
        `;
    }

    getNoCompaniesHTML() {
        return `
            <div class="no-companies">
                <div class="no-companies-icon">🏢</div>
                <h3>Heç bir şirkət tapılmadı</h3>
                <p>Daha sonra yoxlayın və ya digər kateqoriyalara baxın</p>
                <a href="index.html" class="view-jobs-btn">Ana Səhifəyə Qayıt</a>
            </div>
        `;
    }

    getStarRating(rating) {
        const fullStars = '★'.repeat(Math.floor(rating));
        const halfStar = rating % 1 >= 0.5 ? '⭐' : '';
        const emptyStars = '☆'.repeat(5 - Math.ceil(rating));
        return fullStars + halfStar + emptyStars;
    }

    handleFollowCompany(button) {
        const companyId = parseInt(button.dataset.companyId);
        const isCurrentlyFollowing = button.classList.contains('following');
        
        if (isCurrentlyFollowing) {
            this.unfollowCompany(companyId);
            button.classList.remove('following');
            button.innerHTML = '+ İzlə';
            showNotification('Şirkət izlənilənlərdən silindi', 'info');
        } else {
            this.followCompany(companyId);
            button.classList.add('following');
            button.innerHTML = '✓ İzlənilir';
            showNotification('Şirkət izlənilənlərə əlavə edildi', 'success');
        }
    }

    followCompany(companyId) {
        let followedCompanies = JSON.parse(localStorage.getItem('biznet_followed_companies')) || [];
        if (!followedCompanies.includes(companyId)) {
            followedCompanies.push(companyId);
            localStorage.setItem('biznet_followed_companies', JSON.stringify(followedCompanies));
        }
    }

    unfollowCompany(companyId) {
        let followedCompanies = JSON.parse(localStorage.getItem('biznet_followed_companies')) || [];
        followedCompanies = followedCompanies.filter(id => id !== companyId);
        localStorage.setItem('biznet_followed_companies', JSON.stringify(followedCompanies));
    }

    isCompanyFollowing(companyId) {
        const followedCompanies = JSON.parse(localStorage.getItem('biznet_followed_companies')) || [];
        return followedCompanies.includes(companyId);
    }

    handleViewJobs(button) {
        const companyId = button.closest('.company-card').querySelector('.follow-company-btn').dataset.companyId;
        const company = this.companies.find(c => c.id === parseInt(companyId));
        
        if (company) {
            // Jobs səhifəsinə yönləndir və şirkət filteri tətbiq et
            localStorage.setItem('biznet_company_filter', companyId);
            window.location.href = `jobs.html?company=${companyId}`;
        }
    }

    handleContactCompany(button) {
        const companyId = button.closest('.company-card').querySelector('.follow-company-btn').dataset.companyId;
        const company = this.companies.find(c => c.id === parseInt(companyId));
        
        if (company) {
            // Mesajlaşma səhifəsinə yönləndir
            window.location.href = `messages.html?to=company_${companyId}`;
        }
    }

    filterCompaniesByIndustry(industry) {
        if (!industry) {
            this.filteredCompanies = [...this.companies];
        } else {
            this.filteredCompanies = this.companies.filter(company => 
                company.industry.toLowerCase().includes(industry.toLowerCase())
            );
        }
        this.renderCompanies();
    }

    filterCompaniesByLocation(location) {
        if (!location) {
            this.filteredCompanies = [...this.companies];
        } else {
            this.filteredCompanies = this.companies.filter(company => 
                company.location.toLowerCase().includes(location.toLowerCase())
            );
        }
        this.renderCompanies();
    }

    searchCompanies(query) {
        if (!query) {
            this.filteredCompanies = [...this.companies];
        } else {
            this.filteredCompanies = this.companies.filter(company => 
                company.name.toLowerCase().includes(query.toLowerCase()) ||
                company.industry.toLowerCase().includes(query.toLowerCase()) ||
                company.specialties.some(specialty => 
                    specialty.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
        this.renderCompanies();
    }

    getCompanyById(companyId) {
        return this.companies.find(company => company.id === companyId);
    }

    getCompaniesByIndustry(industry) {
        return this.companies.filter(company => company.industry === industry);
    }

    getFeaturedCompanies() {
        return this.companies.filter(company => company.featured);
    }

    getPremiumCompanies() {
        return this.companies.filter(company => company.premium);
    }
}

// Initialize companies system
document.addEventListener('DOMContentLoaded', () => {
    window.companiesSystem = new CompaniesSystem();
});

// Utility functions for companies
function searchCompanies(query) {
    if (window.companiesSystem) {
        window.companiesSystem.searchCompanies(query);
    }
}

function filterCompaniesByIndustry(industry) {
    if (window.companiesSystem) {
        window.companiesSystem.filterCompaniesByIndustry(industry);
    }
}

function filterCompaniesByLocation(location) {
    if (window.companiesSystem) {
        window.companiesSystem.filterCompaniesByLocation(location);
    }
}