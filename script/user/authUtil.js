// authUtil.js

import { isLoggedIn, getLoggedInUser, logout } from "./auth.js";

const SESSION_TIMEOUT_HOURS = 3; // Waktu timeout session dalam jam

// Fungsi untuk mengatur session timeout
function setSessionTimeout() {
    setTimeout(() => {
        logout(); // Panggil fungsi logout saat session timeout
        window.location.href = "login-page.html"; // Redirect ke halaman login
    }, SESSION_TIMEOUT_HOURS * 60 * 60 * 1000); // Konversi jam ke milidetik
}

// Fungsi untuk memeriksa login dan user
export async function checkLoginAndUser() {
    if (!isLoggedIn()) {
        // Jika tidak ada pengguna yang login, redirect kembali ke halaman login.html
        window.location.href = "login-page.html";
        throw new Error('User is not logged in');
    }

    const loggedInUser = getLoggedInUser();
    console.log(loggedInUser);

    // Set session timeout
    setSessionTimeout();

    return loggedInUser;
}

export function handleLogout() {
    logout(); // Panggil fungsi logout
    window.location.href = "login-page.html"; // Redirect ke halaman login
}
