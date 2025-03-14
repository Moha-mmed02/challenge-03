const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('input[name="name"]').value;
    const email = registerForm.querySelector('input[name="email"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;
    const con_password = registerForm.querySelector('input[name="con_password"]').value;

    if (password !== con_password) {
        alert('Passwords do not match');
        return;
    }

    const url = 'https://www.shorten-url-api.infobrains.club/api/public/auth/register';

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const jsonResponse = await result.json();

        if (result.status === 500) {
            alert('Internal server error');
        } else if (result.status === 409) {
            alert('Email already exists');
        } else if (result.status === 400) {
            alert(jsonResponse.error.details);
        } else if (result.status === 201) {
            const token = jsonResponse.data.accessToken;
            localStorage.setItem('token', token);
            window.location.href = '/pages/shorten.html';
        } else {
            alert('Unexpected error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
});
