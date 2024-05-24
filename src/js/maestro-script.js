 // Mostrar secciones al presionar opciones del sidebar
 document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar nav ul li a');
    sidebarItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const sections = document.querySelectorAll('section');
                sections.forEach(function(section) {
                    section.style.display = 'none';
                });
                targetSection.style.display = 'block';
            }
        });
    });

    // Script para manejar la publicación en el foro
    document.getElementById('threadForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('threadTitle').value;
        const content = document.getElementById('threadContent').value;
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        const threadsContainer = document.getElementById('threads');

        const threadDiv = document.createElement('div');
        threadDiv.className = 'thread';

        const titleP = document.createElement('h4');
        titleP.textContent = title;

        const contentP = document.createElement('p');
        contentP.textContent = content;

        const timeP = document.createElement('p');
        const now = new Date();
        timeP.textContent = `Publicado el: ${now.toLocaleString()}`;

        threadDiv.appendChild(titleP);
        threadDiv.appendChild(contentP);
        threadDiv.appendChild(timeP);

        if (file) {
            const fileLink = document.createElement('a');
            const fileURL = URL.createObjectURL(file);
            fileLink.href = fileURL;
            fileLink.download = file.name;
            fileLink.textContent = `Archivo adjunto: ${file.name}`;
            fileLink.target = "_blank";
            threadDiv.appendChild(fileLink);
        }

        threadsContainer.appendChild(threadDiv);
        document.getElementById('threadForm').reset();
    });
});

// Funcion que permite insertar comentarios en un foro.

document.addEventListener('DOMContentLoaded', function () {
    const threadForm = document.getElementById('threadForm');
    const threadsContainer = document.getElementById('threads');

    threadForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('threadTitle').value;
        const content = document.getElementById('threadContent').value;

        if (title && content) {
            createThread(title, content);
            threadForm.reset();
        }
    });

    function createThread(title, content) {
        const threadDiv = document.createElement('div');
        threadDiv.classList.add('thread');

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const contentElement = document.createElement('p');
        contentElement.textContent = content;

        threadDiv.appendChild(titleElement);
        threadDiv.appendChild(contentElement);

        threadsContainer.appendChild(threadDiv);
    }
});