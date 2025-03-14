const attachDeleteEvent = () => {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const shortUrlId = event.target.getAttribute('data-id');
            const token = localStorage.getItem('token');

            if (!confirm("Are you sure you want to delete this URL?")) {
                return;
            }

            try {
                const response = await fetch(`https://www.shorten-url-api.infobrains.club/api/private/urls/${shortUrlId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                alert('URL deleted successfully');

                event.target.closest('.short-url-item').remove();
            } catch (error) {
                alert('Failed to delete URL: ' + error.message);
            }
        });
    });
};
