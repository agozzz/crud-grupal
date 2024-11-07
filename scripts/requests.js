//Obtener un listado de los usuarios: Devuelve un json con una lista que contiene todos los registros.
function listarUsuarios() {
    return fetch('https://672bdc9a1600dda5a9f69754.mockapi.io/users')
      .then(response => response.json())
      .catch(error => console.error('Error al listar usuarios:', error));
  }


//Obtener usuario por ID: Recibe un id en la url y devuelve un json con el registro cuyo id haya sido solicitado.
function obtenerUsuarioPorId(userId) {
    return fetch(`https://672bdc9a1600dda5a9f69754.mockapi.io/users/${userId}`)
     .then(response => response.json())
     .catch(error => console.error('Error al obtener usuario:', error));
 }


/*Agregar un nuevo usuario: Recibe un json con un objeto con los atributos name y lastname, (en el body) lo agrega a 
la base de datos (asignándole un id) y devuelve un json con el registro creado.*/
function agregarUsuario(nuevoUsuario) {
    return fetch('https://672bdc9a1600dda5a9f69754.mockapi.io/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
    })
    .then(response => response.json())
    .catch(error => console.error('Error al agregar usuario:', error));
}



/*Modificar un usuario: Recibe un id en la url y un json con un objeto con los atributos name y lastname, (en el body), 
modifica con dichos datos el registro cuyo id coincida con el recibido, y devuelve un json con el registro modificado.*/
function modificarUsuario(modifyUserId, modifiedUser) {
    return fetch(`https://672bdc9a1600dda5a9f69754.mockapi.io/users/${modifyUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedUser),
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error al modificar usuario:', error);
        throw new Error('No se pudo modificar el usuario');
    });
}


/*Eliminar usuario por ID: Recibe un id en la url, elimina el registro cuyo id coincida con el recibido, y devuelve un 
json con el registro eliminado.*/
function eliminarUsuario() {
    const deleteUserId = document.getElementById("inputDelete").value;
    fetch(`https://672bdc9a1600dda5a9f69754.mockapi.io/users/${deleteUserId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => console.log('Usuario eliminado:', data))
      .catch(error => console.error('Error al eliminar usuario:', error));
  }