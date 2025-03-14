const shortenUrlList = document.getElementById('shorten-list');

const getShortUrls = async () => {
    const url = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${url}?page=1&limit=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching URLs');
        }

        const jsonResponse = await response.json();
        shortenUrlList.innerHTML = "";

        jsonResponse.data.forEach((shortUrl) => {
            const div = document.createElement('div');
            div.classList.add('short-url-item');
            div.innerHTML = `
                <div class="shorten-url">
                    <p><strong>Original:</strong> 
                        <span class="original-url-text">${shortUrl.originalUrl}</span>
                    </p>
                    <p><strong>Shortened:</strong> 
                        <a href="${shortUrl.shortUrl}" target="_blank">${shortUrl.shortUrl}</a>
                    </p>
                    <button class="edit-btn" data-id="${shortUrl.id}" data-url="${shortUrl.originalUrl}">Edit</button>
                    <button class="delete-btn" data-id="${shortUrl.id}">Delete</button>
                </div>
            `;

            shortenUrlList.appendChild(div);
        });

        attachEditEvent();
        attachDeleteEvent();
    } catch (error) {
        console.error('Failed to fetch URLs:', error);
        alert('Failed to load URLs');
    }
};

getShortUrls();
