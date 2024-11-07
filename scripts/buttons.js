const url= 'https://672bdc9a1600dda5a9f69754.mockapi.io/users'



// Evento para el botón "Buscar"
document.getElementById('btnSearch').addEventListener('click', function() {
    const userId = document.getElementById('inputUserId').value.trim();

    if (userId) {
        obtenerUsuarioPorId(userId);
    } else {
        
        listarUsuarios();
    }
});

//Desactivar botones si hay campos vacíos
const toggleButtons = () => {
    document.getElementById('agregarBtn').disabled = !(nameInput.value && lastnameInput.value);
    document.getElementById('modificarBtn').disabled = !userIdInput.value;
    document.getElementById('borrarBtn').disabled = !userIdInput.value;
};

    userIdInput.addEventListener('input', toggleButtons);
    nameInput.addEventListener('input', toggleButtons);
    lastnameInput.addEventListener('input', toggleButtons);