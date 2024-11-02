const redirect = document.querySelectorAll('.buttonSearch');

redirect.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = './searchPokapi.html';
    })
})