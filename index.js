document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMessage = document.getElementById('errorMessage');

    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        errorMessage.textContent = '';

        if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('rememberMe', rememberMe);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('rememberMe');
        }
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
});

window.onload = function() {
    const rememberedUsername = localStorage.getItem('username');
    const rememberedRememberMe = localStorage.getItem('rememberMe');

    if (rememberedUsername && rememberedRememberMe) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('rememberMe').checked = true;
    }
};
