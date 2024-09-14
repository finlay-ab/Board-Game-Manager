// Function to load a script
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.head.appendChild(script);
}

// Function to load a stylesheet
function loadStylesheet(href) {
    const link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

// Load Bootstrap CSS and JS
loadStylesheet('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
loadStylesheet('https://getbootstrap.com/docs/5.3/assets/css/docs.css');
loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js');

// Load Firebase scripts
loadScript('/__/firebase/10.13.1/firebase-app-compat.js');
loadScript('/__/firebase/10.13.1/firebase-auth-compat.js');
loadScript('/__/firebase/10.13.1/firebase-database-compat.js');
loadScript('/__/firebase/10.13.1/firebase-firestore-compat.js');
loadScript('/__/firebase/10.13.1/firebase-functions-compat.js');
loadScript('/__/firebase/10.13.1/firebase-messaging-compat.js');
loadScript('/__/firebase/10.13.1/firebase-storage-compat.js');
loadScript('/__/firebase/10.13.1/firebase-analytics-compat.js');
loadScript('/__/firebase/10.13.1/firebase-remote-config-compat.js');
loadScript('/__/firebase/10.13.1/firebase-performance-compat.js');
loadScript('/__/firebase/init.js?useEmulator=true');
