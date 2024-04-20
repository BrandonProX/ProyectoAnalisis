// Datos de ejemplo (se pueden obtener de una base de datos)
const alumnos = ["Juan Pérez", "María López", "Pedro García"];
let columnas = ["Tareas Cuadernos", "Tareas Libros", "Asistencia", "Examenes"];

// Función para mostrar la tabla de calificaciones
function mostrarTabla() {
  const tablaNotas = document.getElementById('tablaNotas');
  const thead = tablaNotas.querySelector('thead tr');
  const tbody = tablaNotas.querySelector('tbody');

  // Limpiar la tabla
  thead.innerHTML = '';
  tbody.innerHTML = '';

  // Agregar las columnas dinámicamente
  const thAlumno = document.createElement('th');
  thAlumno.textContent = 'Alumno';
  thead.appendChild(thAlumno);

  columnas.forEach(columna => {
    const thColumna = document.createElement('th');
    thColumna.textContent = columna;
    thead.appendChild(thColumna);
  });

  // Agregar la columna para la suma total de puntos
  const thNotaTotal = document.createElement('th');
  thNotaTotal.textContent = 'Nota Final';
  thead.appendChild(thNotaTotal);

  // Agregar la columna para mostrar el resultado (Aprobado/Reprobado)
  const thResultado = document.createElement('th');
  thResultado.textContent = 'Resultado';
  thead.appendChild(thResultado);

  // Agregar la columna para el año
  const thAnio = document.createElement('th');
  thAnio.textContent = 'Año';
  thead.appendChild(thAnio);

  // Agregar filas y celdas para cada alumno
  alumnos.forEach(alumno => {
    const tr = document.createElement('tr');
    const tdAlumno = document.createElement('td');
    tdAlumno.textContent = alumno;
    tr.appendChild(tdAlumno);

    let sumaTotal = 0;

    columnas.forEach(() => {
      const td = document.createElement('td');
      td.contentEditable = true; // Permite la edición de la celda
      td.addEventListener('input', calcularSumatoria); // Agregar evento para recalcular al editar
      tr.appendChild(td);
    });

    // Celda para mostrar la suma total de puntos de las calificaciones
    const tdTotal = document.createElement('td');
    tdTotal.textContent = sumaTotal;
    tdTotal.classList.add('total'); // Agregar clase para facilitar la selección
    tr.appendChild(tdTotal);

    // Celda para mostrar el resultado (Aprobado/Reprobado)
    const tdResultado = document.createElement('td');
    tdResultado.classList.add('resultado'); // Agregar clase para facilitar el estilo
    tr.appendChild(tdResultado);
    
    // Celda para mostrar el año
    const tdAnio = document.createElement('td');
      const inputAnio = document.createElement('input');
      inputAnio.type = 'text';
      inputAnio.classList.add('anio-input');
      tdAnio.appendChild(inputAnio);
      tr.appendChild(tdAnio);

      tbody.appendChild(tr);
  });
}

// Función para calcular y actualizar la sumatoria en tiempo real
function calcularSumatoria() {
    const fila = this.parentNode; // Obtener la fila
    const celdas = fila.querySelectorAll('td:not(.total)');
    let total = 0;
    celdas.forEach(celda => {
        total += parseFloat(celda.textContent) || 0; // Parsear a número y sumar, si es NaN, sumar 0
    });
    
    // Obtener la celda del total
    const totalCelda = fila.querySelector('.total');
    
    // Actualizar el total
    totalCelda.textContent = total;

    // Obtener la celda del resultado
    const resultadoCelda = fila.querySelector('.resultado');

    // Calcular el resultado (Aprobado/Reprobado)
    const resultado = total >= 61 ? 'Aprobado' : 'Reprobado';
    resultadoCelda.textContent = resultado;
    
    // Verificar que la suma no sobrepase los 100
    if (total > 100) {
        alert('La suma total no puede ser mayor que 100. Por favor, verifique las calificaciones.');
        totalCelda.style.color = 'red'; // Cambiar el color a rojo para indicar el error
        return;
    }
    
    // Restaurar el color normal si no hay error
    totalCelda.style.color = ''; 
    
    // Cambiar el color del total según el valor
    if (total <= 60) {
        totalCelda.style.color = 'red';
    } else {
        totalCelda.style.color = 'green';
    }
}

// Mostrar la tabla de calificaciones al cargar la página
mostrarTabla();