const buttonChangeScheme = document.getElementById('changeScheme');
const bodyHTML = document.getElementById('bodyHTML');
const lineaHTML = document.getElementsByClassName("linea");


buttonChangeScheme.addEventListener('click', () => {
    if (buttonChangeScheme.classList.contains('fa-sun')) {
        buttonChangeScheme.classList.remove('fa-sun');
        buttonChangeScheme.classList.add('fa-moon');
        bodyHTML.classList.remove('bgColor');
        bodyHTML.classList.add('bgColorWhite');
        
        Array.from(lineaHTML).forEach(element => {
            element.classList.remove('lineaBlack');
            element.classList.add('lineaWhite');
        });
    } else {
        buttonChangeScheme.classList.remove('fa-moon');
        buttonChangeScheme.classList.add('fa-sun');
        bodyHTML.classList.remove('bgColorWhite');
        bodyHTML.classList.add('bgColor');

        Array.from(lineaHTML).forEach(element => {
            element.classList.remove('lineaWhite');
            element.classList.add('lineaBlack');
        });

    }

   
}) 