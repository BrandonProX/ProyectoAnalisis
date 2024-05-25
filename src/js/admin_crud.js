let datosAlumno;
const form = document.getElementById('studentForm');

document.addEventListener('DOMContentLoaded', function () {

    const tableBody = document.getElementById('studentList');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const primer_nombre = document.getElementById('primer_nombre_alumno').value;
        const segundo_nombre = document.getElementById('segundo_nombre_alumno').value;
        const primer_apellido = document.getElementById('primer_apellido_alumno').value;
        const segundo_apellido = document.getElementById('segundo_apellido_alumno').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const cui = document.getElementById('cui').value;
        const grado = document.getElementById('grado').value;

        datosAlumno = {
            'primer_nombre': primer_nombre,
            'segundo_nombre': segundo_nombre,
            'primer_apellido': primer_apellido,
            'segundo_apellido': segundo_apellido,
            'fecha_nacimiento': fecha_nacimiento,
            'direccion': direccion,
            'num_telefono': telefono,
            'email': correo,
            'cui': cui,
            'id_padre': '1'

            }
        console.log(datosAlumno)
        // Crear una nueva fila en la tabla con los datos del estudiante
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <tr>
            <td>${datosAlumno.primer_nombre} ${primer_apellido}</td>
            <td>${grado}</td>
        `;
        tableBody.appendChild(newRow);
        await registraAlumnos(datosAlumno);

        const action = event.submitter.id; // ID del botón que disparó el evento
        // if (action === 'Agregar_Estudiante') {
        //     await 
        // } else if (action === 'Editar_Estudiante') {
        //     // Lógica para editar profesor
        // } else if (action === 'Eliminar_Estudiante') {
        //     // Lógica para eliminar profesor
        // }

        


    });
});


// registro de pagos
const pagoUrl = 'http://localhost:3000/registroPago';

const btnPago = document.getElementById('btnPago');


btnPago.addEventListener('click', async (event) => {
    event.preventDefault();
    const mesPagoSelect = document.getElementById('mes_pago');
    const mes_pago_num = mesPagoSelect.selectedIndex + 1;
    const pago = {
        id_alumno: document.getElementById('id_alumno').value,
        tipo_pago: document.getElementById('tipo_pago').value,
        mes_pago: mes_pago_num,
        anio_pago: document.getElementById('anio_pago').value,
        monto: document.getElementById('monto').value,
        fecha_pago: new Date().toISOString().split('T')[0]
    };
    await registraPago(pago);
});

async function registraPago(userData) {
    try {
        // Realizar la solicitud POST usando Axios
        const response = await axios.post(pagoUrl, userData);
        // Mostrar la respuesta en la página
        if (response.status === 200) {
            alert("Pago registrado exitosamente");
            document.getElementById('pagoForm').reset();
        } else {
            alert('Error al realizar pago');
        }
    } catch (error) {
        // Mostrar errores en caso de fallo
        console.error('Error al realizar la solicitud de pago :', error);
    }
}



//registra profesores
const linkGestionMaestros = document.getElementById('linkGestionMaestros');

// Agregar un evento de clic al enlace
linkGestionMaestros.addEventListener('click', async function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    await consultaProfesores(); // Llamar a la función consultaProfesores al presionar el enlace
});

let urlRegProfesores;

const btnAddProfesor = document.getElementById('btnPago');

document.getElementById('teacherForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        primer_nombre: document.getElementById('primer_nombre').value,
        segundo_nombre: document.getElementById('segundo_nombre').value,
        otros_nombres: document.getElementById('otros_nombres').value,
        primer_apellido: document.getElementById('primer_apellido').value,
        segundo_apellido: document.getElementById('segundo_apellido').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
    };

    const action = event.submitter.id; // ID del botón que disparó el evento
    if (action === 'agregarProfesor') {
        registraProfesor(formData);
    } else if (action === 'editarProfesor') {
        // Lógica para editar profesor
    } else if (action === 'eliminarProfesor') {
        // Lógica para eliminar profesor
    }
    await consultaProfesores();
});



async function registraProfesor(userData) {
    urlRegProfesores = 'http://localhost:3000/registroProfesor';
    try {
        // Realizar la solicitud POST usando Axios
        const response = await axios.post(urlRegProfesores, userData);
        // Mostrar la respuesta en la página
        if (response.status === 200) {
            alert("Profesor registrado exitosamente");
            document.getElementById('pagoForm').reset();
        } else {
            alert('Error al realizar pago');
        }
    } catch (error) {
        // Mostrar errores en caso de fallo
        console.error('Error al realizar la solicitud de pago :', error);
    }
}


//consulta profesores y llena tabla
async function consultaProfesores() {
    try {
        urlRegProfesores = 'http://localhost:3000/consultaProfesores';
        // Realizar la solicitud GET usando Axios
        const response = await axios.get(urlRegProfesores);
        // Verificar la respuesta
        if (response.status === 200) {
            const profesores = response.data; // Suponiendo que la respuesta es un array de objetos con los datos de los profesores
            const tbody = document.getElementById('teacherList'); // Obtener el cuerpo de la tabla
            tbody.innerHTML = ''; // Limpiar el contenido existente de la tabla
            // Recorrer el array de profesores y agregar filas a la tabla
            profesores.forEach(profesor => {
                const newRow = tbody.insertRow(); // Crear una nueva fila
                newRow.insertCell().textContent = profesor.id_profesor;
                newRow.insertCell().textContent = profesor.primer_nombre + " " + profesor.primer_apellido;
                newRow.insertCell().textContent = profesor.correo; // Insertar la asignatura en la celda 2
                newRow.insertCell().textContent = profesor.telefono; // Insertar el grado en la celda 3
            });
        } else {
            alert('Error al consultar profesores');
        }
    } catch (error) {
        console.error('Error al realizar la consulta de profesores:', error);
        alert('Error al consultar profesores');
    }
}





//registra alumons
const linkGestionAlumnos = document.getElementById('linkGestionMaestros');

// Agregar un evento de clic al enlace
linkGestionMaestros.addEventListener('click', async function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    //await consultaAlumnos(); // Llamar a la función consultaProfesores al presionar el enlace
});

let urlRegAlumnos;

const btnAddAlumnos = document.getElementById('btnPago');

document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const action = event.submitter.id; // ID del botón que disparó el evento
    if (action === 'Agregar_Estudiante') {
        registraAlumnos(datosAlumno);
    } else if (action === 'Editar_Estudiante') {
        // Lógica para editar profesor
    } else if (action === 'Eliminar_Estudiante') {
        // Lógica para eliminar profesor
    }
    //await consultaAlumnos();
});



async function registraAlumnos(userData) {
    urlRegProfesores = 'http://localhost:3000/registroAlumnos';
    try {
        // Realizar la solicitud POST usando Axios
        const response = await axios.post(urlRegProfesores, userData);
        // Mostrar la respuesta en la página
        if (response.status === 200) {
            alert("Alumno registrado exitosamente");
            document.getElementById('studentForm').reset();
        } else {
            alert('Error al realizar Alumno');
        }
    } catch (error) {
        // Mostrar errores en caso de fallo
        console.error('Error al realizar la solicitud de alumno :', error);
    }
}


//consulta profesores y llena tabla
async function consultaAlumnos() {
    try {
        urlRegProfesores = 'http://localhost:3000/consultaProfesores';
        // Realizar la solicitud GET usando Axios
        const response = await axios.get(urlRegProfesores);
        // Verificar la respuesta
        if (response.status === 200) {
            const profesores = response.data; // Suponiendo que la respuesta es un array de objetos con los datos de los profesores
            const tbody = document.getElementById('teacherList'); // Obtener el cuerpo de la tabla
            tbody.innerHTML = ''; // Limpiar el contenido existente de la tabla
            // Recorrer el array de profesores y agregar filas a la tabla
            profesores.forEach(profesor => {
                const newRow = tbody.insertRow(); // Crear una nueva fila
                newRow.insertCell().textContent = profesor.id_profesor;
                newRow.insertCell().textContent = profesor.primer_nombre + " " + profesor.primer_apellido;
                newRow.insertCell().textContent = profesor.correo; // Insertar la asignatura en la celda 2
                newRow.insertCell().textContent = profesor.telefono; // Insertar el grado en la celda 3
            });
        } else {
            alert('Error al consultar profesores');
        }
    } catch (error) {
        console.error('Error al realizar la consulta de profesores:', error);
        alert('Error al consultar profesores');
    }
}
