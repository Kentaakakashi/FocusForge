// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log("StudyZen - DOM Loaded");
    
    // Main Application Controller
    class StudyZenApp {
        constructor() {
            this.currentPage = 'landing';
            this.init();
        }

        init() {
            console.log("Initializing StudyZenApp...");
            
            // Hide loading screen
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                const app = document.getElementById('app');
                
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
                if (app) {
                    app.classList.remove('hidden');
                }
                
                this.loadPage();
                console.log("App loaded successfully");
            }, 1000);

            // Setup theme toggle button
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    if (typeof themeManager !== 'undefined') {
                        themeManager.showThemeSelector();
                    }
                });
            }

            // Setup modal close button
            const closeModal = document.querySelector('.close-modal');
            const themeModal = document.getElementById('theme-modal');
            
            if (closeModal && themeModal) {
                closeModal.addEventListener('click', () => {
                    themeModal.classList.add('hidden');
                });
            }

            if (themeModal) {
                themeModal.addEventListener('click', (e) => {
                    if (e.target === e.currentTarget) {
                        e.currentTarget.classList.add('hidden');
                    }
                });
            }

            // Handle keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + T for theme selector
                if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                    e.preventDefault();
                    if (typeof themeManager !== 'undefined') {
                        themeManager.showThemeSelector();
                    }
                }
                
                // Escape to close modals
                if (e.key === 'Escape') {
                    if (themeModal) {
                        themeModal.classList.add('hidden');
                    }
                }
            });
        }

        loadPage(page = null) {
            console.log("Loading page:", page || this.currentPage);
            
            if (page) this.currentPage = page;
            
            switch (this.currentPage) {
                case 'landing':
                    this.loadLandingPage();
                    break;
                case 'login':
                    this.loadLoginPage();
                    break;
                case 'signup':
                    this.loadSignupPage();
                    break;
                case 'dashboard':
                    this.loadDashboard();
                    break;
                default:
                    this.loadLandingPage();
            }
        }

        loadLandingPage() {
            console.log("Loading landing page");
            const app = document.getElementById('app');
            if (!app) return;
            
            app.innerHTML = `
                <div class="landing-container">
                    <div class="landing-content">
                        <h1 class="landing-title">
                            <i class="fas fa-graduation-cap"></i> StudyZen
                        </h1>
                        <p class="landing-subtitle">
                            Your ultimate study companion with AI assistance, productivity tools, and study community
                        </p>
                        
                        <div class="features-grid">
                            <div class="feature-card">
                                <div class="feature-icon">⏰</div>
                                <h3>Smart Timer</h3>
                                <p>Pomodoro timer with customizable intervals</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🤖</div>
                                <h3>AI Study Assistant</h3>
                                <p>Get help with study questions instantly</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">📊</div>
                                <h3>Detailed Stats</h3>
                                <p>Track your study habits and progress</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">👥</div>
                                <h3>Study Community</h3>
                                <p>Connect with other students worldwide</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🎮</div>
                                <h3>Gamification</h3>
                                <p>Earn achievements and level up</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🎨</div>
                                <h3>Multiple Themes</h3>
                                <p>Choose from 16+ beautiful themes</p>
                            </div>
                        </div>
                        
                        <div class="landing-buttons">
                            <button class="btn-primary" id="start-learning">
                                <i class="fas fa-rocket"></i> Start Learning Now
                            </button>
                            <button class="btn-secondary" id="explore-features">
                                <i class="fas fa-compass"></i> Explore Features
                            </button>
                        </div>
                        
                        <div style="margin-top: 40px; font-size: 0.9rem; opacity: 0.8;">
                            <p>Join 1,000+ students improving their study habits</p>
                        </div>
                    </div>
                </div>
            `;

            // Add event listeners
            const startBtn = document.getElementById('start-learning');
            const exploreBtn = document.getElementById('explore-features');
            
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    if (authManager && authManager.isLoggedIn && authManager.isLoggedIn()) {
                        this.loadPage('dashboard');
                    } else {
                        this.loadPage('login');
                    }
                });
            }
            
            if (exploreBtn) {
                exploreBtn.addEventListener('click', () => {
                    alert('Dashboard preview coming soon! For now, please login or sign up.');
                });
            }
        }

        loadLoginPage() {
            console.log("Loading login page");
            const app = document.getElementById('app');
            if (!app) return;
            
            app.innerHTML = `
                <div class="auth-container">
                    <div class="auth-box">
                        <div class="auth-header">
                            <button class="back-button" id="back-to-landing">
                                <i class="fas fa-arrow-left"></i> Back
                            </button>
                            <h1><i class="fas fa-sign-in-alt"></i> Welcome Back</h1>
                            <p>Login to continue your study journey</p>
                        </div>
                        
                        <form id="login-form">
                            <div class="input-group">
                                <label for="username">
                                    <i class="fas fa-user"></i> Username
                                </label>
                                <input type="text" id="username" placeholder="Enter your username" required>
                            </div>
                            
                            <div class="input-group">
                                <label for="password">
                                    <i class="fas fa-lock"></i> Password
                                </label>
                                <input type="password" id="password" placeholder="Enter your password" required>
                                <button type="button" class="show-password" id="show-password-btn">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            
                            <div class="remember-me">
                                <input type="checkbox" id="remember-me">
                                <label for="remember-me">Keep me logged in</label>
                            </div>
                            
                            <button type="submit" class="auth-submit-btn">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </button>
                            
                            <div class="auth-links">
                                <p>New to StudyZen? <a href="#" id="go-to-signup">Create Account</a></p>
                                <p><a href="#" id="forgot-password">Forgot Password?</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            this.addAuthStyles();

            // Add event listeners
            const backBtn = document.getElementById('back-to-landing');
            const goToSignup = document.getElementById('go-to-signup');
            const showPasswordBtn = document.getElementById('show-password-btn');
            const loginForm = document.getElementById('login-form');
            const forgotPassword = document.getElementById('forgot-password');

            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    this.loadPage('landing');
                });
            }

            if (goToSignup) {
                goToSignup.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.loadPage('signup');
                });
            }

            if (showPasswordBtn) {
                showPasswordBtn.addEventListener('click', () => {
                    const passwordInput = document.getElementById('password');
                    const icon = document.getElementById('show-password-btn').querySelector('i');
                    
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        icon.className = 'fas fa-eye-slash';
                    } else {
                        passwordInput.type = 'password';
                        icon.className = 'fas fa-eye';
                    }
                });
            }

            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleLogin();
                });
            }

            if (forgotPassword) {
                forgotPassword.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Password reset feature coming soon! For now, please create a new account.');
                });
            }
        }

        loadSignupPage() {
            console.log("Loading signup page");
            const app = document.getElementById('app');
            if (!app) return;
            
            app.innerHTML = `
                <div class="auth-container">
                    <div class="auth-box">
                        <div class="auth-header">
                            <button class="back-button" id="back-to-landing">
                                <i class="fas fa-arrow-left"></i> Back
                            </button>
                            <h1><i class="fas fa-user-plus"></i> Join StudyZen</h1>
                            <p>Create your account and start studying smarter</p>
                        </div>
                        
                        <form id="signup-form">
                            <div class="input-group">
                                <label for="new-username">
                                    <i class="fas fa-at"></i> Username *
                                </label>
                                <input type="text" id="new-username" placeholder="Choose a unique username" required>
                                <small>This will be your login ID</small>
                            </div>
                            
                            <div class="input-group">
                                <label for="display-name">
                                    <i class="fas fa-user-circle"></i> Display Name
                                </label>
                                <input type="text" id="display-name" placeholder="How others will see you">
                                <small>Leave empty to use username</small>
                            </div>
                            
                            <div class="input-group">
                                <label for="new-password">
                                    <i class="fas fa-lock"></i> Password *
                                </label>
                                <input type="password" id="new-password" placeholder="At least 6 characters" required>
                                <div class="password-strength" id="password-strength">
                                    <div class="strength-bar"></div>
                                    <span class="strength-text">Weak</span>
                                </div>
                            </div>
                            
                            <div class="input-group">
                                <label for="confirm-password">
                                    <i class="fas fa-lock"></i> Confirm Password *
                                </label>
                                <input type="password" id="confirm-password" placeholder="Re-enter your password" required>
                                <div id="password-match"></div>
                            </div>
                            
                            <button type="submit" class="auth-submit-btn">
                                <i class="fas fa-check-circle"></i> Create Account
                            </button>
                            
                            <div class="auth-links">
                                <p>Already have an account? <a href="#" id="go-to-login">Login here</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            this.addAuthStyles();

            // Add event listeners
            const backBtn = document.getElementById('back-to-landing');
            const goToLogin = document.getElementById('go-to-login');
            const newPassword = document.getElementById('new-password');
            const confirmPassword = document.getElementById('confirm-password');
            const signupForm = document.getElementById('signup-form');

            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    this.loadPage('landing');
                });
            }

            if (goToLogin) {
                goToLogin.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.loadPage('login');
                });
            }

            if (newPassword) {
                newPassword.addEventListener('input', (e) => {
                    this.checkPasswordStrength(e.target.value);
                });
            }

            if (confirmPassword) {
                confirmPassword.addEventListener('input', () => {
                    this.checkPasswordMatch();
                });
            }

            if (signupForm) {
                signupForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSignup();
                });
            }
        }

        addAuthStyles() {
            if (!document.querySelector('#auth-styles')) {
                const style = document.createElement('style');
                style.id = 'auth-styles';
                style.textContent = `
                    .auth-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }
                    
                    .auth-box {
                        background: white;
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                        width: 100%;
                        max-width: 450px;
                        animation: slideUp 0.5s ease;
                    }
                    
                    .auth-header {
                        text-align: center;
                        margin-bottom: 30px;
                        position: relative;
                    }
                    
                    .back-button {
                        position: absolute;
                        left: 0;
                        top: 0;
                        background: #f0f0f0;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 14px;
                        color: #666;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                    
                    .back-button:hover {
                        background: #e0e0e0;
                    }
                    
                    .auth-header h1 {
                        color: #667eea;
                        margin-bottom: 10px;
                        font-size: 2rem;
                    }
                    
                    .auth-header p {
                        color: #666;
                        font-size: 1rem;
                    }
                    
                    .input-group {
                        margin-bottom: 20px;
                        position: relative;
                    }
                    
                    .input-group label {
                        display: block;
                        margin-bottom: 8px;
                        color: #555;
                        font-weight: 500;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .input-group input {
                        width: 100%;
                        padding: 12px 15px;
                        border: 2px solid #ddd;
                        border-radius: 10px;
                        font-size: 16px;
                        transition: border 0.3s;
                    }
                    
                    .input-group input:focus {
                        outline: none;
                        border-color: #667eea;
                    }
                    
                    .input-group small {
                        display: block;
                        margin-top: 5px;
                        color: #888;
                        font-size: 0.85rem;
                    }
                    
                    .show-password {
                        position: absolute;
                        right: 15px;
                        top: 40px;
                        background: none;
                        border: none;
                        color: #888;
                        cursor: pointer;
                        font-size: 18px;
                    }
                    
                    .password-strength {
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    
                    .strength-bar {
                        flex: 1;
                        height: 6px;
                        background: #eee;
                        border-radius: 3px;
                        overflow: hidden;
                    }
                    
                    .strength-bar::after {
                        content: '';
                        display: block;
                        height: 100%;
                        width: 0%;
                        background: #f44336;
                        transition: width 0.3s, background 0.3s;
                    }
                    
                    .strength-text {
                        font-size: 0.85rem;
                        color: #888;
                        min-width: 40px;
                    }
                    
                    #password-match {
                        margin-top: 5px;
                        font-size: 0.85rem;
                        min-height: 20px;
                    }
                    
                    .remember-me {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin: 20px 0;
                    }
                    
                    .remember-me input {
                        width: 18px;
                        height: 18px;
                    }
                    
                    .auth-submit-btn {
                        width: 100%;
                        padding: 15px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        transition: transform 0.3s, box-shadow 0.3s;
                    }
                    
                    .auth-submit-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
                    }
                    
                    .auth-links {
                        margin-top: 25px;
                        text-align: center;
                    }
                    
                    .auth-links p {
                        margin: 10px 0;
                        color: #666;
                    }
                    
                    .auth-links a {
                        color: #667eea;
                        text-decoration: none;
                        font-weight: 500;
                    }
                    
                    .auth-links a:hover {
                        text-decoration: underline;
                    }
                `;
                document.head.appendChild(style);
            }
        }

        checkPasswordStrength(password) {
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            
            if (!strengthBar || !strengthText) return;
            
            let strength = 0;
            let color = '#f44336';
            let text = 'Weak';
            
            if (password.length >= 6) strength = 1;
            if (password.length >= 8) strength = 2;
            if (/[A-Z]/.test(password)) strength = Math.max(strength, 3);
            if (/[0-9]/.test(password)) strength = Math.max(strength, 4);
            if (/[^A-Za-z0-9]/.test(password)) strength = Math.max(strength, 5);
            
            switch(strength) {
                case 0: color = '#f44336'; text = 'Weak'; break;
                case 1: color = '#FF9800'; text = 'Fair'; break;
                case 2: color = '#FFC107'; text = 'Good'; break;
                case 3: color = '#8BC34A'; text = 'Strong'; break;
                case 4: color = '#4CAF50'; text = 'Very Strong'; break;
                case 5: color = '#2E7D32'; text = 'Excellent'; break;
            }
            
            strengthBar.style.setProperty('--strength-width', `${strength * 20}%`);
            strengthBar.style.setProperty('--strength-color', color);
            if (strengthBar.querySelector('::after')) {
                strengthBar.querySelector('::after').style.width = `${strength * 20}%`;
                strengthBar.querySelector('::after').style.background = color;
            }
            strengthText.textContent = text;
            strengthText.style.color = color;
        }

        checkPasswordMatch() {
            const password = document.getElementById('new-password');
            const confirm = document.getElementById('confirm-password');
            const matchDiv = document.getElementById('password-match');
            
            if (!password || !confirm || !matchDiv) return;
            
            if (confirm.value.length === 0) {
                matchDiv.textContent = '';
                matchDiv.style.color = '';
                return;
            }
            
            if (password.value === confirm.value) {
                matchDiv.textContent = '✓ Passwords match';
                matchDiv.style.color = '#4CAF50';
            } else {
                matchDiv.textContent = '✗ Passwords do not match';
                matchDiv.style.color = '#f44336';
            }
        }

        handleLogin() {
            const username = document.getElementById('username');
            const password = document.getElementById('password');
            
            if (!username || !password) {
                if (typeof showNotification !== 'undefined') {
                    showNotification('Please fill in all fields', 'error');
                }
                return;
            }
            
            if (!authManager) {
                alert('Authentication system not loaded. Please refresh the page.');
                return;
            }
            
            const result = authManager.login(username.value, password.value);
            if (result && result.success) {
                this.loadPage('dashboard');
            }
        }

        handleSignup() {
            const username = document.getElementById('new-username');
            const displayName = document.getElementById('display-name');
            const password = document.getElementById('new-password');
            const confirmPassword = document.getElementById('confirm-password');
            
            if (!username || !password) {
                if (typeof showNotification !== 'undefined') {
                    showNotification('Please fill in all required fields', 'error');
                }
                return;
            }
            
            if (password.value !== confirmPassword.value) {
                if (typeof showNotification !== 'undefined') {
                    showNotification('Passwords do not match', 'error');
                }
                return;
            }
            
            if (password.value.length < 6) {
                if (typeof showNotification !== 'undefined') {
                    showNotification('Password must be at least 6 characters', 'error');
                }
                return;
            }
            
            if (!authManager) {
                alert('Authentication system not loaded. Please refresh the page.');
                return;
            }
            
            const result = authManager.signup(username.value, displayName.value || username.value, password.value);
            if (result && result.success) {
                this.loadPage('dashboard');
            }
        }

        loadDashboard() {
            console.log("Loading dashboard");
            
            if (!authManager || !authManager.isLoggedIn()) {
                this.loadPage('login');
                return;
            }

            const user = authManager.getUser();
            if (!user) {
                this.loadPage('login');
                return;
            }
            
            const stats = studyDB.getUserStats(user.username);
            const app = document.getElementById('app');
            if (!app) return;
            
            app.innerHTML = `
                <div class="dashboard">
                    <!-- Dashboard Header -->
                    <header class="dashboard-header">
                        <div class="header-left">
                            <div class="user-profile">
                                <div class="avatar">
                                    ${user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div class="user-info">
                                    <h2 class="greeting">Hello, ${user.displayName || user.username}!</h2>
                                    <p class="user-status">
                                        <span class="status-indicator online"></span>
                                        Online • Streak: ${stats.streak || 0} days 🔥
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="header-right">
                            <button class="header-btn" id="quick-timer">
                                <i class="fas fa-play-circle"></i> Quick Start
                            </button>
                            <button class="header-btn" id="logout-btn">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>
                    </header>
                    
                    <!-- Main Content -->
                    <main class="dashboard-main">
                        <!-- Sidebar -->
                        <aside class="dashboard-sidebar">
                            <nav class="sidebar-nav">
                                <button class="nav-btn active" data-page="overview">
                                    <i class="fas fa-home"></i> Overview
                                </button>
                                <button class="nav-btn" data-page="timer">
                                    <i class="fas fa-clock"></i> Pomodoro Timer
                                </button>
                                <button class="nav-btn" data-page="stopwatch">
                                    <i class="fas fa-stopwatch"></i> Study Stopwatch
                                </button>
                                <button class="nav-btn" data-page="stats">
                                    <i class="fas fa-chart-bar"></i> Statistics
                                </button>
                            </nav>
                            
                            <!-- Quick Stats -->
                            <div class="quick-stats">
                                <h3>Today's Progress</h3>
                                <div class="stats-card">
                                    <div class="stat-item">
                                        <i class="fas fa-clock"></i>
                                        <div>
                                            <span class="stat-value">${this.formatTime(this.getTodayStudyTime(user.username))}</span>
                                            <span class="stat-label">Study Time</span>
                                        </div>
                                    </div>
                                    <div class="stat-item">
                                        <i class="fas fa-fire"></i>
                                        <div>
                                            <span class="stat-value">${stats.streak || 0}</span>
                                            <span class="stat-label">Day Streak</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        
                        <!-- Content Area -->
                        <section class="dashboard-content">
                            <div class="welcome-banner">
                                <h1>Welcome to Your Study Dashboard! 📚</h1>
                                <p>Ready to boost your productivity? Choose a tool from the sidebar to get started.</p>
                                <div class="quick-actions">
                                    <button class="action-btn" id="start-pomodoro">
                                        <i class="fas fa-play"></i> Start Pomodoro
                                    </button>
                                    <button class="action-btn" id="ask-ai">
                                        <i class="fas fa-robot"></i> Ask AI Assistant
                                    </button>
                                    <button class="action-btn" id="view-stats">
                                        <i class="fas fa-chart-line"></i> View Stats
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Features will be loaded here -->
                            <div id="feature-container">Loading...</div>
                        </section>
                    </main>
                </div>
            `;

            this.addDashboardStyles();
            this.setupDashboardListeners();
            this.loadFeature('overview');
        }

        addDashboardStyles() {
            if (!document.querySelector('#dashboard-styles')) {
                const style = document.createElement('style');
                style.id = 'dashboard-styles';
                style.textContent = `
                    .dashboard {
                        min-height: 100vh;
                        background: #f5f7fa;
                    }
                    
                    .dashboard-header {
                        background: white;
                        padding: 20px 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        position: sticky;
                        top: 0;
                        z-index: 100;
                    }
                    
                    .user-profile {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    
                    .avatar {
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 1.5rem;
                        font-weight: bold;
                    }
                    
                    .greeting {
                        font-size: 1.3rem;
                        color: #333;
                        margin-bottom: 5px;
                    }
                    
                    .user-status {
                        color: #666;
                        font-size: 0.9rem;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .status-indicator {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        display: inline-block;
                    }
                    
                    .status-indicator.online {
                        background: #4CAF50;
                        animation: pulse 2s infinite;
                    }
                    
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    
                    .header-right {
                        display: flex;
                        gap: 15px;
                        align-items: center;
                    }
                    
                    .header-btn {
                        padding: 10px 20px;
                        background: #f0f0f0;
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: 500;
                        color: #555;
                        transition: all 0.3s;
                        position: relative;
                    }
                    
                    .header-btn:hover {
                        background: #e0e0e0;
                        transform: translateY(-2px);
                    }
                    
                    #quick-timer {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }
                    
                    .dashboard-main {
                        display: flex;
                        min-height: calc(100vh - 90px);
                    }
                    
                    .dashboard-sidebar {
                        width: 250px;
                        background: white;
                        padding: 20px;
                        border-right: 1px solid #eee;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .sidebar-nav {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        flex: 1;
                    }
                    
                    .nav-btn {
                        padding: 12px 15px;
                        text-align: left;
                        border: none;
                        background: none;
                        border-radius: 10px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: #666;
                        font-size: 0.95rem;
                        transition: all 0.3s;
                    }
                    
                    .nav-btn:hover {
                        background: #f5f7fa;
                        color: #667eea;
                    }
                    
                    .nav-btn.active {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }
                    
                    .quick-stats {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                    }
                    
                    .quick-stats h3 {
                        font-size: 1rem;
                        color: #666;
                        margin-bottom: 15px;
                    }
                    
                    .stats-card {
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 10px;
                    }
                    
                    .stat-item {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 15px;
                    }
                    
                    .stat-item:last-child {
                        margin-bottom: 0;
                    }
                    
                    .stat-item i {
                        font-size: 1.5rem;
                        color: #667eea;
                    }
                    
                    .stat-value {
                        display: block;
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: #333;
                    }
                    
                    .stat-label {
                        font-size: 0.85rem;
                        color: #888;
                    }
                    
                    .dashboard-content {
                        flex: 1;
                        padding: 30px;
                        overflow-y: auto;
                    }
                    
                    .welcome-banner {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 30px;
                        border-radius: 15px;
                        margin-bottom: 30px;
                    }
                    
                    .welcome-banner h1 {
                        font-size: 2rem;
                        margin-bottom: 10px;
                    }
                    
                    .welcome-banner p {
                        opacity: 0.9;
                        margin-bottom: 20px;
                    }
                    
                    .quick-actions {
                        display: flex;
                        gap: 15px;
                    }
                    
                    .action-btn {
                        padding: 12px 25px;
                        background: rgba(255,255,255,0.2);
                        border: 2px solid rgba(255,255,255,0.3);
                        color: white;
                        border-radius: 10px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 1rem;
                        transition: all 0.3s;
                    }
                    
                    .action-btn:hover {
                        background: rgba(255,255,255,0.3);
                        transform: translateY(-3px);
                    }
                    
                    #feature-container {
                        background: white;
                        border-radius: 15px;
                        padding: 30px;
                        box-shadow: 0 5px 20px rgba(0,0,0,0.05);
                        min-height: 400px;
                    }
                `;
                document.head.appendChild(style);
            }
        }

        setupDashboardListeners() {
            // Navigation buttons
            setTimeout(() => {
                const navBtns = document.querySelectorAll('.nav-btn');
                navBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        this.loadFeature(btn.dataset.page);
                    });
                });

                // Quick action buttons
                const startPomo = document.getElementById('start-pomodoro');
                const viewStats = document.getElementById('view-stats');
                const quickTimer = document.getElementById('quick-timer');
                const logoutBtn = document.getElementById('logout-btn');

                if (startPomo) {
                    startPomo.addEventListener('click', () => {
                        this.loadFeature('timer');
                    });
                }

                if (viewStats) {
                    viewStats.addEventListener('click', () => {
                        this.loadFeature('stats');
                    });
                }

                if (quickTimer) {
                    quickTimer.addEventListener('click', () => {
                        this.loadFeature('timer');
                    });
                }

                if (logoutBtn) {
                    logoutBtn.addEventListener('click', () => {
                        if (confirm('Are you sure you want to logout?')) {
                            authManager.logout();
                            this.loadPage('landing');
                        }
                    });
                }
            }, 100);
        }

        loadFeature(feature) {
            console.log("Loading feature:", feature);
            const container = document.getElementById('feature-container');
            if (!container) return;
            
            switch(feature) {
                case 'overview':
                    this.loadOverview(container);
                    break;
                case 'timer':
                    this.loadPomodoro(container);
                    break;
                case 'stopwatch':
                    this.loadStopwatch(container);
                    break;
                case 'stats':
                    this.loadStats(container);
                    break;
                default:
                    this.loadOverview(container);
            }
        }

        loadOverview(container) {
            if (!authManager || !authManager.isLoggedIn()) return;
            
            const user = authManager.getUser();
            const stats = studyDB.getUserStats(user.username);
            const sessions = studyDB.getUserSessions(user.username);
            
            // Calculate recent activity
            const today = new Date().toDateString();
            const todayTime = stats.daily ? (stats.daily[today] || 0) : 0;
            const weeklyTime = stats.daily ? Object.values(stats.daily).reduce((a, b) => a + b, 0) : 0;
            
            container.innerHTML = `
                <div class="overview">
                    <h2>Dashboard Overview</h2>
                    
                    <div class="overview-grid">
                        <div class="overview-card">
                            <h3><i class="fas fa-chart-line"></i> Study Statistics</h3>
                            <div class="stats-grid">
                                <div class="stat-card">
                                    <span class="stat-number">${stats.streak || 0}</span>
                                    <span class="stat-label">Current Streak</span>
                                </div>
                                <div class="stat-card">
                                    <span class="stat-number">${Math.floor((stats.total || 0) / 60)}h</span>
                                    <span class="stat-label">Total Study Time</span>
                                </div>
                                <div class="stat-card">
                                    <span class="stat-number">${this.formatTime(todayTime)}</span>
                                    <span class="stat-label">Today</span>
                                </div>
                                <div class="stat-card">
                                    <span class="stat-number">${Math.floor(weeklyTime / 60)}h</span>
                                    <span class="stat-label">This Week</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="overview-card">
                            <h3><i class="fas fa-history"></i> Recent Sessions</h3>
                            <div class="sessions-list">
                                ${sessions.slice(0, 5).map(session => `
                                    <div class="session-item">
                                        <span class="session-subject">${session.subject}</span>
                                        <span class="session-duration">${session.duration} min</span>
                                        <span class="session-time">${new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                `).join('')}
                                ${sessions.length === 0 ? '<p class="no-sessions">No study sessions yet. Start studying!</p>' : ''}
                            </div>
                        </div>
                        
                        <div class="overview-card">
                            <h3><i class="fas fa-rocket"></i> Quick Start</h3>
                            <div class="quick-features">
                                <button class="feature-btn" data-feature="timer">
                                    <i class="fas fa-clock"></i>
                                    <span>Pomodoro Timer</span>
                                </button>
                                <button class="feature-btn" data-feature="stopwatch">
                                    <i class="fas fa-stopwatch"></i>
                                    <span>Study Stopwatch</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            this.addOverviewStyles();

            // Add event listeners for quick features
            setTimeout(() => {
                const featureBtns = container.querySelectorAll('.feature-btn');
                featureBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.loadFeature(btn.dataset.feature);
                    });
                });
            }, 100);
        }

        addOverviewStyles() {
            if (!document.querySelector('#overview-styles')) {
                const style = document.createElement('style');
                style.id = 'overview-styles';
                style.textContent = `
                    .overview h2 {
                        font-size: 1.8rem;
                        margin-bottom: 25px;
                        color: #333;
                    }
                    
                    .overview-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 25px;
                    }
                    
                    .overview-card {
                        background: #f8f9fa;
                        padding: 25px;
                        border-radius: 15px;
                        border: 1px solid #eee;
                    }
                    
                    .overview-card h3 {
                        font-size: 1.2rem;
                        margin-bottom: 20px;
                        color: #555;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 15px;
                    }
                    
                    .stat-card {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.05);
                    }
                    
                    .stat-number {
                        font-size: 2rem;
                        font-weight: bold;
                        color: #667eea;
                        display: block;
                    }
                    
                    .stat-label {
                        font-size: 0.9rem;
                        color: #888;
                        margin-top: 5px;
                    }
                    
                    .sessions-list {
                        max-height: 250px;
                        overflow-y: auto;
                    }
                    
                    .session-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .session-item:last-child {
                        border-bottom: none;
                    }
                    
                    .session-subject {
                        font-weight: 500;
                        color: #333;
                        flex: 2;
                    }
                    
                    .session-duration {
                        color: #667eea;
                        font-weight: bold;
                        flex: 1;
                    }
                    
                    .session-time {
                        color: #888;
                        font-size: 0.9rem;
                        flex: 1;
                        text-align: right;
                    }
                    
                    .no-sessions {
                        text-align: center;
                        color: #999;
                        font-style: italic;
                        padding: 20px;
                    }
                    
                    .quick-features {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 15px;
                    }
                    
                    .feature-btn {
                        background: white;
                        border: 2px solid #eee;
                        border-radius: 10px;
                        padding: 15px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    
                    .feature-btn:hover {
                        border-color: #667eea;
                        transform: translateY(-3px);
                        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
                    }
                    
                    .feature-btn i {
                        font-size: 1.5rem;
                        color: #667eea;
                    }
                    
                    .feature-btn span {
                        font-weight: 500;
                        color: #555;
                    }
                `;
                document.head.appendChild(style);
            }
        }

        formatTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
        }

        getTodayStudyTime(username) {
            const stats = studyDB.getUserStats(username);
            const today = new Date().toDateString();
            return stats.daily ? (stats.daily[today] || 0) : 0;
        }

        // ===== POMODORO TIMER =====
        loadPomodoro(container) {
            console.log("Loading Pomodoro timer");
            container.innerHTML = `
                <div class="pomodoro-container">
                    <div class="pomodoro-header">
                        <h2><i class="fas fa-clock"></i> Pomodoro Timer</h2>
                        <p>Study for 25 minutes, break for 5 minutes</p>
                    </div>
                    
                    <div class="timer-display">
                        <div class="time-circle">
                            <svg class="progress-ring" width="300" height="300">
                                <circle class="progress-ring-circle" stroke="#667eea" stroke-width="10" fill="transparent" r="130" cx="150" cy="150"/>
                            </svg>
                            <div class="time-text">
                                <span id="pomo-minutes">25</span>
                                <span class="time-colon">:</span>
                                <span id="pomo-seconds">00</span>
                            </div>
                        </div>
                        <div class="timer-mode">
                            <span class="mode-badge" id="current-mode">Focus Time</span>
                        </div>
                    </div>
                    
                    <div class="timer-controls">
                        <button class="control-btn start-btn" id="pomo-start">
                            <i class="fas fa-play"></i> Start
                        </button>
                        <button class="control-btn pause-btn" id="pomo-pause">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="control-btn reset-btn" id="pomo-reset">
                            <i class="fas fa-redo"></i> Reset
                        </button>
                    </div>
                    
                    <div class="pomodoro-settings">
                        <h3><i class="fas fa-cog"></i> Customize Intervals</h3>
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="work-time">Work Time (minutes)</label>
                                <input type="number" id="work-time" min="1" max="60" value="25">
                            </div>
                            <div class="setting-item">
                                <label for="break-time">Short Break (minutes)</label>
                                <input type="number" id="break-time" min="1" max="30" value="5">
                            </div>
                        </div>
                        <button class="save-settings-btn" id="save-settings">
                            <i class="fas fa-save"></i> Save Settings
                        </button>
                    </div>
                    
                    <div class="pomodoro-stats">
                        <h3><i class="fas fa-chart-bar"></i> Session Stats</h3>
                        <div class="stats-grid">
                            <div class="stat-box">
                                <span class="stat-label">Today's Sessions</span>
                                <span class="stat-value" id="today-sessions">0</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-label">Focus Time Today</span>
                                <span class="stat-value" id="focus-today">0m</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Initialize Pomodoro timer
            setTimeout(() => {
                this.initPomodoroTimer();
            }, 100);
        }

        initPomodoroTimer() {
            console.log("Initializing Pomodoro timer");
            
            const user = authManager.getUser();
            if (!user) return;
            
            // Timer state
            let timer = {
                isRunning: false,
                isBreak: false,
                timeLeft: 25 * 60, // 25 minutes in seconds
                totalSeconds: 25 * 60,
                interval: null
            };
            
            // Update display
            this.updatePomodoroDisplay(timer);
            
            // Event Listeners
            const startBtn = document.getElementById('pomo-start');
            const pauseBtn = document.getElementById('pomo-pause');
            const resetBtn = document.getElementById('pomo-reset');
            const saveBtn = document.getElementById('save-settings');
            
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    if (!timer.isRunning) {
                        timer.isRunning = true;
                        timer.interval = setInterval(() => {
                            this.updatePomodoroTimer(timer, user.username);
                        }, 1000);
                        console.log("Timer started");
                    }
                });
            }
            
            if (pauseBtn) {
                pauseBtn.addEventListener('click', () => {
                    if (timer.isRunning) {
                        timer.isRunning = false;
                        clearInterval(timer.interval);
                        console.log("Timer paused");
                    }
                });
            }
            
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    timer.isRunning = false;
                    clearInterval(timer.interval);
                    
                    const workTime = parseInt(document.getElementById('work-time')?.value || 25);
                    timer.timeLeft = workTime * 60;
                    timer.totalSeconds = workTime * 60;
                    timer.isBreak = false;
                    
                    const modeBadge = document.getElementById('current-mode');
                    if (modeBadge) {
                        modeBadge.textContent = 'Focus Time';
                    }
                    
                    this.updatePomodoroDisplay(timer);
                    console.log("Timer reset");
                });
            }
            
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    const workTime = parseInt(document.getElementById('work-time')?.value || 25);
                    const breakTime = parseInt(document.getElementById('break-time')?.value || 5);
                    
                    // Update timer if not running
                    if (!timer.isRunning) {
                        timer.timeLeft = workTime * 60;
                        timer.totalSeconds = workTime * 60;
                        this.updatePomodoroDisplay(timer);
                    }
                    
                    console.log("Settings saved: Work", workTime, "Break", breakTime);
                    alert('Settings saved!');
                });
            }
        }

        updatePomodoroTimer(timer, username) {
            if (timer.timeLeft <= 0) {
                clearInterval(timer.interval);
                timer.isRunning = false;
                
                // Switch mode
                timer.isBreak = !timer.isBreak;
                
                const workTime = parseInt(document.getElementById('work-time')?.value || 25);
                const breakTime = parseInt(document.getElementById('break-time')?.value || 5);
                
                if (timer.isBreak) {
                    // Start break
                    timer.timeLeft = breakTime * 60;
                    timer.totalSeconds = breakTime * 60;
                    document.getElementById('current-mode').textContent = 'Break Time';
                    
                    // Save completed session
                    if (studyDB && authManager.getUser()) {
                        studyDB.addStudySession(username, workTime, 'Pomodoro Session');
                    }
                    
                    alert('Focus session completed! Take a break.');
                } else {
                    // Start focus session
                    timer.timeLeft = workTime * 60;
                    timer.totalSeconds = workTime * 60;
                    document.getElementById('current-mode').textContent = 'Focus Time';
                    alert('Break finished! Time to focus.');
                }
            } else {
                timer.timeLeft--;
            }
            
            this.updatePomodoroDisplay(timer);
        }

        updatePomodoroDisplay(timer) {
            const minutes = Math.floor(timer.timeLeft / 60);
            const seconds = timer.timeLeft % 60;
            
            const minutesEl = document.getElementById('pomo-minutes');
            const secondsEl = document.getElementById('pomo-seconds');
            
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            // Update progress ring
            const circle = document.querySelector('.progress-ring-circle');
            if (circle) {
                const circumference = 2 * Math.PI * 130;
                const offset = circumference - (timer.timeLeft / timer.totalSeconds) * circumference;
                circle.style.strokeDashoffset = offset;
            }
            
            // Update button states
            const startBtn = document.getElementById('pomo-start');
            const pauseBtn = document.getElementById('pomo-pause');
            
            if (startBtn) startBtn.disabled = timer.isRunning;
            if (pauseBtn) pauseBtn.disabled = !timer.isRunning;
        }

        // ===== STOPWATCH =====
        loadStopwatch(container) {
            console.log("Loading stopwatch");
            container.innerHTML = `
                <div class="stopwatch-container">
                    <div class="stopwatch-header">
                        <h2><i class="fas fa-stopwatch"></i> Study Stopwatch</h2>
                        <p>Track your study sessions precisely</p>
                    </div>
                    
                    <div class="stopwatch-display">
                        <div class="time-display-large">
                            <span id="sw-hours">00</span>
                            <span class="time-colon">:</span>
                            <span id="sw-minutes">00</span>
                            <span class="time-colon">:</span>
                            <span id="sw-seconds">00</span>
                        </div>
                    </div>
                    
                    <div class="stopwatch-controls">
                        <button class="sw-btn start-sw-btn" id="sw-start">
                            <i class="fas fa-play"></i> Start Study
                        </button>
                        <button class="sw-btn pause-sw-btn" id="sw-pause" disabled>
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="sw-btn reset-sw-btn" id="sw-reset">
                            <i class="fas fa-stop"></i> End Study
                        </button>
                    </div>
                    
                    <div class="subject-selector">
                        <h3><i class="fas fa-book"></i> Select Subject</h3>
                        <div class="subject-buttons">
                            <button class="subject-btn" data-subject="Math">Math</button>
                            <button class="subject-btn" data-subject="Science">Science</button>
                            <button class="subject-btn" data-subject="English">English</button>
                            <button class="subject-btn" data-subject="Other">Other</button>
                        </div>
                        <div class="current-subject">
                            Currently studying: <span id="current-subject-text">General</span>
                        </div>
                    </div>
                    
                    <div class="session-records">
                        <div class="records-header">
                            <h3><i class="fas fa-history"></i> Today's Study Sessions</h3>
                        </div>
                        <div class="sessions-list" id="sessions-list">
                            <div class="no-sessions">No study sessions recorded yet.</div>
                        </div>
                    </div>
                </div>
            `;

            // Initialize Stopwatch
            setTimeout(() => {
                this.initStopwatch();
            }, 100);
        }

        initStopwatch() {
            console.log("Initializing stopwatch");
            
            const user = authManager.getUser();
            if (!user) return;
            
            // Stopwatch state
            let stopwatch = {
                isRunning: false,
                startTime: 0,
                elapsedTime: 0,
                interval: null,
                currentSubject: 'General'
            };
            
            // Load today's sessions
            this.loadTodaySessions(user.username);
            
            // Event Listeners
            const startBtn = document.getElementById('sw-start');
            const pauseBtn = document.getElementById('sw-pause');
            const resetBtn = document.getElementById('sw-reset');
            const subjectBtns = document.querySelectorAll('.subject-btn');
            
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    if (!stopwatch.isRunning) {
                        stopwatch.isRunning = true;
                        stopwatch.startTime = Date.now() - stopwatch.elapsedTime;
                        stopwatch.interval = setInterval(() => {
                            this.updateStopwatchDisplay(stopwatch);
                        }, 100);
                        
                        startBtn.disabled = true;
                        pauseBtn.disabled = false;
                        console.log("Stopwatch started");
                    }
                });
            }
            
            if (pauseBtn) {
                pauseBtn.addEventListener('click', () => {
                    if (stopwatch.isRunning) {
                        stopwatch.isRunning = false;
                        stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
                        clearInterval(stopwatch.interval);
                        
                        startBtn.disabled = false;
                        pauseBtn.disabled = true;
                        console.log("Stopwatch paused");
                    }
                });
            }
            
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (confirm('End current study session and save it?')) {
                        this.endStudySession(stopwatch, user.username);
                    }
                });
            }
            
            // Subject buttons
            subjectBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    subjectBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    stopwatch.currentSubject = btn.dataset.subject;
                    
                    const subjectText = document.getElementById('current-subject-text');
                    if (subjectText) {
                        subjectText.textContent = stopwatch.currentSubject;
                    }
                    
                    console.log("Subject changed to:", stopwatch.currentSubject);
                });
            });
        }

        updateStopwatchDisplay(stopwatch) {
            if (stopwatch.isRunning) {
                stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
            }
            
            const totalSeconds = Math.floor(stopwatch.elapsedTime / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            const hoursEl = document.getElementById('sw-hours');
            const minutesEl = document.getElementById('sw-minutes');
            const secondsEl = document.getElementById('sw-seconds');
            
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }

        endStudySession(stopwatch, username) {
            if (stopwatch.isRunning) {
                stopwatch.isRunning = false;
                clearInterval(stopwatch.interval);
            }
            
            const sessionMinutes = Math.floor(stopwatch.elapsedTime / 60000);
            if (sessionMinutes >= 1) {
                // Save session
                if (studyDB) {
                    studyDB.addStudySession(username, sessionMinutes, stopwatch.currentSubject);
                }
                
                alert(`Study session saved: ${sessionMinutes} minutes of ${stopwatch.currentSubject}`);
            } else {
                alert('Study session too short (minimum 1 minute)');
            }
            
            // Reset stopwatch
            stopwatch.startTime = 0;
            stopwatch.elapsedTime = 0;
            stopwatch.isRunning = false;
            clearInterval(stopwatch.interval);
            
            // Update button states
            const startBtn = document.getElementById('sw-start');
            const pauseBtn = document.getElementById('sw-pause');
            
            if (startBtn) startBtn.disabled = false;
            if (pauseBtn) pauseBtn.disabled = true;
            
            // Update display
            this.updateStopwatchDisplay(stopwatch);
            
            // Reload sessions
            this.loadTodaySessions(username);
        }

        loadTodaySessions(username) {
            if (!studyDB) return;
            
            const sessions = studyDB.getUserSessions(username);
            const today = new Date().toDateString();
            
            const todaySessions = sessions.filter(s => {
                const sessionDate = new Date(s.date).toDateString();
                return sessionDate === today;
            });
            
            this.updateSessionsList(todaySessions);
        }

        updateSessionsList(sessions) {
            const container = document.getElementById('sessions-list');
            if (!container) return;
            
            if (sessions.length === 0) {
                container.innerHTML = '<div class="no-sessions">No study sessions recorded yet.</div>';
                return;
            }
            
            // Sort by most recent
            const sortedSessions = [...sessions].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            container.innerHTML = sortedSessions.map(session => {
                const date = new Date(session.date);
                const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                return `
                    <div class="session-item">
                        <div class="session-info">
                            <span class="session-subject">${session.subject}</span>
                            <span class="session-time">${timeString}</span>
                        </div>
                        <span class="session-duration">${session.duration}m</span>
                    </div>
                `;
            }).join('');
        }

        loadStats(container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2><i class="fas fa-chart-bar"></i> Statistics</h2>
                    <p>Coming soon! Detailed statistics will be available here.</p>
                    <p>For now, check your overview for basic stats.</p>
                </div>
            `;
        }
    }

loadChatbot(container) {
    console.log("Loading AI Assistant with REAL API");
    
    container.innerHTML = `
        <div class="ai-assistant-container">
            <div class="ai-header">
                <h2><i class="fas fa-robot"></i> StudyZen AI Assistant</h2>
                <p>Powered by real AI - Ask anything about studying!</p>
                <div class="ai-status">
                    <span class="status-dot online" id="ai-status"></span>
                    <span id="ai-status-text">Connecting to AI...</span>
                </div>
            </div>
            
            <!-- API Setup Instructions -->
            <div class="api-setup-card" id="api-setup">
                <div class="api-header">
                    <h3><i class="fas fa-key"></i> Setup AI API (FREE)</h3>
                    <button class="collapse-btn" id="toggle-api-instructions">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="api-content" id="api-instructions">
                    <p>To use the real AI chatbot, get a FREE API key:</p>
                    
                    <div class="api-options">
                        <div class="api-option active" data-api="gemini">
                            <h4><i class="fab fa-google"></i> Google Gemini (Recommended)</h4>
                            <ol>
                                <li>Go to <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a></li>
                                <li>Click "Get API Key" → "Create API Key"</li>
                                <li>Copy your API key</li>
                                <li>Paste it below (stored locally in your browser)</li>
                            </ol>
                        </div>
                        
                        <div class="api-option" data-api="huggingface">
                            <h4><i class="fas fa-brain"></i> Hugging Face (Alternative)</h4>
                            <ol>
                                <li>Go to <a href="https://huggingface.co/settings/tokens" target="_blank">Hugging Face Tokens</a></li>
                                <li>Create a new token</li>
                                <li>Copy the token</li>
                                <li>Paste it below</li>
                            </ol>
                        </div>
                    </div>
                    
                    <div class="api-input-section">
                        <div class="input-group">
                            <label for="api-key-input">
                                <i class="fas fa-key"></i> Enter your API Key:
                            </label>
                            <input type="password" id="api-key-input" placeholder="Paste your API key here">
                            <div class="api-key-actions">
                                <button id="save-api-key" class="btn-primary">
                                    <i class="fas fa-save"></i> Save Key
                                </button>
                                <button id="test-api-key" class="btn-secondary">
                                    <i class="fas fa-test"></i> Test Connection
                                </button>
                            </div>
                        </div>
                        <div class="api-test-result" id="api-test-result"></div>
                    </div>
                    
                    <div class="api-warning">
                        <p><i class="fas fa-shield-alt"></i> Your API key is stored locally in your browser and never sent to our servers.</p>
                    </div>
                </div>
            </div>
            
            <!-- Chat Interface (hidden until API is set) -->
            <div class="ai-chat-container" id="chat-container" style="display: none;">
                <!-- Chat Messages -->
                <div class="chat-messages" id="chat-messages">
                    <div class="message ai-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-text">
                                <strong>Hello! I'm your StudyZen AI Assistant. 🎓</strong><br><br>
                                I can help you with:
                                <ul>
                                    <li>Study techniques and learning strategies</li>
                                    <li>Homework help and explanations</li>
                                    <li>Time management and productivity</li>
                                    <li>Exam preparation and test anxiety</li>
                                    <li>Subject-specific questions</li>
                                </ul>
                                What would you like to learn about today?
                            </div>
                            <div class="message-time">Just now</div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Questions -->
                <div class="quick-questions">
                    <h4>Quick Study Questions:</h4>
                    <div class="question-chips">
                        <button class="question-chip" data-question="Explain the Pythagorean theorem">Pythagorean theorem</button>
                        <button class="question-chip" data-question="What is photosynthesis?">Photosynthesis</button>
                        <button class="question-chip" data-question="How to study effectively for exams?">Exam study tips</button>
                        <button class="question-chip" data-question="What are Newton's laws of motion?">Newton's laws</button>
                        <button class="question-chip" data-question="How to improve my essay writing?">Essay writing</button>
                    </div>
                </div>
                
                <!-- Input Area -->
                <div class="chat-input-area">
                    <div class="input-container">
                        <textarea id="ai-input" 
                                  placeholder="Ask me anything about studying, homework, or learning..."
                                  rows="1"
                                  autocomplete="off"></textarea>
                        <button id="send-ai-message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="input-actions">
                        <button class="action-btn" id="clear-chat">
                            <i class="fas fa-trash"></i> Clear Chat
                        </button>
                        <div class="model-selector">
                            <select id="ai-model">
                                <option value="gemini">Gemini Pro (Recommended)</option>
                                <option value="huggingface">Hugging Face Llama</option>
                                <option value="fallback">Local Knowledge Base</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Alternative: Local Knowledge Base (always works) -->
            <div class="local-kb" id="local-kb">
                <h3><i class="fas fa-book"></i> Quick Study Help (Works Offline)</h3>
                <div class="kb-topics">
                    <button class="kb-topic" data-topic="study-techniques">
                        <i class="fas fa-graduation-cap"></i> Study Techniques
                    </button>
                    <button class="kb-topic" data-topic="time-management">
                        <i class="fas fa-clock"></i> Time Management
                    </button>
                    <button class="kb-topic" data-topic="memory-techniques">
                        <i class="fas fa-brain"></i> Memory Techniques
                    </button>
                    <button class="kb-topic" data-topic="exam-prep">
                        <i class="fas fa-file-alt"></i> Exam Preparation
                    </button>
                </div>
            </div>
            
            <div class="ai-disclaimer">
                <p><i class="fas fa-info-circle"></i> This AI assistant uses external APIs. For complex academic questions, always verify with teachers or textbooks.</p>
            </div>
        </div>
    `;

    // Add AI Assistant styles
    this.addAIAssistantStyles();
    
    // Initialize AI Assistant
    this.initRealAIAssistant();
}

initRealAIAssistant() {
    console.log("Initializing Real AI Assistant");
    
    // Check for saved API key
    this.checkSavedAPIKey();
    
    // Setup event listeners
    this.setupAIAssistantEvents();
}

checkSavedAPIKey() {
    const savedKey = localStorage.getItem('studyzen_ai_api_key');
    const savedProvider = localStorage.getItem('studyzen_ai_provider') || 'gemini';
    
    if (savedKey && savedKey.length > 10) {
        // Hide setup instructions, show chat
        const setupCard = document.getElementById('api-setup');
        const chatContainer = document.getElementById('chat-container');
        
        if (setupCard) setupCard.style.display = 'none';
        if (chatContainer) chatContainer.style.display = 'block';
        
        // Update status
        this.updateAIStatus('connected', 'AI is ready! Ask your question.');
        
        // Test the saved key
        this.testAPIKey(savedKey, savedProvider, true);
    }
}

setupAIAssistantEvents() {
    // Toggle API instructions
    const toggleBtn = document.getElementById('toggle-api-instructions');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const content = document.getElementById('api-instructions');
            const icon = toggleBtn.querySelector('i');
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
            } else {
                content.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
            }
        });
    }
    
    // API option selection
    document.querySelectorAll('.api-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.api-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Save API key
    const saveBtn = document.getElementById('save-api-key');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            this.saveAPIKey();
        });
    }
    
    // Test API key
    const testBtn = document.getElementById('test-api-key');
    if (testBtn) {
        testBtn.addEventListener('click', () => {
            this.testAPIKey();
        });
    }
    
    // Chat functionality
    this.setupChatFunctionality();
}

saveAPIKey() {
    const apiKeyInput = document.getElementById('api-key-input');
    const selectedProvider = document.querySelector('.api-option.active').dataset.api;
    
    if (!apiKeyInput || !apiKeyInput.value.trim()) {
        this.showAPIMessage('Please enter an API key', 'error');
        return;
    }
    
    const apiKey = apiKeyInput.value.trim();
    
    // Save to localStorage
    localStorage.setItem('studyzen_ai_api_key', apiKey);
    localStorage.setItem('studyzen_ai_provider', selectedProvider);
    
    // Hide setup, show chat
    const setupCard = document.getElementById('api-setup');
    const chatContainer = document.getElementById('chat-container');
    
    if (setupCard) setupCard.style.display = 'none';
    if (chatContainer) chatContainer.style.display = 'block';
    
    this.showAPIMessage('API key saved successfully!', 'success');
    this.updateAIStatus('connected', 'AI is ready! Testing connection...');
    
    // Test the key
    this.testAPIKey(apiKey, selectedProvider, false);
}

async testAPIKey(apiKey = null, provider = null, isSaved = false) {
    if (!apiKey) {
        const apiKeyInput = document.getElementById('api-key-input');
        if (!apiKeyInput) return;
        apiKey = apiKeyInput.value.trim();
        provider = document.querySelector('.api-option.active').dataset.api;
    }
    
    if (!apiKey) {
        this.showAPIMessage('Please enter an API key first', 'error');
        return;
    }
    
    this.updateAIStatus('connecting', 'Testing API connection...');
    
    try {
        let testResult;
        
        if (provider === 'gemini') {
            testResult = await this.testGeminiAPI(apiKey);
        } else if (provider === 'huggingface') {
            testResult = await this.testHuggingFaceAPI(apiKey);
        } else {
            testResult = { success: true, message: 'Using local knowledge base' };
        }
        
        if (testResult.success) {
            this.showAPIMessage(`✅ ${testResult.message}`, 'success');
            this.updateAIStatus('connected', 'AI is ready! Ask your question.');
            
            if (!isSaved) {
                // Auto-save if successful
                localStorage.setItem('studyzen_ai_api_key', apiKey);
                localStorage.setItem('studyzen_ai_provider', provider);
            }
        } else {
            this.showAPIMessage(`❌ ${testResult.message}`, 'error');
            this.updateAIStatus('error', 'API connection failed');
        }
    } catch (error) {
        console.error('API test error:', error);
        this.showAPIMessage('Connection test failed. Check your key or try another provider.', 'error');
        this.updateAIStatus('error', 'Connection failed');
    }
}

async testGeminiAPI(apiKey) {
    try {
        // Simple test request to Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Hello! Are you working?"
                    }]
                }]
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            return { 
                success: true, 
                message: 'Gemini API connected successfully!' 
            };
        } else {
            const error = await response.json();
            return { 
                success: false, 
                message: `Gemini API error: ${error.error?.message || 'Invalid API key'}` 
            };
        }
    } catch (error) {
        return { 
            success: false, 
            message: `Network error: ${error.message}` 
        };
    }
}

async testHuggingFaceAPI(apiKey) {
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-base', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: "Is this API working?"
            })
        });
        
        if (response.ok) {
            return { 
                success: true, 
                message: 'Hugging Face API connected!' 
            };
        } else if (response.status === 401) {
            return { 
                success: false, 
                message: 'Invalid Hugging Face token' 
            };
        } else {
            return { 
                success: true, 
                message: 'Hugging Face API responding (rate limits may apply)' 
            };
        }
    } catch (error) {
        return { 
            success: false, 
            message: `Hugging Face error: ${error.message}` 
        };
    }
}

updateAIStatus(status, text) {
    const statusDot = document.getElementById('ai-status');
    const statusText = document.getElementById('ai-status-text');
    
    if (!statusDot || !statusText) return;
    
    statusDot.className = 'status-dot';
    
    switch(status) {
        case 'connected':
            statusDot.classList.add('online');
            break;
        case 'connecting':
            statusDot.classList.add('connecting');
            break;
        case 'error':
            statusDot.classList.add('error');
            break;
        default:
            statusDot.classList.add('offline');
    }
    
    statusText.textContent = text;
}

showAPIMessage(message, type = 'info') {
    const resultDiv = document.getElementById('api-test-result');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = `
        <div class="api-message api-${type}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        </div>
    `;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        resultDiv.innerHTML = '';
    }, 5000);
}

setupChatFunctionality() {
    const chatMessages = document.getElementById('chat-messages');
    const aiInput = document.getElementById('ai-input');
    const sendBtn = document.getElementById('send-ai-message');
    const clearBtn = document.getElementById('clear-chat');
    const questionChips = document.querySelectorAll('.question-chip');
    const kbTopics = document.querySelectorAll('.kb-topic');
    const modelSelect = document.getElementById('ai-model');
    
    // Initialize chat history
    this.chatHistory = JSON.parse(localStorage.getItem('studyzen_chat_history') || '[]');
    
    // Load chat history
    if (this.chatHistory.length > 0) {
        this.loadChatHistory();
    }
    
    // Function to add message
    this.addMessage = function(text, isUser = false, save = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${this.formatMessageText(text)}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Save to history
        if (save) {
            this.chatHistory.push({
                text: text,
                isUser: isUser,
                timestamp: now.toISOString()
            });
            
            // Keep only last 50 messages
            if (this.chatHistory.length > 50) {
                this.chatHistory = this.chatHistory.slice(-50);
            }
            
            localStorage.setItem('studyzen_chat_history', JSON.stringify(this.chatHistory));
        }
    };
    
    // Function to show typing indicator
    this.showTypingIndicator = function() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        if (chatMessages) {
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        return typingDiv;
    };
    
    // Event listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            this.handleUserMessage();
        });
    }
    
    if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });
        
        // Auto-resize textarea
        aiInput.addEventListener('input', () => {
            aiInput.style.height = 'auto';
            aiInput.style.height = Math.min(aiInput.scrollHeight, 120) + 'px';
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Clear all chat history?')) {
                this.clearChatHistory();
            }
        });
    }
    
    // Quick questions
    questionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.getAttribute('data-question');
            if (aiInput) {
                aiInput.value = question;
                this.handleUserMessage();
            }
        });
    });
    
    // Knowledge base topics
    kbTopics.forEach(topic => {
        topic.addEventListener('click', () => {
            const topicType = topic.getAttribute('data-topic');
            this.handleKnowledgeBaseTopic(topicType);
        });
    });
}

async handleUserMessage() {
    const aiInput = document.getElementById('ai-input');
    if (!aiInput || !aiInput.value.trim()) return;
    
    const userMessage = aiInput.value.trim();
    
    // Add user message
    this.addMessage(userMessage, true);
    
    // Clear input
    aiInput.value = '';
    aiInput.style.height = 'auto';
    
    // Get API key and provider
    const apiKey = localStorage.getItem('studyzen_ai_api_key');
    const provider = localStorage.getItem('studyzen_ai_provider') || 'gemini';
    const model = document.getElementById('ai-model')?.value || provider;
    
    // Show typing indicator
    const typingIndicator = this.showTypingIndicator();
    
    try {
        let aiResponse;
        
        if (apiKey && model !== 'fallback') {
            // Use real AI API
            if (model === 'gemini' || provider === 'gemini') {
                aiResponse = await this.callGeminiAPI(apiKey, userMessage);
            } else if (model === 'huggingface') {
                aiResponse = await this.callHuggingFaceAPI(apiKey, userMessage);
            }
        }
        
        // Fallback to local knowledge base if API fails or not available
        if (!aiResponse) {
            aiResponse = this.getLocalAIResponse(userMessage);
        }
        
        // Remove typing indicator
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.remove();
        }
        
        // Add AI response
        this.addMessage(aiResponse, false);
        
    } catch (error) {
        console.error('AI response error:', error);
        
        // Remove typing indicator
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.remove();
        }
        
        // Fallback response
        const fallbackResponse = this.getLocalAIResponse(userMessage);
        this.addMessage(fallbackResponse, false);
    }
}

async callGeminiAPI(apiKey, message) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful study assistant. Answer this study-related question: "${message}". Provide clear, educational explanations. If it's not study-related, politely redirect to study topics.`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 
               "I apologize, but I couldn't generate a response. Please try again.";
        
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
}

async callHuggingFaceAPI(apiKey, message) {
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: `Student question: ${message}`,
                parameters: {
                    max_length: 500,
                    temperature: 0.7,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`Hugging Face error: ${response.status}`);
        }
        
        const data = await response.json();
        return data[0]?.generated_text || "I received your question but couldn't process it properly.";
        
    } catch (error) {
        console.error('Hugging Face API error:', error);
        throw error;
    }
}

getLocalAIResponse(message) {
    const messageLower = message.toLowerCase();
    
    // Enhanced local knowledge base
    const knowledgeBase = {
        // Study techniques
        "study techniques|how to study|study methods": "Effective study techniques include:\n\n1. **Active Recall**: Test yourself without looking at notes\n2. **Spaced Repetition**: Review at increasing intervals\n3. **Pomodoro Technique**: 25 min study, 5 min break\n4. **Feynman Technique**: Explain concepts simply\n5. **Interleaving**: Mix different topics\n6. **Practice Testing**: Use past exams or quizzes\n\nTry combining 2-3 techniques for best results!",
        
        // Time management
        "time management|schedule|organize time": "Time management tips:\n\n📅 **Plan weekly**: Schedule study sessions\n⏰ **Use Pomodoro**: 25/5 work/break cycles\n🎯 **Prioritize**: Focus on important tasks first\n📝 **To-do lists**: Break tasks into small steps\n🔄 **Review**: Adjust schedule weekly\n💤 **Include breaks**: Rest is crucial for learning",
        
        // Memory techniques
        "memory|memorize|remember": "Memory techniques:\n\n🧠 **Mnemonics**: Create associations\n🏰 **Memory Palace**: Visualize locations\n🔗 **Chunking**: Group information\n🎨 **Visualization**: Create mental images\n📚 **Spaced Repetition**: Review over time\n🗣️ **Teach others**: Reinforces learning",
        
        // Exam preparation
        "exam|test|final|midterm": "Exam preparation:\n\n📖 **Start early**: Don't cram\n📋 **Study guides**: Create summaries\n📝 **Practice tests**: Simulate exam conditions\n⏳ **Time yourself**: Practice pacing\n🛌 **Sleep well**: Before exam day\n💧 **Stay hydrated**: Drink water\n😌 **Stay calm**: Practice deep breathing",
        
        // Math help
        "math|algebra|calculus|geometry": "Math study tips:\n\n🔢 **Practice daily**: Math requires consistency\n📐 **Understand concepts**: Don't just memorize\n✏️ **Show work**: Step-by-step solutions\n📈 **Visualize**: Use graphs and diagrams\n🔍 **Check work**: Review mistakes\n🎯 **Focus on weaknesses**: Practice difficult areas",
        
        // Science help
        "science|physics|chemistry|biology": "Science study tips:\n\n🔬 **Understand principles**: Focus on concepts\n📊 **Use diagrams**: Visual representations\n🧪 **Experiments**: Hands-on learning when possible\n🌍 **Real-world**: Connect to everyday life\n📝 **Key terms**: Learn vocabulary\n🔗 **Relationships**: Understand how concepts connect",
        
        // Writing help
        "writing|essay|paper|composition": "Writing tips:\n\n📝 **Outline first**: Plan structure\n✍️ **Write drafts**: Don't aim for perfection first\n📚 **Research**: Gather information\n🔍 **Edit later**: Separate writing and editing\n📖 **Read aloud**: Catch errors\n⏰ **Allow time**: Don't rush the process",
        
        // Focus and motivation
        "focus|concentrate|distracted|motivation": "Focus and motivation:\n\n🚫 **Remove distractions**: Phone, social media\n🎯 **Clear goals**: Know what to accomplish\n🏆 **Small rewards**: Celebrate progress\n👥 **Study groups**: Accountability\n💪 **Routine**: Consistent study times\n🔄 **Variety**: Change study methods",
        
        // General
        "hello|hi|hey": "Hello! I'm your StudyZen AI Assistant. How can I help with your studies today? 🎓",
        "thank|thanks": "You're welcome! Keep up the great work with your studies. Consistency is key to success! 💪",
        "help": "I can help with:\n• Study techniques and methods\n• Subject-specific questions\n• Time management\n• Exam preparation\n• Memory techniques\n• Writing and research\n\nWhat would you like to know?",
    };
    
    // Check for matches
    for (const [keywords, response] of Object.entries(knowledgeBase)) {
        const keywordArray = keywords.split('|');
        if (keywordArray.some(keyword => messageLower.includes(keyword))) {
            return response;
        }
    }
    // Default response
    const defaultResponses = [
        "I'm here to help with study-related questions! Could you rephrase your question or ask about:\n• Study techniques\n• Homework help\n• Time management\n• Subject explanations?",
        "That's an interesting question! For the best help, could you make it more specific to studying or learning?",
        "I specialize in study-related topics. Try asking about study methods, subject help, or learning strategies!",
        "As a study assistant, I'm best equipped to help with academic topics. What subject or study technique would you like to know about?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

handleKnowledgeBaseTopic(topic) {
    const topics = {
        "study-techniques": "What are the most effective study techniques and how do I use them?",
        "time-management": "How can I better manage my study time and create an effective schedule?",
        "memory-techniques": "What are the best techniques to improve memory and retention?",
        "exam-prep": "How should I prepare for exams and manage test anxiety?"
    };
    
    if (topics[topic]) {
        const aiInput = document.getElementById('ai-input');
        if (aiInput) {
            aiInput.value = topics[topic];
            this.handleUserMessage();
        }
    }
}

formatMessageText(text) {
    // Convert markdown-style formatting to HTML
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/•/g, '•')
        .replace(/(\d+\.)/g, '<br>$1')
        .replace(/🎓|📚|⏰|🎯|🧠|📝|🔬|📖/g, match => `<span class="emoji">${match}</span>`);
}

loadChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages || this.chatHistory.length === 0) return;
    
    // Clear existing messages except the first welcome
    const welcomeMsg = chatMessages.querySelector('.message');
    chatMessages.innerHTML = '';
    if (welcomeMsg) {
        chatMessages.appendChild(welcomeMsg);
    }
    
    // Load history
    this.chatHistory.forEach(msg => {
        this.addMessage(msg.text, msg.isUser, false); // Don't save again
    });
}

clearChatHistory() {
    this.chatHistory = [];
    localStorage.removeItem('studyzen_chat_history');
    
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        <strong>Chat cleared! 💫</strong><br><br>
                        I'm ready to help with your studies. What would you like to learn about today?
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;
    }
}


    // Start the application
    console.log("Starting StudyZen application...");
    const app = new StudyZenApp();
    window.app = app; // Make accessible for debugging
});
