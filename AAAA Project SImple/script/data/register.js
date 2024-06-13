document.getElementById('createAccountForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const accountMessage = document.getElementById('accountMessage');

    if (newPassword !== confirmPassword) {
        accountMessage.textContent = 'Passwords do not match.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: newPassword,
                favorit_pelatihan: [] // Jika Anda memiliki data tambahan untuk disimpan
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create account');
        }

        const newUser = await response.json();
        accountMessage.textContent = `Account created for ${newUser.username}!`;

        // Clear the form
        document.getElementById('createAccountForm').reset();

    } catch (error) {
        console.error('Error creating account:', error);
        accountMessage.textContent = 'Error creating account. Please try again later.';
    }
});
