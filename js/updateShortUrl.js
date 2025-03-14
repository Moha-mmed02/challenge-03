const editModal = document.getElementById("editModal");
const editUrlInput = document.getElementById("editUrlInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const closeModal = document.querySelector(".close");

let currentShortUrlId = null; 

const attachEditEvent = () => {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            currentShortUrlId = event.target.getAttribute('data-id');
            const currentUrl = event.target.getAttribute('data-url');

            editUrlInput.value = currentUrl; 
            editModal.style.display = "flex"; 
        });
    });
};


closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
});


saveEditBtn.addEventListener("click", async () => {
    const newUrl = editUrlInput.value.trim();
    if (!newUrl || !currentShortUrlId) {
        alert("URL cannot be empty!");
        return;
    }

    const url = `https://www.shorten-url-api.infobrains.club/api/private/urls/${currentShortUrlId}`;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ originalUrl: newUrl })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        alert('URL updated successfully');

        document.querySelector(`button[data-id='${currentShortUrlId}']`).closest('.shorten-url').querySelector('.original-url-text').textContent = newUrl;
        
        editModal.style.display = "none";
    } catch (error) {
        alert('Failed to update URL: ' + error.message);
    }
});

window.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.style.display = "none";
    }
});
