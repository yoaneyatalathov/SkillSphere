// Fungsi untuk logout
export function logout() {
    sessionStorage.removeItem('loggedInUser');
}

// Fungsi untuk memeriksa apakah pengguna sudah login
export function isLoggedIn() {
    return !!sessionStorage.getItem('loggedInUser');
}

// Fungsi untuk mendapatkan informasi pengguna yang sedang login
export function getLoggedInUser() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
}
