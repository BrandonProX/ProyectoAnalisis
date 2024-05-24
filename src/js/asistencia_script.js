let listaalumnos = [];

const datosAsistencia = [];

document.addEventListener('DOMContentLoaded', function () {
    const comboBox = document.getElementById('dynamicComboBox');
    const id = 1; // Replace with the actual ID you want to query

    axios.get(`http://localhost:3000/clasesProfesor/${id}`)
        .then(response => {
            comboBox.innerHTML = ''; // Clear existing options
            response.data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id_clase;
                option.text = item.nombre_clase;
                comboBox.add(option);
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            comboBox.innerHTML = '<option value="">Error al buscar clases</option>';
        });

    // Add event listener to the comboBox to handle class selection
    comboBox.addEventListener('change', function () {
        const selectedClassId = comboBox.value; // Get the selected class ID
        if (selectedClassId) {
            axios.get(`http://localhost:3000/alumnosEnClase/${selectedClassId}`)
                .then(response => {
                    listaalumnos = response.data.map(item => ({
                        id_alumno: item.id_alumno,
                        primer_nombre: item.primer_nombre,
                        primer_apellido: item.primer_apellido,
                        id_clase: item.id_clase
                    }));    
                    llenaTabla();
                    obtenerDatosTabla(selectedClassId);

                })
                .catch(error => {
                    alert('Error al buscar alumnos en clase: ', error)
                    console.error('Error fetching data:', error);
                });
        }
    });
});


function llenaTabla() {
    const tablaAlumnos = document.querySelector("#tablaAlumnos");
    let body = "";
    for (let person of listaalumnos) {
        body += `
        <tr>
            <td>${person.id_alumno}</td>
            <td>${person.primer_nombre + " " + person.primer_apellido}</td>
            <td><input type="checkbox" class="asistencia-checkbox"></td>
        </tr>
    `;
    }
    tablaAlumnos.innerHTML = body;

}


function obtenerDatosTabla(selectedClassId) {
    const tabla = document.querySelector("#tablaAlumnos");
    const filas = tabla.querySelectorAll("tr");
    

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        const idAlumno = celdas[0].textContent.trim(); // Obtener el ID del alumno
        const nombreCompleto = celdas[1].textContent.trim(); // Obtener el nombre completo del alumno
        const asistio = celdas[2].querySelector(".asistencia-checkbox").checked; // Verificar si el checkbox está marcado

        // Construir el objeto con los datos del alumno
        const alumno = {
            idAlumno: idAlumno,
            fechaAsistencia: new Date(document.getElementById('fecha').value).toISOString().split('T')[0],
            idClase: selectedClassId,
            asistio: asistio
        };

        datosAsistencia.push(alumno); // Agregar el objeto del alumno al arreglo de datos
    });

}
