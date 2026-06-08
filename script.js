
function saveSystemInfo() {
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
      
    };

    localStorage.setItem('systemInfo', JSON.stringify(info));
}


function displayLocalStorageInFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    let html = '<h3>Дані з localStorage:</h3><ul>';
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        html += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += '</ul>';
    
    footer.innerHTML = html;
}


window.addEventListener('load', () => {
    saveSystemInfo();
    displayLocalStorageInFooter();
});


async function loadReviews() {
    const variant = 6;
    const url = `https://jsonplaceholder.typicode.com/posts/${variant}/comments`;
    
    try {
        const response = await fetch(url);
        const comments = await response.json();
        
        const container = document.getElementById('reviews-container');
        if (!container) return;
        
        container.innerHTML = '<h2>Відгуки</h2>';
        
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.className = 'review-card';
            div.innerHTML = `
                <h4>${comment.email}</h4>
                <p><strong>${comment.name}</strong></p>
                <p>${comment.body}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Помилка завантаження коментарів:', error);
    }
}
let modalShown = false;

function showContactModal() {
    if (modalShown) return;
    modalShown = true;

    const modal = document.createElement('div');
    modal.id = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Форма зворотнього зв'язку</h2>
            <form action="https://formspree.io/f/ВАШ_ЕНДПОЙНТ" method="POST">
                <label>Ім'я: <input type="text" name="name" required></label><br>
                <label>Email: <input type="email" name="email" required></label><br>
                <label>Телефон: <input type="tel" name="phone"></label><br>
                <label>Повідомлення:<br>
                    <textarea name="message" rows="5" required></textarea>
                </label><br>
                <button type="submit">Відправити</button>
                <button type="button" onclick="closeModal()">Закрити</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) modal.remove();
}

// Показати через 1 хвилину
setTimeout(showContactModal, 60000);
function setTheme() {
    const hour = new Date().getHours();
    const isDay = hour >= 7 && hour <= 21;
    document.documentElement.setAttribute('data-theme', isDay ? 'light' : 'dark');
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
}