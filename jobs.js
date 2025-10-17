// JOBS MANAGEMENT SYSTEM
class JobsSystem {
    constructor() {
        this.jobs = [];
        this.filteredJobs = [];
        this.currentFilters = {
            category: '',
            city: '',
            salary: '',
            experience: '',
            jobType: [],
            companySize: [],
            education: [],
            benefits: []
        };
        this.currentSort = 'newest';
        this.currentPage = 1;
        this.jobsPerPage = 10;
        this.init();
    }

    init() {
        this.loadJobs();
        this.setupEventListeners();
        this.renderJobs();
        console.log('📊 Jobs system initialized');
    }

    loadJobs() {
        // LocalStorage-dan və ya sample data-dan yüklə
        this.jobs = JSON.parse(localStorage.getItem('biznet_jobs')) || this.getSampleJobs();
        this.filteredJobs = [...this.jobs];
    }

    getSampleJobs() {
        return [
            {
                id: 1,
                title: 'Senior Veb Developer',
                company: 'TechCorp MMC',
                location: 'Bakı',
                salary: '₼ 2500-4000',
                type: 'Tam ştat',
                experience: '3-5 il',
                category: 'it',
                description: 'React, Node.js və MongoDB bilən senior veb developer axtarırıq. Layihə rəhbərliyi təcrübəsi üstünlükdür.',
                image: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
                date: '2024-01-15',
                featured: true,
                premium: true,
                tags: ['React', 'Node.js', 'MongoDB', 'Senior'],
                benefits: ['sığorta', 'yemək', 'bonus']
            },
            {
                id: 2,
                title: 'Qrafik Dizayner',
                company: 'Creative Studio',
                location: 'Gəncə',
                salary: '₼ 800-1500',
                type: 'Tam ştat',
                experience: '1-3 il',
                category: 'design',
                description: 'Adobe Creative Suite bilən kreativ dizayner. UI/UX dizayn təcrübəsi arzuolunandır.',
                image: 'https://cdn-icons-png.flaticon.com/512/1995/1995511.png',
                date: '2024-01-14',
                featured: false,
                premium: false,
                tags: ['Photoshop', 'Illustrator', 'UI/UX'],
                benefits: ['yemək', 'nəqliyyat']
            },
            {
                id: 3,
                title: 'Digital Marketinq Meneceri',
                company: 'MarketPro',
                location: 'Bakı',
                salary: '₼ 1200-2000',
                type: 'Tam ştat',
                experience: '2-4 il',
                category: 'marketing',
                description: 'SEO, SEM və sosial media marketinqi bilən menecer axtarırıq. Kampaniya idarəetmə təcrübəsi lazımdır.',
                image: 'https://cdn-icons-png.flaticon.com/512/3142/3142787.png',
                date: '2024-01-13',
                featured: true,
                premium: false,
                tags: ['SEO', 'Google Ads', 'SMM'],
                benefits: ['sığorta', 'bonus']
            },
            {
                id: 4,
                title: 'Aşpaz',
                company: 'Lezzet Restoran',
                location: 'Bakı',
                salary: '₼ 700-1200',
                type: 'Tam ştat',
                experience: '2+ il',
                category: 'restaurant',
                description: 'Türk və Azərbaycan mətbəxi bilən təcrübəli aşpaz axtarırıq. Komanda işi bacarığı vacibdir.',
                image: 'https://cdn-icons-png.flaticon.com/512/878/878052.png',
                date: '2024-01-12',
                featured: false,
                premium: true,
                tags: ['Türk mətbəxi', 'Aşpaz', 'Restoran'],
                benefits: ['yemək', 'nəqliyyat']
            },
            {
                id: 5,
                title: 'Satış Mütəxəssisi',
                company: 'SalesHouse',
                location: 'Sumqayıt',
                salary: '₼ 600-1000 + bonus',
                type: 'Yarımştat',
                experience: 'Təcrübəsiz',
                category: 'sales',
                description: 'Komunikasiya bacarığı yüksək, satışa həvəsi olan gənc mütəxəssis axtarırıq. Təlim veriləcək.',
                image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                date: '2024-01-11',
                featured: false,
                premium: false,
                tags: ['Satış', 'Kommunikasiya', 'Təcrübəsiz'],
                benefits: ['bonus']
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

        // Apply filters button
        document.querySelector('.apply-filters-btn').addEventListener('click', () => {
            this.applyFilters();
        });

        // Reset filters button
        document.querySelector('.reset-filters-btn').addEventListener('click', () => {
            this.resetFilters();
        });

        // Sort options
        document.querySelector('.sort-select').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // Pagination
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!e.target.classList.contains('disabled')) {
                    this.handlePagination(e.target);
                }
            });
        });

        // Save job buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.save-job-btn')) {
                this.handleSaveJob(e.target.closest('.save-job-btn'));
            }
        });
    }

    handleQuickFilter(button) {
        // Remove active class from all quick filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterType = button.textContent.trim();
        this.applyQuickFilter(filterType);
    }

    applyQuickFilter(filterType) {
        switch(filterType) {
            case 'Hamısı':
                this.filteredJobs = [...this.jobs];
                break;
            case 'Yeni':
                this.filteredJobs = this.jobs.filter(job => {
                    const jobDate = new Date(job.date);
                    const today = new Date();
                    const diffTime = Math.abs(today - jobDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 3;
                });
                break;
            case 'Premium':
                this.filteredJobs = this.jobs.filter(job => job.premium);
                break;
            case 'Uzaq İş':
                this.filteredJobs = this.jobs.filter(job => job.location === 'remote');
                break;
            case 'Tam Ştat':
                this.filteredJobs = this.jobs.filter(job => job.type === 'Tam ştat');
                break;
            case 'Yarımştat':
                this.filteredJobs = this.jobs.filter(job => job.type === 'Yarımştat');
                break;
        }
        
        this.renderJobs();
    }

    handleAdvancedFilter(select) {
        const filterName = select.previousElementSibling.textContent.toLowerCase();
        const value = select.value;
        
        this.currentFilters[filterName] = value;
    }

    handleCheckboxFilter(checkbox) {
        const label = checkbox.nextElementSibling.textContent.trim();
        const section = checkbox.closest('.filter-section');
        const filterName = section.querySelector('h3').textContent.toLowerCase();
        
        if (!this.currentFilters[filterName]) {
            this.currentFilters[filterName] = [];
        }
        
        if (checkbox.checked) {
            this.currentFilters[filterName].push(label);
        } else {
            this.currentFilters[filterName] = this.currentFilters[filterName].filter(item => item !== label);
        }
    }

    applyFilters() {
        this.filteredJobs = this.jobs.filter(job => {
            // Category filter
            if (this.currentFilters.category && job.category !== this.currentFilters.category) {
                return false;
            }
            
            // City filter
            if (this.currentFilters.city && job.location.toLowerCase() !== this.currentFilters.city) {
                return false;
            }
            
            // Salary filter
            if (this.currentFilters.salary) {
                const salaryRange = this.currentFilters.salary;
                const jobSalary = job.salary;
                // Burada maaş aralığı yoxlaması əlavə et
            }
            
            // Experience filter
            if (this.currentFilters.experience && job.experience !== this.currentFilters.experience) {
                return false;
            }
            
            // Job type filter
            if (this.currentFilters['iş növü'] && this.currentFilters['iş növü'].length > 0) {
                if (!this.currentFilters['iş növü'].includes(job.type)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Apply sorting
        this.sortJobs();
        
        this.renderJobs();
        this.updateResultsInfo();
    }

    sortJobs() {
        switch(this.currentSort) {
            case 'newest':
                this.filteredJobs.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                this.filteredJobs.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'salary-high':
                this.filteredJobs.sort((a, b) => this.extractSalary(b) - this.extractSalary(a));
                break;
            case 'salary-low':
                this.filteredJobs.sort((a, b) => this.extractSalary(a) - this.extractSalary(b));
                break;
            case 'popular':
                this.filteredJobs.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }
    }

    extractSalary(job) {
        const salaryMatch = job.salary.match(/(\d+)/);
        return salaryMatch ? parseInt(salaryMatch[1]) : 0;
    }

    resetFilters() {
        // Reset all filters
        this.currentFilters = {
            category: '',
            city: '',
            salary: '',
            experience: '',
            jobType: [],
            companySize: [],
            education: [],
            benefits: []
        };
        
        // Reset UI
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
        
        this.filteredJobs = [...this.jobs];
        this.renderJobs();
        this.updateResultsInfo();
    }

    renderJobs() {
        const jobsGrid = document.getElementById('jobsGrid');
        if (!jobsGrid) return;

        const startIndex = (this.currentPage - 1) * this.jobsPerPage;
        const endIndex = startIndex + this.jobsPerPage;
        const jobsToShow = this.filteredJobs.slice(startIndex, endIndex);

        if (jobsToShow.length === 0) {
            jobsGrid.innerHTML = this.getNoJobsHTML();
            return;
        }

        jobsGrid.innerHTML = jobsToShow.map(job => this.getJobHTML(job)).join('');
    }

    getJobHTML(job) {
        const isSaved = this.isJobSaved(job.id);
        const savedClass = isSaved ? 'saved' : '';
        
        return `
            <div class="job-item ${job.featured ? 'featured' : ''} ${job.premium ? 'premium' : ''}">
                <img src="${job.image}" alt="${job.company}" class="job-avatar">
                <div class="job-content">
                    <h3 class="job-title">${job.title}</h3>
                    <a href="#" class="job-company">${job.company}</a>
                    <div class="job-meta">
                        <span class="job-location">📍 ${job.location}</span>
                        <span class="job-type">🕒 ${job.type}</span>
                        <span class="job-date">📅 ${this.formatDate(job.date)}</span>
                        <span class="job-experience">👨‍💼 ${job.experience}</span>
                    </div>
                    <p class="job-description">${job.description}</p>
                    <div class="job-tags">
                        ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="job-footer">
                        <div class="job-salary">${job.salary}</div>
                        <div class="job-actions">
                            <button class="save-job-btn ${savedClass}" data-job-id="${job.id}">
                                ${isSaved ? '★ Saxlanılıb' : '☆ Saxla'}
                            </button>
                            <a href="messages.html" class="apply-now-btn" data-job-id="${job.id}">Müraciət et</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getNoJobsHTML() {
        return `
            <div class="no-jobs">
                <div class="no-jobs-icon">🔍</div>
                <h3>Heç bir iş elanı tapılmadı</h3>
                <p>Filter parametrlərini dəyişin və ya daha sonra yoxlayın</p>
                <button class="reset-filters-btn" onclick="jobsSystem.resetFilters()">Filterləri Sıfırla</button>
            </div>
        `;
    }

    handlePagination(button) {
        const pageText = button.textContent;
        
        if (pageText === 'Əvvəlki') {
            this.currentPage--;
        } else if (pageText === 'Növbəti') {
            this.currentPage++;
        } else {
            this.currentPage = parseInt(pageText);
        }
        
        this.renderJobs();
        this.updatePaginationUI();
    }

    updatePaginationUI() {
        const totalPages = Math.ceil(this.filteredJobs.length / this.jobsPerPage);
        const pagination = document.querySelector('.pagination');
        
        if (!pagination) return;
        
        // Pagination logikası burada implement olunacaq
    }

    handleSaveJob(button) {
        const jobId = parseInt(button.dataset.jobId);
        const isCurrentlySaved = button.classList.contains('saved');
        
        if (isCurrentlySaved) {
            this.unsaveJob(jobId);
            button.classList.remove('saved');
            button.innerHTML = '☆ Saxla';
            showNotification('İş elanı saxlananlardan silindi', 'info');
        } else {
            this.saveJob(jobId);
            button.classList.add('saved');
            button.innerHTML = '★ Saxlanılıb';
            showNotification('İş elanı saxlananlara əlavə edildi', 'success');
        }
    }

    saveJob(jobId) {
        let savedJobs = JSON.parse(localStorage.getItem('biznet_saved_jobs')) || [];
        if (!savedJobs.includes(jobId)) {
            savedJobs.push(jobId);
            localStorage.setItem('biznet_saved_jobs', JSON.stringify(savedJobs));
        }
    }

    unsaveJob(jobId) {
        let savedJobs = JSON.parse(localStorage.getItem('biznet_saved_jobs')) || [];
        savedJobs = savedJobs.filter(id => id !== jobId);
        localStorage.setItem('biznet_saved_jobs', JSON.stringify(savedJobs));
    }

    isJobSaved(jobId) {
        const savedJobs = JSON.parse(localStorage.getItem('biznet_saved_jobs')) || [];
        return savedJobs.includes(jobId);
    }

    updateResultsInfo() {
        const resultsInfo = document.querySelector('.results-info');
        if (resultsInfo) {
            const count = this.filteredJobs.length;
            resultsInfo.innerHTML = `
                <h3>${count} iş elanı tapıldı</h3>
                <p>Filterləri tətbiq etdiniz</p>
            `;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Dünən';
        if (diffDays === 0) return 'Bugün';
        if (diffDays < 7) return `${diffDays} gün əvvəl`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} həftə əvvəl`;
        
        return date.toLocaleDateString('az-AZ');
    }
}

// Initialize jobs system
document.addEventListener('DOMContentLoaded', () => {
    window.jobsSystem = new JobsSystem();
});