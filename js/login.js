const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    const url = 'https://www.shorten-url-api.infobrains.club/api/public/auth/login';

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const jsonResponse = await result.json();

        console.log('Response Status:', result.status);
        console.log('Response JSON:', jsonResponse);

        if (result.status === 500) {
            alert('Internal server error');
        } else if (result.status === 400) {
            alert(jsonResponse.error.details);
        } else if (result.status === 200) {
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
