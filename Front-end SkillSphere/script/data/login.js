document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Fetch semua pengguna dari endpoint /users
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        // Cek apakah ada pengguna dengan username dan password yang cocok
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Jika login berhasil, redirect ke halaman index.html
        window.location.href = '../index.html';

    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('errorMessage').textContent = 'Login failed. Please check your credentials.';
    }
})