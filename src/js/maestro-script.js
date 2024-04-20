



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
        } else {
            alert('Por favor, complete todos los campos.');
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