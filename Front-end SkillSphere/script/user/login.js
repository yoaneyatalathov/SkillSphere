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

        // Simpan informasi pengguna yang berhasil login di session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redirect ke halaman index.html
        window.location.href = 'pelatihan.html';

    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('errorMessage').textContent = 'login gagal, username atau password salah';
    }
});