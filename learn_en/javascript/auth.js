const API_URL = 'http://localhost:5000';

// Check if user is logged in (on Home Page)
if (window.location.pathname.includes('home.html')) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if no token
    } else {
        fetchHomeData(token);
    }
}

// Login function
async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Save token
            window.location.href = 'home.html'; // Redirect to home
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Register function
async function register() {
    const nickname = document.getElementById('registerNickname').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html'; // Redirect to login
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Fetch home data (protected route)
async function fetchHomeData(token) {
    try {
        const response = await fetch(`${API_URL}/home`, {
            headers: { 'Authorization': token },
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('welcomeMessage').textContent = data.message;
        } else {
            showError(data.message);
            localStorage.removeItem('token'); // Clear invalid token
            window.location.href = 'login.html'; // Redirect to login
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token'); // Clear token
    window.location.href = 'login.html'; // Redirect to login
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
}