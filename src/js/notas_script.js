document.addEventListener('DOMContentLoaded', function () {
    const comboBox = document.getElementsByName('maestros')[0]; // Selecciona el select por su nombre
    const id = 1; // Reemplaza con el ID real que deseas consultar

    axios.get(`http://localhost:3000/clasesProfesor/${id}`)
        .then(response => {
            comboBox.innerHTML = ''; // Limpia las opciones existentes
            response.data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id_clase;
                option.text = item.nombre_clase;
                comboBox.add(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            comboBox.innerHTML = '<option value="">Error al cargar las opciones</option>';
        });

    // Agrega un event listener al comboBox para manejar la selección de clase
    comboBox.addEventListener('change', function () {
        const selectedClassId = comboBox.value; // Obtiene el ID de la clase seleccionada
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
                    console.error('Error al obtener los datos:', error);
                });
        }
    });
});
