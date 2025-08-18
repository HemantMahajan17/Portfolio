document.addEventListener('DOMContentLoaded', function() {
    // Function to load page content via AJAX
    function loadPage(page) {
        console.log(`Loading page: ${page}`);  // Debugging log
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const mainContent = document.querySelector('#main-content');
                if (mainContent) {
                    mainContent.innerHTML = html;
                } else {
                    console.error('Element with ID "main-content" not found.');
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Event listeners for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('href');
            loadPage(page);
            history.pushState(null, '', page);
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', function() {
        loadPage(location.pathname);  // Load the correct path from the browser's history
    });

    // Load the current page on initial load (if user navigates directly to a specific page)
    loadPage(location.pathname === '/' ? 'index.html' : location.pathname);

    // Handle header visibility based on cursor position
    const header = document.querySelector('header');
    document.addEventListener('mousemove', function(event) {
        if (event.clientY <= 50) { // Adjust the value as needed
            header.classList.add('visible');
            header.classList.remove('hidden');
        } else {
            header.classList.add('hidden');
            header.classList.remove('visible');
        }
    });
});

// Function to toggle the menu visibility
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}
