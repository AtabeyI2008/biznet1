class JobsFilter {
    constructor() {
        this.filters = {
            city: '',
            category: '',
            jobType: '',
            salary: ''
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupApplicationHandlers();
        console.log('JobsFilter initialized');
    }

    setupEventListeners() {
        // Filter select-lər
        const cityFilter = document.getElementById('cityFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const jobTypeFilter = document.getElementById('jobTypeFilter');
        const salaryFilter = document.getElementById('salaryFilter');
        const searchInput = document.querySelector('.search-box input');

        if (cityFilter) {
            cityFilter.addEventListener('change', (e) => {
                this.filters.city = e.target.value;
                this.filterJobs();
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filters.category = e.target.value;
                this.filterJobs();
            });
        }

        if (jobTypeFilter) {
            jobTypeFilter.addEventListener('change', (e) => {
                this.filters.jobType = e.target.value;
                this.filterJobs();
            });
        }

        if (salaryFilter) {
            salaryFilter.addEventListener('change', (e) => {
                this.filters.salary = e.target.value;
                this.filterJobs();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchJobs(e.target.value);
            });
        }
    }

    setupApplicationHandlers() {
        // Müraciət və save buttonları üçün event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-apply')) {
                this.handleApply(e.target);
            }
            
            if (e.target.classList.contains('btn-save')) {
                this.toggleSaveJob(e.target);
            }
        });
    }

    handleApply(button) {
        const jobCard = button.closest('.job-card');
        const jobTitle = jobCard.querySelector('h3').textContent;
        const company = jobCard.querySelector('.company-name').textContent;
        const salary = jobCard.querySelector('.job-salary').textContent;
        const location = jobCard.querySelector('.job-location').textContent;
        
        this.showApplyModal(jobTitle, company, salary, location);
    }

    showApplyModal(jobTitle, company, salary, location) {
        const modalHTML = `
            <div class="modal-overlay" id="applyModal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>İşə Müraciət</h2>
                    <div class="job-info">
                        <h3>${jobTitle}</h3>
                        <p><strong>Şirkət:</strong> ${company}</p>
                        <p><strong>Maаş:</strong> ${salary}</p>
                        <p><strong>Yer:</strong> ${location}</p>
                    </div>
                    <form class="apply-form">
                        <div class="form-group">
                            <label>Müraciət məktubu:</label>
                            <textarea placeholder="Niyə bu işə müraciət edirsiniz?" rows="4"></textarea>
                        </div>
                        <div class="form-group">
                            <label>CV seçin:</label>
                            <input type="file" accept=".pdf,.doc,.docx">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel">Ləğv et</button>
                            <button type="submit" class="btn-submit">Müraciəti göndər</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupModalHandlers();
    }

    setupModalHandlers() {
        const modal = document.getElementById('applyModal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.btn-cancel');
        const form = modal.querySelector('.apply-form');

        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Müraciətiniz uğurla göndərildi!');
            closeModal();
        });
    }

    toggleSaveJob(button) {
        const isSaved = button.textContent === '💚';
        button.textContent = isSaved ? '🤍' : '💚';
        
        const jobCard = button.closest('.job-card');
        const jobTitle = jobCard.querySelector('h3').textContent;
        
        if (!isSaved) {
            console.log(`"${jobTitle}" saxlanıldı`);
        } else {
            console.log(`"${jobTitle}" silindi`);
        }
    }

    filterJobs() {
        const jobCards = document.querySelectorAll('.job-card');
        let visibleCount = 0;

        jobCards.forEach(card => {
            const city = card.dataset.city;
            const category = card.dataset.category;
            const type = card.dataset.type;
            const salary = card.dataset.salary;

            const cityMatch = !this.filters.city || city === this.filters.city;
            const categoryMatch = !this.filters.category || category === this.filters.category;
            const typeMatch = !this.filters.jobType || type === this.filters.jobType;
            const salaryMatch = !this.filters.salary || salary === this.filters.salary;

            if (cityMatch && categoryMatch && typeMatch && salaryMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        this.updateJobsCount(visibleCount);
    }

    searchJobs(query) {
        const jobCards = document.querySelectorAll('.job-card');
        const searchTerm = query.toLowerCase();
        let visibleCount = 0;

        jobCards.forEach(card => {
            if (card.style.display === 'none') return;

            const title = card.querySelector('h3').textContent.toLowerCase();
            const company = card.querySelector('.company-name').textContent.toLowerCase();
            const location = card.querySelector('.job-location').textContent.toLowerCase();

            const matches = title.includes(searchTerm) || 
                           company.includes(searchTerm) || 
                           location.includes(searchTerm);

            if (matches) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        this.updateJobsCount(visibleCount);
    }

    updateJobsCount(count) {
        const countElement = document.querySelector('.jobs-count');
        if (countElement) {
            countElement.textContent = `${count} elan tapıldı`;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new JobsFilter();
});
