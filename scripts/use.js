let listaDeUsuarios = listarUsuarios();

function mostrarDatos(datos) {
    let pizarra = document.getElementById("results");
    pizarra.innerHTML = "";  // Limpiar los resultados anteriores
    
    let HTMLContentToAppend = "";
    for (const item of datos) {
        HTMLContentToAppend += `
        <li class="list-group-item bg-dark text-white">
            ID: ${item.id} <br>
            NAME: ${item.name} <br>
            LASTNAME: ${item.lastname}
        </li>
        `;
    }

    // Mostrar los datos actualizados en el contenedor "results"
    pizarra.innerHTML = HTMLContentToAppend;
}

function mostrarAlerta() {
    document.getElementById("alert-error").classList.add("show");
    window.setTimeout(() => document.getElementById("alert-error").classList.remove("show"), 3000)
    pizarra = document.getElementById("results").innerHTML = "";
}

//HABILITACIÓN DE BOTONES
function habilitarBotones() {
    // Habilitar o deshabilitar botón para agregar nuevo registro (POST)
    const btnPost = document.getElementById("btnPost");
    if (document.getElementById("inputPostNombre").value && document.getElementById("inputPostApellido").value) {
        btnPost.disabled = false;
    } else {
        btnPost.disabled = true;
    }

    // Habilitar o deshabilitar botón para modificar registro (PUT)
    const btnPut = document.getElementById("btnPut");
    if (document.getElementById("inputPutId").value) {
        btnPut.disabled = false;
    } else {
        btnPut.disabled = true;
    }

    // Habilitar o deshabilitar botón para eliminar registro (DELETE)
    const btnDelete = document.getElementById("btnDelete");
    if (document.getElementById("inputDelete").value) {
        btnDelete.disabled = false;
    } else {
        btnDelete.disabled = true;
    }

    // Habilitar o deshabilitar botón de guardar cambios en el modal (PUT)
    const btnSendChanges = document.getElementById("btnSendChanges");
    if (document.getElementById("inputPutNombre").value && document.getElementById("inputPutApellido").value) {
        btnSendChanges.disabled = false;
    } else {
        btnSendChanges.disabled = true;
    }
}

// EVENTOS DE LOS BOTONES

//BOTÓN DE BUSCAR CON O SIN ID
document.getElementById("btnGet1").addEventListener("click", () => {
    const userId = document.getElementById("inputGet1Id").value;
    
    // Si el ID está vacío, mostramos todos los usuarios
    if (userId.trim() === "") {
        listarUsuarios().then(data => {
            mostrarDatos(data);  // Pasamos los datos obtenidos a la función mostrarDatos
        }).catch(error => {
            mostrarAlerta();
        });
    } else {
        // Si hay un ID, obtenemos el usuario por ID
        obtenerUsuarioPorId(userId).then(data => {
            if (data) {
                mostrarDatos([data]);  // Pasamos el usuario dentro de un array
            } else {
                mostrarAlerta();  // Si no se encuentra el usuario
            }
        }).catch(error => {
            mostrarAlerta();
        });
    }
});

//BOTÓN PARA AGREGAR NUEVO USUARIO
document.getElementById("btnPost").addEventListener("click", () => {
    const newName = document.getElementById("inputPostNombre").value;
    const newLastname = document.getElementById("inputPostApellido").value;

    // Creamos el nuevo usuario
    const nuevoUsuario = {
        name: newName,
        lastname: newLastname
    };

    // Llamamos a la función de agregar usuario desde el script de solicitudes fetch
    agregarUsuario(nuevoUsuario)
        .then(data => {
            console.log('Usuario agregado:', data);

            // Obtener los usuarios actuales
            listarUsuarios()
                .then(usuariosExistentes => {
                    // Combinar los usuarios existentes con el nuevo usuario
                    const todosLosUsuarios = [...usuariosExistentes, data];

                    // Mostrar todos los usuarios
                    mostrarDatos(todosLosUsuarios);
                })
                .catch(error => {
                    console.error('Error al obtener usuarios existentes:', error);
                    mostrarAlerta();
                });
        })
        .catch(error => {
            console.error('Error al agregar usuario:', error);
            mostrarAlerta();
        });
});

//BOTONES PARA MODIFICAR USUARIO
document.getElementById("btnPut").addEventListener("click", () => {
    const modifyUserId = document.getElementById("inputPutId").value;
    if (modifyUserId.trim() !== "") {
        obtenerUsuarioPorId(modifyUserId)
            .then(user => {
                // Cargar los datos en el modal
                document.getElementById("inputPutNombre").value = user.name;
                document.getElementById("inputPutApellido").value = user.lastname;

                // Abrir el modal
                const modal = new bootstrap.Modal(document.getElementById("dataModal"));
                modal.show();
            });
    } else {
        mostrarAlerta();  // Si no hay ID, mostrar alerta
    }
});

//BOTÓN DE GUARDAR CAMBIOS EN EL MODAL
document.getElementById("btnSendChanges").addEventListener("click", () => {
    const modifyUserId = document.getElementById("inputPutId").value; // ID del usuario a modificar
    const modifiedUser = {
        name: document.getElementById("inputPutNombre").value, // Nuevo nombre
        lastname: document.getElementById("inputPutApellido").value // Nuevo apellido
    };

    // Validar que los campos no estén vacíos
    if (!modifiedUser.name || !modifiedUser.lastname) {
        mostrarAlerta();  // Si los campos están vacíos, mostrar alerta
        return;
    }

    // Llamar a la función modificarUsuario desde el script de backend
    modificarUsuario(modifyUserId, modifiedUser)
        .then(user => {
            console.log('Usuario modificado:', user);

            // Cerrar el modal después de la modificación
            const modal = bootstrap.Modal.getInstance(document.getElementById("dataModal"));
            modal.hide();

            // Volver a listar los usuarios
            listarUsuarios()
                .then(users => mostrarDatos(users))
                .catch(error => mostrarAlerta());  // Si hay error al obtener los usuarios, mostrar alerta
        })
        .catch(error => {
            console.error('Error al modificar usuario:', error);
            mostrarAlerta();  // Mostrar alerta si hay error
        });
});


//BOTÓN PARA ELIMINAR USUARIOS POR SU ID
document.getElementById("btnDelete").addEventListener("click", () => {
    const userId = document.getElementById("inputDelete").value;  // Obtener el ID del usuario a eliminar

    if (userId.trim() !== "") {
        // Llamar a la función para eliminar el usuario
        eliminarUsuario(userId)
            .then(() => {
                // Si la eliminación fue exitosa, proceder a obtener la lista actualizada de usuarios
                listarUsuarios()
                    .then(users => {
                        // Mostrar la lista de usuarios actualizada
                        mostrarDatos(users);
                    })
                    .catch(error => {
                        console.error('Error al obtener usuarios después de eliminar:', error);
                    });
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
            });
    }
});

// Validar los campos al escribir para habilitar o deshabilitar los botones
document.getElementById("inputPostNombre").addEventListener("input", habilitarBotones);
document.getElementById("inputPostApellido").addEventListener("input", habilitarBotones);
document.getElementById("inputPutId").addEventListener("input", habilitarBotones);
document.getElementById("inputDelete").addEventListener("input", habilitarBotones);
document.getElementById("inputPutNombre").addEventListener("input", habilitarBotones);
document.getElementById("inputPutApellido").addEventListener("input", habilitarBotones);