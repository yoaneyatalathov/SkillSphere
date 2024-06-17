document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Fetch semua pengguna dari endpoint /organizers
        const response = await fetch('http://localhost:3000/organizers');
        const organizers = await response.json();

        // Cek apakah ada pengguna dengan email dan password yang cocok
        const organizer = organizers.find(u => u.email === email && u.password === password);

        if (!organizer) {
            throw new Error('Invalid email or password');
        }

        // Simpan informasi pengguna yang berhasil login di session storage
        sessionStorage.setItem('loggedInOrganizer', JSON.stringify(organizer));

        // Redirect ke halaman index.html
        window.location.href = 'form.html';

    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('errorMessage').textContent = 'login gagal, email atau password salah';
    }
});

document.getElementById('createAccountForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const newPassword = document.getElementById('reg-password').value;
    try {
        const response = await fetch('http://localhost:3000/organizers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: newPassword,
                pelatihan_id: [] // Jika Anda memiliki data tambahan untuk disimpan
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create account');
        }

        const newOrganizer = await response.json();
        alert(`Akun ${newOrganizer.username} telah dibuat`);

        // Clear the form
        document.getElementById('createAccountForm').reset();

        window.location.href = 'auth-organizer.html';


    } catch (error) {
        console.error('Error creating account:', error);
        alert('Gagal Membuat Akun baru, silahkan coba lagi nanti');
    }
});
