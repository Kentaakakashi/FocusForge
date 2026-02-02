// Main Application Controller
class StudyZenApp {
    constructor() {
        this.currentPage = 'landing';
        this.init();
    }

    init() {
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
            this.loadPage();
        }, 2000);

        // Setup theme toggle button
        document.getElementById('theme-toggle').addEventListener('click', () => {
            themeManager.showThemeSelector();
        });

        // Setup modal close button
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('theme-modal').classList.add('hidden');
        });

        // Close modal when clicking outside
        document.getElementById('theme-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                e.currentTarget.classList.add('hidden');
            }
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + T for theme selector
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                themeManager.showThemeSelector();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                document.getElementById('theme-modal').classList.add('hidden');
            }
        });
    }

    loadPage(page = null) {
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
        document.getElementById('app').innerHTML = `
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
        document.getElementById('start-learning').addEventListener('click', () => {
            if (authManager.isLoggedIn()) {
                this.loadPage('dashboard');
            } else {
                this.loadPage('login');
            }
        });

        document.getElementById('explore-features').addEventListener('click', () => {
            alert('Dashboard preview coming soon! For now, please login or sign up.');
        });
    }

    loadLoginPage() {
        document.getElementById('app').innerHTML = `
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

        // Add auth styles
        this.addAuthStyles();

        // Add event listeners
        document.getElementById('back-to-landing').addEventListener('click', () => {
            this.loadPage('landing');
        });

        document.getElementById('go-to-signup').addEventListener('click', (e) => {
            e.preventDefault();
            this.loadPage('signup');
        });

        document.getElementById('show-password-btn').addEventListener('click', () => {
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

        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('forgot-password').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset feature coming soon! For now, please create a new account.');
        });
    }

    loadSignupPage() {
        document.getElementById('app').innerHTML = `
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

        // Add auth styles
        this.addAuthStyles();

        // Add event listeners
        document.getElementById('back-to-landing').addEventListener('click', () => {
            this.loadPage('landing');
        });

        document.getElementById('go-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.loadPage('login');
        });

        // Password strength checker
        document.getElementById('new-password').addEventListener('input', (e) => {
            this.checkPasswordStrength(e.target.value);
        });

        // Password match checker
        document.getElementById('confirm-password').addEventListener('input', () => {
            this.checkPasswordMatch();
        });

        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });
    }

    addAuthStyles() {
        // Add auth-specific styles if not already added
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
        strengthBar.querySelector('::after').style.width = `${strength * 20}%`;
        strengthBar.querySelector('::after').style.background = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

    checkPasswordMatch() {
        const password = document.getElementById('new-password').value;
        const confirm = document.getElementById('confirm-password').value;
        const matchDiv = document.getElementById('password-match');
        
        if (confirm.length === 0) {
            matchDiv.textContent = '';
            matchDiv.style.color = '';
            return;
        }
        
        if (password === confirm) {
            matchDiv.textContent = '✓ Passwords match';
            matchDiv.style.color = '#4CAF50';
        } else {
            matchDiv.textContent = '✗ Passwords do not match';
            matchDiv.style.color = '#f44336';
        }
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        const result = authManager.login(username, password);
        if (result.success) {
            this.loadPage('dashboard');
        }
    }

    handleSignup() {
        const username = document.getElementById('new-username').value;
        const displayName = document.getElementById('display-name').value;
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validation
        if (!username || !password) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }
        
        const result = authManager.signup(username, displayName || username, password);
        if (result.success) {
            this.loadPage('dashboard');
        }
    }

    loadDashboard() {
        if (!authManager.isLoggedIn()) {
            this.loadPage('login');
            return;
        }

        const user = authManager.getUser();
        const stats = studyDB.getUserStats(user.username);
        
        document.getElementById('app').innerHTML = `
            <div class="dashboard">
                <!-- Dashboard Header -->
                <header class="dashboard-header">
                    <div class="header-left">
                        <div class="user-profile">
                            <div class="avatar">
                                ${user.displayName.charAt(0).toUpperCase()}
                            </div>
                            <div class="user-info">
                                <h2 class="greeting">Hello, ${user.displayName}!</h2>
                                <p class="user-status">
                                    <span class="status-indicator online"></span>
                                    Online • Streak: ${stats.streak} days 🔥
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="header-right">
                        <button class="header-btn" id="quick-timer">
                            <i class="fas fa-play-circle"></i> Quick Start
                        </button>
                        <button class="header-btn" id="notifications-btn">
                            <i class="fas fa-bell"></i>
                            <span class="notification-count">0</span>
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
                            <button class="nav-btn" data-page="chatbot">
                                <i class="fas fa-robot"></i> AI Study Assistant
                            </button>
                            <button class="nav-btn" data-page="planner">
                                <i class="fas fa-calendar-alt"></i> Study Planner
                            </button>
                            <button class="nav-btn" data-page="achievements">
                                <i class="fas fa-trophy"></i> Achievements
                            </button>
                            <button class="nav-btn" data-page="flashcards">
                                <i class="fas fa-layer-group"></i> Flashcards
                            </button>
                            <button class="nav-btn" data-page="notes">
                                <i class="fas fa-sticky-note"></i> Notes
                            </button>
                            <button class="nav-btn" data-page="community">
                                <i class="fas fa-users"></i> Community
                            </button>
                            <button class="nav-btn" data-page="profiles">
                                <i class="fas fa-user-friends"></i> Find Friends
                            </button>
                            <button class="nav-btn" data-page="support">
                                <i class="fas fa-question-circle"></i> Support
                            </button>
                            <button class="nav-btn" data-page="settings">
                                <i class="fas fa-cog"></i> Settings
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
                                        <span class="stat-value">${stats.streak}</span>
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
                        <div id="feature-container"></div>
                    </section>
                </main>
            </div>
        `;

        // Add dashboard styles
        this.addDashboardStyles();

        // Add event listeners
        this.setupDashboardListeners();
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
                
                .notification-count {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #f44336;
                    color: white;
                    font-size: 0.8rem;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
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
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupDashboardListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.loadFeature(btn.dataset.page);
            });
        });

        // Quick action buttons
        document.getElementById('start-pomodoro').addEventListener('click', () => {
            this.loadFeature('timer');
        });

        document.getElementById('ask-ai').addEventListener('click', () => {
            this.loadFeature('chatbot');
        });

        document.getElementById('view-stats').addEventListener('click', () => {
            this.loadFeature('stats');
        });

        // Header buttons
        document.getElementById('quick-timer').addEventListener('click', () => {
            this.loadFeature('timer');
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                authManager.logout();
                this.loadPage('landing');
            }
        });

        // Load default feature
        this.loadFeature('overview');
    }

    loadFeature(feature) {
        const container = document.getElementById('feature-container');
        
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
            case 'chatbot':
                this.loadChatbot(container);
                break;
            case 'planner':
                this.loadPlanner(container);
                break;
            case 'achievements':
                this.loadAchievements(container);
                break;
            case 'flashcards':
                this.loadFlashcards(container);
                break;
            case 'notes':
                this.loadNotes(container);
                break;
            case 'community':
                this.loadCommunity(container);
                break;
            case 'profiles':
                this.loadProfiles(container);
                break;
            case 'support':
                this.loadSupport(container);
                break;
            case 'settings':
                this.loadSettings(container);
                break;
            default:
                this.loadOverview(container);
        }
    }

    loadOverview(container) {
        const user = authManager.getUser();
        const stats = studyDB.getUserStats(user.username);
        const sessions = studyDB.getUserSessions(user.username);
        
        // Calculate recent activity
        const today = new Date().toDateString();
        const todayTime = stats.daily[today] || 0;
        const weeklyTime = Object.values(stats.daily).reduce((a, b) => a + b, 0);
        
        container.innerHTML = `
            <div class="overview">
                <h2>Dashboard Overview</h2>
                
                <div class="overview-grid">
                    <div class="overview-card">
                        <h3><i class="fas fa-chart-line"></i> Study Statistics</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <span class="stat-number">${stats.streak}</span>
                                <span class="stat-label">Current Streak</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-number">${Math.floor(stats.total / 60)}h</span>
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
                            <button class="feature-btn" data-feature="chatbot">
                                <i class="fas fa-robot"></i>
                                <span>AI Assistant</span>
                            </button>
                            <button class="feature-btn" data-feature="planner">
                                <i class="fas fa-calendar"></i>
                                <span>Study Planner</span>
                            </button>
                            <button class="feature-btn" data-feature="notes">
                                <i class="fas fa-sticky-note"></i>
                                <span>Take Notes</span>
                            </button>
                            <button class="feature-btn" data-feature="flashcards">
                                <i class="fas fa-layer-group"></i>
                                <span>Flashcards</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="overview-card">
                        <h3><i class="fas fa-trophy"></i> Recent Achievements</h3>
                        <div class="achievements-preview">
                            ${this.getRecentAchievements(user.username).map(achievement => `
                                <div class="achievement-item">
                                    <span class="achievement-icon">${achievement.icon}</span>
                                    <div>
                                        <strong>${achievement.title}</strong>
                                        <p>${achievement.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                            ${this.getRecentAchievements(user.username).length === 0 ? 
                                '<p class="no-achievements">Complete study sessions to earn achievements!</p>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add overview styles
        this.addOverviewStyles();

        // Add event listeners for quick features
        container.querySelectorAll('.feature-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.loadFeature(btn.dataset.feature);
            });
        });
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
                
                .no-sessions, .no-achievements {
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
                
                .achievements-preview {
                    max-height: 200px;
                    overflow-y: auto;
                }
                
                .achievement-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 0;
                    border-bottom: 1px solid #eee;
                }
                
                .achievement-item:last-child {
                    border-bottom: none;
                }
                
                .achievement-icon {
                    font-size: 2rem;
                    width: 50px;
                    text-align: center;
                }
                
                .achievement-item strong {
                    display: block;
                    color: #333;
                }
                
                .achievement-item p {
                    margin-top: 5px;
                    font-size: 0.9rem;
                    color: #666;
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
        return stats.daily[today] || 0;
    }

    getRecentAchievements(username) {
        // Simplified achievement check
        const stats = studyDB.getUserStats(username);
        const achievements = [];
        
        if (stats.total >= 60) {
            achievements.push({
                icon: '⏰',
                title: 'First Hour',
                description: 'Completed 1 hour of studying'
            });
        }
        
        if (stats.streak >= 7) {
            achievements.push({
                icon: '🔥',
                title: 'Week Warrior',
                description: '7-day study streak'
            });
        }
        
        return achievements.slice(0, 3);
    }
}

// Add these methods AFTER the loadOverview method in your StudyZenApp class

loadPomodoro(container) {
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
                <button class="control-btn skip-btn" id="pomo-skip">
                    <i class="fas fa-forward"></i> Skip
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
                    <div class="setting-item">
                        <label for="long-break-time">Long Break (minutes)</label>
                        <input type="number" id="long-break-time" min="1" max="60" value="15">
                    </div>
                    <div class="setting-item">
                        <label for="sessions-before-long">Sessions before long break</label>
                        <input type="number" id="sessions-before-long" min="1" max="10" value="4">
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
                    <div class="stat-box">
                        <span class="stat-label">Current Session</span>
                        <span class="stat-value" id="current-session">1/4</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Total Focus Time</span>
                        <span class="stat-value" id="total-focus">0h</span>
                    </div>
                </div>
            </div>
            
            <div class="pomodoro-tips">
                <h3><i class="fas fa-lightbulb"></i> Tips for Effective Pomodoro</h3>
                <ul>
                    <li>Choose a single task for each session</li>
                    <li>Turn off notifications during focus time</li>
                    <li>During breaks, step away from your desk</li>
                    <li>Use the long break to recharge completely</li>
                </ul>
            </div>
        </div>
    `;

    // Add Pomodoro styles
    this.addPomodoroStyles();
    
    // Initialize Pomodoro timer
    this.initPomodoroTimer();
}

loadStopwatch(container) {
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
                <div class="milliseconds">
                    <span id="sw-milliseconds">00</span>
                </div>
            </div>
            
            <div class="stopwatch-controls">
                <button class="sw-btn start-sw-btn" id="sw-start">
                    <i class="fas fa-play"></i> Start Study
                </button>
                <button class="sw-btn pause-sw-btn" id="sw-pause" disabled>
                    <i class="fas fa-pause"></i> Pause
                </button>
                <button class="sw-btn lap-sw-btn" id="sw-lap" disabled>
                    <i class="fas fa-flag"></i> Mark Session
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
                    <button class="subject-btn" data-subject="History">History</button>
                    <button class="subject-btn" data-subject="English">English</button>
                    <button class="subject-btn" data-subject="Programming">Programming</button>
                    <button class="subject-btn" data-subject="Other">Other</button>
                </div>
                <div class="custom-subject">
                    <input type="text" id="custom-subject" placeholder="Or enter custom subject...">
                    <button id="add-custom-subject">Add</button>
                </div>
                <div class="current-subject">
                    Currently studying: <span id="current-subject-text">General</span>
                </div>
            </div>
            
            <div class="session-records">
                <div class="records-header">
                    <h3><i class="fas fa-history"></i> Today's Study Sessions</h3>
                    <button class="clear-sessions-btn" id="clear-sessions">
                        <i class="fas fa-trash"></i> Clear All
                    </button>
                </div>
                <div class="sessions-list" id="sessions-list">
                    <!-- Sessions will be added here -->
                    <div class="no-sessions">No study sessions recorded yet.</div>
                </div>
                <div class="today-summary">
                    <h4><i class="fas fa-chart-pie"></i> Today's Summary</h4>
                    <div class="summary-stats">
                        <div class="summary-item">
                            <span class="summary-label">Total Time</span>
                            <span class="summary-value" id="total-today">0h 0m</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Sessions</span>
                            <span class="summary-value" id="session-count">0</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Longest Session</span>
                            <span class="summary-value" id="longest-session">0m</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-label">Focus Score</span>
                            <span class="summary-value" id="focus-score">0%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="study-goals">
                <h3><i class="fas fa-bullseye"></i> Daily Study Goal</h3>
                <div class="goal-progress">
                    <div class="goal-text">
                        <span id="goal-progress-text">0/120 minutes</span>
                        <span id="goal-percentage">0%</span>
                    </div>
                    <div class="goal-bar">
                        <div class="goal-fill" id="goal-fill" style="width: 0%"></div>
                    </div>
                    <div class="goal-controls">
                        <input type="number" id="daily-goal" min="15" max="480" value="120">
                        <span>minutes</span>
                        <button id="set-goal">Set Goal</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add Stopwatch styles
    this.addStopwatchStyles();
    
    // Initialize Stopwatch
    this.initStopwatch();
}

// Add these methods AFTER the loadStopwatch method

addPomodoroStyles() {
    if (!document.querySelector('#pomodoro-styles')) {
        const style = document.createElement('style');
        style.id = 'pomodoro-styles';
        style.textContent = `
            /* Already added in features.css */
        `;
        document.head.appendChild(style);
    }
}

addStopwatchStyles() {
    if (!document.querySelector('#stopwatch-styles')) {
        const style = document.createElement('style');
        style.id = 'stopwatch-styles';
        style.textContent = `
            /* Already added in features.css */
        `;
        document.head.appendChild(style);
    }
}

initPomodoroTimer() {
    const user = authManager.getUser();
    if (!user) return;
    
    // Load user's Pomodoro settings
    const workTime = studyDB.getSetting(user.username, 'workTime', 25);
    const breakTime = studyDB.getSetting(user.username, 'breakTime', 5);
    const longBreakTime = studyDB.getSetting(user.username, 'longBreakTime', 15);
    const sessionsBeforeLong = studyDB.getSetting(user.username, 'sessionsBeforeLong', 4);
    
    // Set initial values
    document.getElementById('work-time').value = workTime;
    document.getElementById('break-time').value = breakTime;
    document.getElementById('long-break-time').value = longBreakTime;
    document.getElementById('sessions-before-long').value = sessionsBeforeLong;
    
    // Timer state
    let timer = {
        isRunning: false,
        isBreak: false,
        isLongBreak: false,
        currentSession: 1,
        totalSessions: sessionsBeforeLong,
        timeLeft: workTime * 60,
        totalSeconds: workTime * 60,
        interval: null
    };
    
    // Update display
    this.updatePomodoroDisplay(timer);
    this.updatePomodoroStats(user.username);
    
    // Event Listeners
    document.getElementById('pomo-start').addEventListener('click', () => {
        if (!timer.isRunning) {
            timer.isRunning = true;
            timer.interval = setInterval(() => this.updatePomodoroTimer(timer, user.username), 1000);
            showNotification('Focus session started! Stay concentrated!', 'info');
        }
    });
    
    document.getElementById('pomo-pause').addEventListener('click', () => {
        if (timer.isRunning) {
            timer.isRunning = false;
            clearInterval(timer.interval);
            showNotification('Timer paused', 'info');
        }
    });
    
    document.getElementById('pomo-reset').addEventListener('click', () => {
        timer.isRunning = false;
        clearInterval(timer.interval);
        
        if (timer.isBreak || timer.isLongBreak) {
            timer.isBreak = false;
            timer.isLongBreak = false;
            timer.timeLeft = workTime * 60;
            timer.totalSeconds = workTime * 60;
            document.getElementById('current-mode').textContent = 'Focus Time';
        } else {
            timer.timeLeft = workTime * 60;
            timer.totalSeconds = workTime * 60;
        }
        
        this.updatePomodoroDisplay(timer);
        showNotification('Timer reset', 'info');
    });
    
    document.getElementById('pomo-skip').addEventListener('click', () => {
        timer.isRunning = false;
        clearInterval(timer.interval);
        
        if (timer.isBreak || timer.isLongBreak) {
            // Skip to next focus session
            timer.isBreak = false;
            timer.isLongBreak = false;
            timer.timeLeft = workTime * 60;
            timer.totalSeconds = workTime * 60;
            document.getElementById('current-mode').textContent = 'Focus Time';
        } else {
            // Complete this session
            if (timer.currentSession < timer.totalSessions) {
                timer.currentSession++;
                timer.isBreak = true;
                timer.timeLeft = breakTime * 60;
                timer.totalSeconds = breakTime * 60;
                document.getElementById('current-mode').textContent = 'Short Break';
                showNotification('Focus session completed! Take a short break.', 'success');
            } else {
                timer.currentSession = 1;
                timer.isLongBreak = true;
                timer.timeLeft = longBreakTime * 60;
                timer.totalSeconds = longBreakTime * 60;
                document.getElementById('current-mode').textContent = 'Long Break';
                showNotification('Great work! Take a long break.', 'success');
            }
        }
        
        this.updatePomodoroDisplay(timer);
    });
    
    document.getElementById('save-settings').addEventListener('click', () => {
        const newWorkTime = parseInt(document.getElementById('work-time').value);
        const newBreakTime = parseInt(document.getElementById('break-time').value);
        const newLongBreakTime = parseInt(document.getElementById('long-break-time').value);
        const newSessionsBeforeLong = parseInt(document.getElementById('sessions-before-long').value);
        
        // Save settings
        studyDB.saveSetting(user.username, 'workTime', newWorkTime);
        studyDB.saveSetting(user.username, 'breakTime', newBreakTime);
        studyDB.saveSetting(user.username, 'longBreakTime', newLongBreakTime);
        studyDB.saveSetting(user.username, 'sessionsBeforeLong', newSessionsBeforeLong);
        
        // Update timer if not running
        if (!timer.isRunning) {
            timer.timeLeft = newWorkTime * 60;
            timer.totalSeconds = newWorkTime * 60;
            timer.totalSessions = newSessionsBeforeLong;
            this.updatePomodoroDisplay(timer);
        }
        
        showNotification('Settings saved successfully!', 'success');
    });
}

updatePomodoroTimer(timer, username) {
    if (timer.timeLeft <= 0) {
        clearInterval(timer.interval);
        timer.isRunning = false;
        
        // Play notification sound (simulated)
        this.playNotificationSound();
        
        if (timer.isBreak || timer.isLongBreak) {
            // Break finished, start focus session
            timer.isBreak = false;
            timer.isLongBreak = false;
            timer.timeLeft = timer.workTime * 60;
            timer.totalSeconds = timer.workTime * 60;
            document.getElementById('current-mode').textContent = 'Focus Time';
            showNotification('Break finished! Time to focus again.', 'info');
        } else {
            // Focus session finished
            studyDB.addStudySession(username, timer.workTime, 'Pomodoro Session');
            this.updatePomodoroStats(username);
            
            if (timer.currentSession < timer.totalSessions) {
                timer.currentSession++;
                timer.isBreak = true;
                timer.timeLeft = timer.breakTime * 60;
                timer.totalSeconds = timer.breakTime * 60;
                document.getElementById('current-mode').textContent = 'Short Break';
                showNotification('Focus session completed! Take a short break.', 'success');
            } else {
                timer.currentSession = 1;
                timer.isLongBreak = true;
                timer.timeLeft = timer.longBreakTime * 60;
                timer.totalSeconds = timer.longBreakTime * 60;
                document.getElementById('current-mode').textContent = 'Long Break';
                showNotification('Great work! All sessions completed. Take a long break.', 'success');
            }
        }
    } else {
        timer.timeLeft--;
    }
    
    this.updatePomodoroDisplay(timer);
}

updatePomodoroDisplay(timer) {
    const minutes = Math.floor(timer.timeLeft / 60);
    const seconds = timer.timeLeft % 60;
    
    document.getElementById('pomo-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('pomo-seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update progress ring
    const circle = document.querySelector('.progress-ring-circle');
    const circumference = 2 * Math.PI * 130;
    const offset = circumference - (timer.timeLeft / timer.totalSeconds) * circumference;
    circle.style.strokeDashoffset = offset;
    
    // Update current session
    document.getElementById('current-session').textContent = `${timer.currentSession}/${timer.totalSessions}`;
    
    // Update button states
    document.getElementById('pomo-start').disabled = timer.isRunning;
    document.getElementById('pomo-pause').disabled = !timer.isRunning;
}

updatePomodoroStats(username) {
    const stats = studyDB.getUserStats(username);
    const sessions = studyDB.getUserSessions(username);
    
    // Count today's Pomodoro sessions
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(s => {
        const sessionDate = new Date(s.date).toDateString();
        return sessionDate === today && s.subject === 'Pomodoro Session';
    }).length;
    
    // Calculate today's focus time from Pomodoro sessions
    const todayFocusTime = todaySessions * studyDB.getSetting(username, 'workTime', 25);
    
    // Calculate total focus time
    const totalFocusHours = Math.floor(stats.total / 60);
    
    document.getElementById('today-sessions').textContent = todaySessions;
    document.getElementById('focus-today').textContent = todayFocusTime + 'm';
    document.getElementById('total-focus').textContent = totalFocusHours + 'h';
}

playNotificationSound() {
    // Create audio context for notification sound
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

initStopwatch() {
    const user = authManager.getUser();
    if (!user) return;
    
    // Stopwatch state
    let stopwatch = {
        isRunning: false,
        startTime: 0,
        elapsedTime: 0,
        interval: null,
        currentSubject: 'General',
        sessions: []
    };
    
    // Load today's sessions
    this.loadTodaySessions(user.username, stopwatch);
    this.updateGoalProgress(user.username);
    
    // Event Listeners
    document.getElementById('sw-start').addEventListener('click', () => {
        if (!stopwatch.isRunning) {
            stopwatch.isRunning = true;
            stopwatch.startTime = Date.now() - stopwatch.elapsedTime;
            stopwatch.interval = setInterval(() => this.updateStopwatchDisplay(stopwatch), 10);
            
            // Update button states
            document.getElementById('sw-start').disabled = true;
            document.getElementById('sw-pause').disabled = false;
            document.getElementById('sw-lap').disabled = false;
            
            showNotification('Study session started! Good luck!', 'info');
        }
    });
    
    document.getElementById('sw-pause').addEventListener('click', () => {
        if (stopwatch.isRunning) {
            stopwatch.isRunning = false;
            stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
            clearInterval(stopwatch.interval);
            
            // Update button states
            document.getElementById('sw-start').disabled = false;
            document.getElementById('sw-pause').disabled = true;
            
            showNotification('Study session paused', 'info');
        }
    });
    
    document.getElementById('sw-reset').addEventListener('click', () => {
        if (confirm('End current study session and save it?')) {
            this.endStudySession(stopwatch, user.username);
        }
    });
    
    document.getElementById('sw-lap').addEventListener('click', () => {
        if (stopwatch.isRunning) {
            this.markSession(stopwatch, user.username);
        }
    });
    
    // Subject buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            stopwatch.currentSubject = btn.dataset.subject;
            document.getElementById('current-subject-text').textContent = stopwatch.currentSubject;
        });
    });
    
    document.getElementById('add-custom-subject').addEventListener('click', () => {
        const customSubject = document.getElementById('custom-subject').value.trim();
        if (customSubject) {
            stopwatch.currentSubject = customSubject;
            document.getElementById('current-subject-text').textContent = customSubject;
            document.getElementById('custom-subject').value = '';
            showNotification(`Subject set to: ${customSubject}`, 'success');
        }
    });
    
    document.getElementById('clear-sessions').addEventListener('click', () => {
        if (confirm('Clear all today\'s sessions?')) {
            this.clearTodaySessions(user.username);
            stopwatch.sessions = [];
            this.updateSessionsList(stopwatch.sessions);
            this.updateGoalProgress(user.username);
        }
    });
    
    document.getElementById('set-goal').addEventListener('click', () => {
        const goalMinutes = parseInt(document.getElementById('daily-goal').value);
        studyDB.saveSetting(user.username, 'dailyGoal', goalMinutes);
        showNotification(`Daily goal set to ${goalMinutes} minutes`, 'success');
        this.updateGoalProgress(user.username);
    });
}

updateStopwatchDisplay(stopwatch) {
    if (stopwatch.isRunning) {
        stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
    }
    
    const hours = Math.floor(stopwatch.elapsedTime / 3600000);
    const minutes = Math.floor((stopwatch.elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((stopwatch.elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((stopwatch.elapsedTime % 1000) / 10);
    
    document.getElementById('sw-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('sw-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('sw-seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('sw-milliseconds').textContent = milliseconds.toString().padStart(2, '0');
}

markSession(stopwatch, username) {
    if (stopwatch.elapsedTime < 1000) {
        showNotification('Study for at least 1 second to mark a session', 'error');
        return;
    }
    
    const sessionMinutes = Math.floor(stopwatch.elapsedTime / 60000);
    if (sessionMinutes < 1) {
        showNotification('Study for at least 1 minute to save a session', 'error');
        return;
    }
    
    const session = studyDB.addStudySession(username, sessionMinutes, stopwatch.currentSubject);
    stopwatch.sessions.push(session);
    
    // Reset stopwatch but keep running
    stopwatch.startTime = Date.now();
    stopwatch.elapsedTime = 0;
    
    // Update UI
    this.updateSessionsList(stopwatch.sessions);
    this.updateGoalProgress(username);
    
    showNotification(`Session recorded: ${sessionMinutes} minutes of ${stopwatch.currentSubject}`, 'success');
}

endStudySession(stopwatch, username) {
    if (stopwatch.isRunning) {
        stopwatch.isRunning = false;
        clearInterval(stopwatch.interval);
    }
    
    const sessionMinutes = Math.floor(stopwatch.elapsedTime / 60000);
    if (sessionMinutes >= 1) {
        const session = studyDB.addStudySession(username, sessionMinutes, stopwatch.currentSubject);
        stopwatch.sessions.push(session);
        showNotification(`Study session ended: ${sessionMinutes} minutes recorded`, 'success');
    }
    
    // Reset stopwatch
    stopwatch.startTime = 0;
    stopwatch.elapsedTime = 0;
    stopwatch.isRunning = false;
    clearInterval(stopwatch.interval);
    
    // Update button states
    document.getElementById('sw-start').disabled = false;
    document.getElementById('sw-pause').disabled = true;
    document.getElementById('sw-lap').disabled = true;
    
    // Update UI
    this.updateStopwatchDisplay(stopwatch);
    this.updateSessionsList(stopwatch.sessions);
    this.updateGoalProgress(username);
}

loadTodaySessions(username, stopwatch) {
    const allSessions = studyDB.getUserSessions(username);
    const today = new Date().toDateString();
    
    stopwatch.sessions = allSessions.filter(s => {
        const sessionDate = new Date(s.date).toDateString();
        return sessionDate === today;
    });
    
    this.updateSessionsList(stopwatch.sessions);
}

updateSessionsList(sessions) {
    const container = document.getElementById('sessions-list');
    
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
    
    // Update summary
    this.updateSessionSummary(sessions);
}

updateSessionSummary(sessions) {
    if (sessions.length === 0) {
        document.getElementById('total-today').textContent = '0h 0m';
        document.getElementById('session-count').textContent = '0';
        document.getElementById('longest-session').textContent = '0m';
        document.getElementById('focus-score').textContent = '0%';
        return;
    }
    
    const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
    const sessionCount = sessions.length;
    const longestSession = Math.max(...sessions.map(s => s.duration));
    
    // Calculate focus score (simplified: more sessions = better focus)
    const focusScore = Math.min(100, Math.round((totalMinutes / 60) * 10));
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    document.getElementById('total-today').textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    document.getElementById('session-count').textContent = sessionCount;
    document.getElementById('longest-session').textContent = `${longestSession}m`;
    document.getElementById('focus-score').textContent = `${focusScore}%`;
}

updateGoalProgress(username) {
    const sessions = studyDB.getUserSessions(username);
    const today = new Date().toDateString();
    
    const todaySessions = sessions.filter(s => {
        const sessionDate = new Date(s.date).toDateString();
        return sessionDate === today;
    });
    
    const totalMinutes = todaySessions.reduce((sum, session) => sum + session.duration, 0);
    const goalMinutes = studyDB.getSetting(username, 'dailyGoal', 120);
    const percentage = Math.min(100, Math.round((totalMinutes / goalMinutes) * 100));
    
    document.getElementById('goal-progress-text').textContent = `${totalMinutes}/${goalMinutes} minutes`;
    document.getElementById('goal-percentage').textContent = `${percentage}%`;
    document.getElementById('goal-fill').style.width = `${percentage}%`;
}

clearTodaySessions(username) {
    // This is a simplified version - in a real app, you'd filter out today's sessions
    showNotification('Today\'s sessions cleared', 'info');
}

// Start the application
const app = new StudyZenApp();
