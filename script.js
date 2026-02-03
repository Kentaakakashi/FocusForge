// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log("StudyZen - DOM Loaded and Initializing...");
    
    // Main Application Controller
    class StudyZenApp {
        constructor() {
            this.currentPage = 'landing';
            this.currentTab = 'timer';
            this.chatHistory = JSON.parse(localStorage.getItem('studyzen_chat_history')) || [];
            
            // Timer Variables
            this.timer = null;
            this.timeLeft = 25 * 60;
            this.isPaused = true;
            this.isBreak = false;
            
            this.init();
        }

        init() {
            console.log("Initializing StudyZenApp...");
            
            // FIX: Hide loading screen and show app after 1 second
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                const appContainer = document.getElementById('app');
                
                if (loadingScreen) loadingScreen.classList.add('hidden');
                if (appContainer) appContainer.classList.remove('hidden');
                
                this.loadPage();
                console.log("App loaded successfully");
            }, 1000);

            // Setup theme toggle button
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => {
                    if (typeof themeManager !== 'undefined') themeManager.showThemeSelector();
                });
            }

            // Setup modal close button
            const closeModal = document.querySelector('.close-modal');
            const themeModal = document.getElementById('theme-modal');
            if (closeModal && themeModal) {
                closeModal.addEventListener('click', () => themeModal.classList.add('hidden'));
            }
        }

        loadPage(page = null) {
            if (page) this.currentPage = page;
            const app = document.getElementById('app');
            const user = localStorage.getItem('studyzen_current_user');

            if (user) {
                this.showDashboard();
            } else {
                if (this.currentPage === 'login') {
                    this.showLogin();
                } else if (this.currentPage === 'signup') {
                    this.showSignup();
                } else {
                    this.showLanding();
                }
            }
        }

        // --- AUTHENTICATION PAGES ---
        showLanding() {
            document.getElementById('app').innerHTML = `
                <div class="landing-container">
                    <div class="landing-content">
                        <h1 class="landing-title"><i class="fas fa-graduation-cap"></i> StudyZen</h1>
                        <p class="landing-subtitle">Your AI-powered study sanctuary. Master your time and ace your goals.</p>
                        <div class="landing-buttons">
                            <button onclick="app.loadPage('signup')" class="btn-primary">Get Started</button>
                            <button onclick="app.loadPage('login')" class="btn-secondary">Login</button>
                        </div>
                    </div>
                </div>`;
        }

        showLogin() {
            document.getElementById('app').innerHTML = `
                <div class="landing-container">
                    <div class="auth-box" style="background: white; padding: 40px; border-radius: 20px; color: #333; width: 350px;">
                        <h2>Welcome Back</h2>
                        <input type="text" id="login-user" placeholder="Username" style="display:block; width:100%; margin: 15px 0; padding: 12px; border-radius: 8px; border: 1px solid #ddd;">
                        <input type="password" id="login-pass" placeholder="Password" style="display:block; width:100%; margin: 15px 0; padding: 12px; border-radius: 8px; border: 1px solid #ddd;">
                        <button onclick="app.handleLogin()" class="btn-primary" style="background: #667eea; color: white; width: 100%; border: none; padding: 12px; border-radius: 8px; cursor: pointer;">Login</button>
                        <p onclick="app.loadPage('signup')" style="margin-top:15px; cursor:pointer; color: #667eea; font-size: 0.9rem; text-align: center;">New here? Create account</p>
                    </div>
                </div>`;
        }

        showSignup() {
            document.getElementById('app').innerHTML = `
                <div class="landing-container">
                    <div class="auth-box" style="background: white; padding: 40px; border-radius: 20px; color: #333; width: 350px;">
                        <h2>Join StudyZen</h2>
                        <input type="text" id="reg-user" placeholder="Username" style="display:block; width:100%; margin: 15px 0; padding: 12px; border-radius: 8px; border: 1px solid #ddd;">
                        <input type="password" id="reg-pass" placeholder="Password" style="display:block; width:100%; margin: 15px 0; padding: 12px; border-radius: 8px; border: 1px solid #ddd;">
                        <button onclick="app.handleSignup()" class="btn-primary" style="background: #667eea; color: white; width: 100%; border: none; padding: 12px; border-radius: 8px; cursor: pointer;">Create Account</button>
                        <p onclick="app.loadPage('login')" style="margin-top:15px; cursor:pointer; color: #667eea; font-size: 0.9rem; text-align: center;">Already have an account? Login</p>
                    </div>
                </div>`;
        }

        handleLogin() {
            const user = document.getElementById('login-user').value;
            const pass = document.getElementById('login-pass').value;
            if (typeof authManager !== 'undefined') {
                if (authManager.login(user, pass).success) this.loadPage();
            }
        }

        handleSignup() {
            const user = document.getElementById('reg-user').value;
            const pass = document.getElementById('reg-pass').value;
            if (typeof authManager !== 'undefined') {
                if (authManager.signup(user, user, pass).success) this.loadPage();
            }
        }

        // --- DASHBOARD SYSTEM ---
        showDashboard() {
            const user = JSON.parse(localStorage.getItem('studyzen_current_user'));
            document.getElementById('app').innerHTML = `
                <div class="dashboard-container" style="display: flex; height: 100vh;">
                    <nav class="sidebar" style="width: 250px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px; border-right: 1px solid rgba(255,255,255,0.2);">
                        <div class="logo" style="font-size: 1.8rem; font-weight: bold; margin-bottom: 40px; color: #667eea;">Zen</div>
                        <ul style="list-style: none; padding: 0;">
                            <li onclick="app.switchTab('timer')" style="padding: 15px; cursor: pointer; color: #333;"><i class="fas fa-clock"></i> Timer</li>
                            <li onclick="app.switchTab('chatbot')" style="padding: 15px; cursor: pointer; color: #333;"><i class="fas fa-robot"></i> AI Assistant</li>
                            <li onclick="app.switchTab('stats')" style="padding: 15px; cursor: pointer; color: #333;"><i class="fas fa-chart-line"></i> Statistics</li>
                        </ul>
                        <div style="position: absolute; bottom: 30px; cursor: pointer;" onclick="app.logout()">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </div>
                    </nav>
                    <main id="dashboard-content" style="flex: 1; padding: 40px; overflow-y: auto;"></main>
                </div>`;
            this.switchTab(this.currentTab);
        }

        switchTab(tab) {
            this.currentTab = tab;
            const container = document.getElementById('dashboard-content');
            if (tab === 'chatbot') this.loadChatbot(container);
            else if (tab === 'timer') this.loadTimer(container);
            else if (tab === 'stats') this.loadStats(container);
        }

        logout() {
            localStorage.removeItem('studyzen_current_user');
            location.reload();
        }

        // --- FEATURES ---
        loadTimer(container) {
            container.innerHTML = `
                <div class="pomodoro-container" style="text-align: center;">
                    <h1>Focus Timer</h1>
                    <div style="font-size: 6rem; margin: 40px 0;">25:00</div>
                    <button class="btn-primary" style="padding: 15px 50px;">Start Session</button>
                </div>`;
        }

        loadChatbot(container) {
            container.innerHTML = `
                <div class="chatbot-container" style="background: white; border-radius: 15px; height: 80vh; display: flex; flex-direction: column; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <div id="chat-messages" style="flex: 1; padding: 20px; overflow-y: auto;">
                        <div class="message ai-message">Hi! I'm your Study Assistant. Ask me anything!</div>
                    </div>
                    <div style="padding: 20px; border-top: 1px solid #eee; display: flex;">
                        <input type="text" id="ai-input" placeholder="Type your question..." style="flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #ddd;">
                        <button onclick="app.sendMessage()" style="margin-left: 10px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">Send</button>
                    </div>
                </div>`;
            this.loadChatHistory();
        }

        sendMessage() {
            const input = document.getElementById('ai-input');
            const chat = document.getElementById('chat-messages');
            if(!input.value.trim()) return;

            const userText = input.value;
            chat.innerHTML += `<div class="message user-message" style="text-align: right; margin: 10px 0;"><strong>You:</strong> ${userText}</div>`;
            input.value = "";
            
            this.chatHistory.push({text: userText, isUser: true});
            localStorage.setItem('studyzen_chat_history', JSON.stringify(this.chatHistory));

            // AI Response Placeholder
            setTimeout(() => {
                const response = "That's a great study question! I'll help you solve that.";
                chat.innerHTML += `<div class="message ai-message" style="margin: 10px 0; color: #667eea;"><strong>Zen:</strong> ${response}</div>`;
                this.chatHistory.push({text: response, isUser: false});
                localStorage.setItem('studyzen_chat_history', JSON.stringify(this.chatHistory));
                chat.scrollTop = chat.scrollHeight;
            }, 1000);
        }

        loadChatHistory() {
            const chatMessages = document.getElementById('chat-messages');
            if (this.chatHistory.length > 0) {
                this.chatHistory.forEach(msg => {
                    const sender = msg.isUser ? "You" : "Zen";
                    const align = msg.isUser ? "right" : "left";
                    chatMessages.innerHTML += `<div class="message" style="text-align: ${align}; margin: 10px 0;"><strong>${sender}:</strong> ${msg.text}</div>`;
                });
            }
        }

        loadStats(container) {
            container.innerHTML = `<h1>Your Statistics</h1><p>You've studied for 0 hours this week. Keep going!</p>`;
        }
    }

    // Start Application
    console.log("Starting StudyZen application...");
    window.app = new StudyZenApp();
});
